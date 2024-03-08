#![cfg_attr(not(feature = "std"), no_std, no_main)]

#[ink::contract]
mod chatroom_factory {
    // Import necessary modules
    use ink::storage::Mapping;

    #[ink(storage)]
    pub struct ChatroomFactory {
        chatrooms: Mapping<AccountId, AccountId>,
    }

    impl ChatroomFactory {
        #[ink(constructor)]
        pub fn new() -> Self {
            Self {
                chatrooms: Mapping::new(),
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
    }
}
