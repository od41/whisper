#![cfg_attr(not(feature = "std"), no_std, no_main)]

#[ink::contract]
mod chatroom {
    use ink::prelude::string::String;

    #[ink(event)]
    pub struct ChatroomCreated {
        id: String,
        owner: Option<AccountId>,
        members: Vec<Option<AccountId>>,
    }

    #[ink(storage)]
    pub struct Chatroom {
        id: String,
        owner: AccountId,
        messages: Vec<String>,
        members: Vec<AccountId>,
    }

    impl Chatroom {
        /// Constructor that initializes the `bool` value to the given `init_value`.
        #[ink(constructor)]
        pub fn new() -> Self {
            let caller = Self::env().caller();
            let mut members: Vec<AccountId> = Vec::new();
            members.push(caller.clone());
            Self {
                id: "1".to_string(),
                messages: vec!["Welcome to the chatroom".to_string()],
                owner: caller,
                members: members,
            }
        }

        /// A message that can be called on instantiated contracts.
        /// This one flips the value of the stored `bool` from `true`
        /// to `false` and vice versa.
        #[ink(message)]
        pub fn getId(&mut self) -> String {
            self.id.clone()
        }

        #[ink(message)]
        pub fn getOwner(&mut self) -> AccountId {
            self.owner
        }
    }

    #[cfg(test)]
    mod tests {
        use super::*;

        /// We test a simple use case of our contract.
        #[ink::test]
        fn new_chatroom_works() {
            let mut chatroom = Chatroom::new();
            assert_eq!(chatroom.getId(), "1".to_string());
        }
    }

    // / This is how you'd write end-to-end (E2E) or integration tests for ink! contracts.
    // /
    // / When running these you need to make sure that you:
    // / - Compile the tests with the `e2e-tests` feature flag enabled (`--features e2e-tests`)
    // / - Are running a Substrate node which contains `pallet-contracts` in the background
    // #[cfg(all(test, feature = "e2e-tests"))]
    // mod e2e_tests {
    //     /// Imports all the definitions from the outer scope so we can use them here.
    //     use super::*;

    //     /// A helper function used for calling contract messages.
    //     use ink_e2e::build_message;

    //     /// The End-to-End test `Result` type.
    //     type E2EResult<T> = std::result::Result<T, Box<dyn std::error::Error>>;

    //     /// We test that we can upload and instantiate the contract using its default constructor.
    //     #[ink_e2e::test]
    //     async fn default_works(mut client: ink_e2e::Client<C, E>) -> E2EResult<()> {
    //         // Given
    //         let constructor = ChatroomRef::default();

    //         // When
    //         let contract_account_id = client
    //             .instantiate("chatroom", &ink_e2e::alice(), constructor, 0, None)
    //             .await
    //             .expect("instantiate failed")
    //             .account_id;

    //         // Then
    //         let get = build_message::<ChatroomRef>(contract_account_id.clone())
    //             .call(|chatroom| chatroom.get());
    //         let get_result = client.call_dry_run(&ink_e2e::alice(), &get, 0, None).await;
    //         assert!(matches!(get_result.return_value(), false));

    //         Ok(())
    //     }

    //     /// We test that we can read and write a value from the on-chain contract contract.
    //     #[ink_e2e::test]
    //     async fn it_works(mut client: ink_e2e::Client<C, E>) -> E2EResult<()> {
    //         // Given
    //         let constructor = ChatroomRef::new(false);
    //         let contract_account_id = client
    //             .instantiate("chatroom", &ink_e2e::bob(), constructor, 0, None)
    //             .await
    //             .expect("instantiate failed")
    //             .account_id;

    //         let get = build_message::<ChatroomRef>(contract_account_id.clone())
    //             .call(|chatroom| chatroom.get());
    //         let get_result = client.call_dry_run(&ink_e2e::bob(), &get, 0, None).await;
    //         assert!(matches!(get_result.return_value(), false));

    //         // When
    //         let flip = build_message::<ChatroomRef>(contract_account_id.clone())
    //             .call(|chatroom| chatroom.flip());
    //         let _flip_result = client
    //             .call(&ink_e2e::bob(), flip, 0, None)
    //             .await
    //             .expect("flip failed");

    //         // Then
    //         let get = build_message::<ChatroomRef>(contract_account_id.clone())
    //             .call(|chatroom| chatroom.get());
    //         let get_result = client.call_dry_run(&ink_e2e::bob(), &get, 0, None).await;
    //         assert!(matches!(get_result.return_value(), true));

    //         Ok(())
    //     }
    // }
}
