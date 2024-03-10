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
    pub struct Message {
        sender: AccountId,
        content: String,
        sent_timestamp: Timestamp,
    }

    #[derive(Debug, Clone, PartialEq, scale::Encode, scale::Decode)]
    #[cfg_attr(
        feature = "std",
        derive(scale_info::TypeInfo, ink::storage::traits::StorageLayout)
    )]
    pub struct Room {
        owner: AccountId,
        messages: Vec<String>,
        timeout: Timestamp,
    }

    #[ink(storage)]
    pub struct Chatroom {
        chatrooms: Mapping<AccountId, Room>,
        participants: Mapping<AccountId, Vec<AccountId>>,
        messages: Mapping<AccountId, Vec<Message>>,
    }

    impl Chatroom {
        // Constructor to initialize the contract
        #[ink(constructor)]
        pub fn new() -> Self {
            Self {
                chatrooms: Mapping::new(),
                participants: Mapping::new(),
                messages: Mapping::new(),
            }
        }

        #[ink(message)]
        pub fn create_chatroom(&mut self) -> AccountId {
            // TODO: let there be optional list of participants & first message
            // Create a new chatroom
            let caller = self.env().caller(); // TODO
            let timeout = self.env().block_timestamp() + &3600000; // 60 minutes destroy chatroom in 60 minutes
            let new_chatroom = Room {
                owner: Self::env().caller(),
                messages: Vec::new(),
                timeout: timeout,
            };

            // Store the chatroom owner
            self.chatrooms.insert(caller, &new_chatroom);

            // Store the participants (which is just the chatroom owner at this point)
            let mut new_participants = Vec::new();
            new_participants.push(caller);
            self.participants.insert(caller, &new_participants);

            caller // caller account_id is the id for the chatroom
        }

        #[ink(message)]
        pub fn get_chatroom(&self, chatroom_id: AccountId) -> Option<Room> {
            match self.chatrooms.get(chatroom_id) {
                Some(chat) => Some(chat),
                None => None,
            }
        }

        #[ink(message)]
        pub fn is_a_participant(&self, chatroom_id: AccountId, participant_id: AccountId) -> bool {
            match self.participants.get(chatroom_id) {
                Some(parts) => parts.contains(&participant_id),
                None => false, // participant_id is not a member
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
            self.participants
                .insert(self.env().caller(), &participants_list);
        }

        #[ink(message)]
        pub fn send_message(&mut self, chatroom_id: AccountId, message: String) {
            let caller = self.env().caller();
            // Ensure the sender is a participant of the chatroom
            match self.participants.get(&chatroom_id) {
                Some(participants_list) => {
                    assert!(
                        participants_list.contains(&caller),
                        "Sender is not a participant of the chatroom"
                    );
                }
                None => panic!("Chatroom doesn't exist"),
            };

            let mut room = self.chatrooms.get(chatroom_id).unwrap();

            // let mut messages = chatroom.messages;
            room.messages.push(message);

            self.chatrooms.insert(chatroom_id, &room);
        }

        #[ink(message)]
        pub fn get_messages(&self, chatroom_id: AccountId) -> Vec<String> {
            let caller = self.env().caller();
            // Ensure the sender is a participant of the chatroom
            match self.participants.get(&chatroom_id) {
                Some(participants_list) => {
                    assert!(
                        participants_list.contains(&caller),
                        "Sender is not a participant of the chatroom"
                    );
                }
                None => panic!("Chatroom doesn't exist"),
            };
            let room = self.get_chatroom(chatroom_id).unwrap();

            // Retrieve messages for the caller if any
            room.messages
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
            let mut chatroom = self.get_chatroom(chatroom_id).unwrap();

            // Ensure only the owner can set the timeout
            assert_eq!(
                chatroom.owner.clone(),
                self.env().caller(),
                "Only owner can set timeout"
            );

            // Set the timeout
            chatroom.timeout = timeout;
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

    #[cfg(test)]
    mod tests {
        use super::*;

        #[ink::test]
        fn new_works() {
            let account = AccountId::from([0x1; 32]);
            ink::env::test::set_caller::<ink::env::DefaultEnvironment>(account);

            let mut chatroom = Chatroom::new();
            let chatroom_id = chatroom.create_chatroom();
            assert_eq!(chatroom_id, account);
        }

        #[ink::test]
        fn create_chatroom_works() {}

        #[ink::test]
        fn get_chatroom_works() {
            let account = AccountId::from([0x1; 32]);
            ink::env::test::set_caller::<ink::env::DefaultEnvironment>(account);

            let mut chatroom = Chatroom::new();
            chatroom.create_chatroom();
            let chatroom_id = chatroom.get_chatroom(account).unwrap();

            assert_eq!(chatroom_id.owner, account);
        }

        #[ink::test]
        fn invite_works() {
            let account1 = AccountId::from([0x1; 32]);
            let account2 = AccountId::from([0x2; 32]);

            ink::env::test::set_caller::<ink::env::DefaultEnvironment>(account1);

            let mut chatroom = Chatroom::new();
            chatroom.create_chatroom();

            // invite account2
            chatroom.invite(account1.clone(), account2.clone());

            // check participants list for account2
            assert!(
                chatroom
                    .participants
                    .get(account1)
                    .unwrap()
                    .contains(&account2),
                "Account is not a participant"
            );
        }

        #[ink::test]
        fn send_message_works() {
            let accounts = ink::env::test::default_accounts::<ink::env::DefaultEnvironment>();

            let chatroom_id = accounts.bob.clone();
            ink::env::test::set_caller::<ink::env::DefaultEnvironment>(chatroom_id);

            let mut chatroom = Chatroom::new();
            chatroom.create_chatroom();

            // invite alice & charlie
            chatroom.invite(chatroom_id, accounts.alice);
            chatroom.invite(chatroom_id, accounts.charlie);

            // account 2 send message
            ink::env::test::set_caller::<ink::env::DefaultEnvironment>(accounts.alice); // set account2 as the current caller
            let message1 = String::from("This is the first message");
            chatroom.send_message(chatroom_id, message1.clone());

            // check message1
            assert!(
                chatroom.get_messages(chatroom_id).contains(&message1),
                "Message does not exist"
            );

            // account 3 send message
            ink::env::test::set_caller::<ink::env::DefaultEnvironment>(accounts.charlie); // set account3 as the current caller
            let message2 = String::from("Do or do not, there's no try");
            chatroom.send_message(chatroom_id, message2.clone());

            // check message2
            assert!(
                chatroom.get_messages(chatroom_id).contains(&message2),
                "Message does not exist"
            );
        }

        #[ink::test]
        #[should_panic]
        fn should_not_delete_chatroom_works() {
            let accounts = ink::env::test::default_accounts::<ink::env::DefaultEnvironment>();

            let chatroom_id = accounts.bob.clone();
            ink::env::test::set_caller::<ink::env::DefaultEnvironment>(chatroom_id);

            let mut chatroom = Chatroom::new();
            chatroom.create_chatroom();

            // invite alice & charlie
            chatroom.invite(chatroom_id, accounts.alice);

            // attempt to delete chatroom by alice, should panic
            ink::env::test::set_caller::<ink::env::DefaultEnvironment>(accounts.alice);
            chatroom.delete_chatroom(chatroom_id);
        }

        // TODO write a test for auto delete after 60 minutes
    }
}
