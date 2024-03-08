#![cfg_attr(not(feature = "std"), no_std, no_main)]

#[ink::contract]
mod chatroom {
    // Import necessary modules
    use ink::prelude::string::String;
    use ink::prelude::vec::Vec;
    use ink::storage::Mapping;

    #[derive(Debug, Clone, PartialEq, scale::Encode, scale::Decode)]
    #[cfg_attr(
        feature = "std",
        derive(scale_info::TypeInfo, ink::storage::traits::StorageLayout)
    )]
    pub struct Chatroom {
        owner: AccountId,
        messages: Vec<String>,
        timeout: Timestamp,
    }

    #[ink(storage)]
    pub struct ChatroomFactory {
        chatrooms: Mapping<AccountId, Chatroom>,
        participants: Mapping<AccountId, Vec<AccountId>>,
    }

    impl ChatroomFactory {
        // Constructor to initialize the contract
        #[ink(constructor)]
        pub fn new() -> Self {
            Self {
                chatrooms: Mapping::new(),
                participants: Mapping::new(),
            }
        }

        #[ink(message)]
        pub fn create_chatroom(&mut self) -> AccountId {
            // TODO: let there be optional list of participants & first message
            // Create a new chatroom
            let caller = self.env().caller(); // TODO
            let timeout = (Self::env().block_timestamp() + &3600000); // 60 minutes destroy chatroom in 60 minutes
            let new_chatroom = Chatroom {
                owner: Self::env().caller(),
                messages: Vec::new(),
                timeout: timeout,
            };

            // Store the chatroom owner
            self.chatrooms.insert(caller, &new_chatroom);

            caller // caller account_id is the id for the chatroom
        }

        #[ink(message)]
        pub fn get_chatroom(&self, chatroom_id: AccountId) -> Option<Chatroom> {
            match self.chatrooms.get(chatroom_id) {
                Some(chat) => Some(chat),
                None => None,
            }
        }

        #[ink(message)]
        pub fn invite(&mut self, chatroom_id: AccountId, participant: AccountId) {
            let chatroom = self.get_chatroom(chatroom_id.clone()).unwrap();
            // Ensure only the owner can invite participants
            assert_eq!(
                chatroom.owner,
                self.env().caller(),
                "Only owner can invite participants"
            );
            // update participants vector in chatroom
            let mut participants_list = self.participants.get(chatroom.owner).unwrap();
            participants_list.push(participant);
        }

        #[ink(message)]
        pub fn send_message(&mut self, chatroom_id: AccountId, message: String) {
            // Ensure the sender is a participant of the chatroom
            match self.participants.get(&self.env().caller()) {
                Some(_) => (),
                None => panic!("Sender is not a participant of the chatroom"),
            };

            let chatroom = self.get_chatroom(chatroom_id).unwrap();

            // Add the message to sender's messages
            let sender = self.env().caller();
            let mut messages = chatroom.messages;
            messages.push(message);
        }

        #[ink(message)]
        pub fn get_messages(&self, chatroom_id: AccountId) -> Vec<String> {
            // Ensure the caller is a participant of the chatroom
            match self.participants.get(&self.env().caller()) {
                Some(_) => (),
                None => panic!("Caller is not a participant of the chatroom"),
            };
            let chatroom = self.get_chatroom(chatroom_id).unwrap();

            // Retrieve messages for the caller if any
            chatroom.messages
        }

        #[ink(message)]
        pub fn delete_chatroom(&mut self, chatroom_id: AccountId) {
            let chatroom = self.get_chatroom(chatroom_id).unwrap();

            // Ensure only the owner can delete the chatroom
            assert_eq!(
                chatroom.owner.clone(),
                self.env().caller(),
                "Only owner can delete the chatroom"
            );

            // delete the contract from storage
            self.chatrooms.remove(chatroom.owner);
        }

        #[ink(message)]
        pub fn set_timeout(&mut self, chatroom_id: AccountId, timeout: Timestamp) {
            let chatroom = self.get_chatroom(chatroom_id).unwrap();

            // Ensure only the owner can set the timeout
            assert_eq!(
                chatroom.owner.clone(),
                self.env().caller(),
                "Only owner can set timeout"
            );

            let mut old_timeout = chatroom.timeout;

            // Set the timeout
            old_timeout = timeout;
        }

        #[ink(message)]
        pub fn check_timeout(&mut self, chatroom_id: AccountId) {
            let chatroom = self.get_chatroom(chatroom_id).unwrap();

            // Ensure only the owner can check timeout
            assert_eq!(
                chatroom.owner.clone(),
                self.env().caller(),
                "Only owner can check timeout"
            );

            // Get the current timestamp
            let current_time = self.env().block_timestamp();

            // Check if the timeout has expired
            if current_time >= chatroom.timeout {
                // delete the contract from storage
                self.chatrooms.remove(chatroom.owner);
            }
        }
    }
}
