#![cfg_attr(not(feature = "std"), no_std, no_main)]

#[ink::contract]
mod chatroom {
    // Import necessary modules
    use ink::prelude::string::String;
    use ink::prelude::vec::Vec;
    use ink::storage::Mapping;

    #[ink(storage)]
    pub struct Chatroom {
        owner: AccountId,
        participants: Mapping<AccountId, ()>,
        messages: Mapping<AccountId, Vec<String>>,
        timeout: Timestamp,
    }
    
    pub struct ChatroomFactory {
        chatrooms: Mapping<AccountId, AccountId>,
    }

    impl Chatroom {
        // Constructor to initialize the contract
        #[ink(constructor)]
        pub fn new() -> Self {
            let timeout = (Self::env().block_timestamp() + &3600000);
            Self {
                owner: Self::env().caller(),
                participants: Mapping::new(),
                messages: Mapping::new(),
                timeout: timeout,
            }
        }

        #[ink(message)]
        pub fn create_chatroom(&mut self) -> AccountId {
            // Create a new chatroom
            let chatroom_id = self.env().account_id(); // TODO

            // Store the chatroom owner
            self.chatrooms.insert(chatroom_id, &self.env().caller());

            chatroom_id
        }

        #[ink(message)]
        pub fn get_chatroom_owner(&self, chatroom_id: AccountId) -> Option<AccountId> {
            self.chatrooms.get(&chatroom_id)
        }

        #[ink(message)]
        pub fn invite(&mut self, participant: AccountId) {
            // Ensure only the owner can invite participants
            assert_eq!(
                self.owner,
                self.env().caller(),
                "Only owner can invite participants"
            );
            self.participants.insert(participant, &());
        }

        #[ink(message)]
        pub fn send_message(&mut self, message: String) {
            // Ensure the sender is a participant of the chatroom
            match self.participants.get(&self.env().caller()) {
                Some(_) => (),
                None => panic!("Sender is not a participant of the chatroom"),
            };

            // Add the message to sender's messages
            let sender = self.env().caller();
            let mut sender_messages = self.messages.get(sender).unwrap_or(Vec::new());
            sender_messages.push(message);
        }

        #[ink(message)]
        pub fn get_messages(&self) -> Vec<String> {
            // Ensure the caller is a participant of the chatroom
            match self.participants.get(&self.env().caller()) {
                Some(_) => (),
                None => panic!("Caller is not a participant of the chatroom"),
            };

            // Retrieve messages for the caller if any
            self.messages.get(&self.env().caller()).unwrap_or_default()
        }

        #[ink(message)]
        pub fn delete_chatroom(&mut self) {
            // Ensure only the owner can delete the chatroom
            assert_eq!(
                self.owner,
                self.env().caller(),
                "Only owner can delete the chatroom"
            );

            // Self-destruct the contract
            self.env().terminate_contract(self.owner);
        }

        #[ink(message)]
        pub fn set_timeout(&mut self, timeout: Timestamp) {
            // Ensure only the owner can set the timeout
            assert_eq!(
                self.owner,
                self.env().caller(),
                "Only owner can set timeout"
            );

            // Set the timeout
            self.timeout = timeout;
        }

        #[ink(message)]
        pub fn check_timeout(&mut self) {
            // Ensure only the owner can check timeout
            assert_eq!(
                self.owner,
                self.env().caller(),
                "Only owner can check timeout"
            );

            // Get the current timestamp
            let current_time = self.env().block_timestamp();

            // Check if the timeout has expired
            if current_time >= self.timeout {
                // Self-destruct the contract
                self.env().terminate_contract(self.owner);
            }
        }
    }
}
