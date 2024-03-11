> This project was bootstrpped with the [!inkathon template](/SETUP.md)

---

[![Whisper cover photo](/frontend/public/images/whisper-banner.png)](https://blue-whisper.vercel.app/)

### Whisper

Whisper is an app where the privacy focused can have ephemeral conversations almost like whispering.

[Live Demo](https://blue-whisper.vercel.app/)

[Video Demo](https://youtu.be/T-jDoaK0q2I)

## How it works

![Contract flow chart](/frontend/public/images/whisper-user-flow-chart.png)

1. Get some test tokens for Aleph Zero or Accurast
2. Install a wallet([Talisman](https://talisman.xyz/) is a good option)
3. Create or join a chatroom
4. Invite your friends (if you created)
5. Talk and talk
6. Delete chatroom and all messages

## Usage

![Whisper cover photo](/frontend/public/images/whisper-send-message.gif)

## Components

Whisper is built for the Polkadot substrate ecosystem, it uses the ink! smart contract language for it's main functionality and a web UI & Talismann wallet for user's interaction with the application.

Other critical components are:

1. !Inkathon: a fullstack boilerplate to build dApps with ink! and on polkadot. I created a [`chatroom` smart contract](/contracts/src/chatroom/lib.rs) which stores the core functionality of the dApp, it was deployed to [Aleph Zero testnet](https://alephzero-testnet.subscan.io/account/5GpiEYmPMVqMcJaR3eeDm4z8a5qZBsAmshYYSCBtuHYa96Bk?tab=transfer) & developer Acurast network.

2. Acurast: users' can create chatrooms that are deployed to the Acurast network. I used the Acurast SDK, created [a hook](/frontend/src/deployments/use-accurast.tsx) that I used to interact with the instance of chatroom on Acurast. The chatoom contract was deployed with the [Acurast console](https://console.acurast.com/job-creation/39)

3. NextJS & useInk: the combination of NextJS and the react library useInk made it trivial [to interact](/frontend/src/context/app-context.tsx) with the chatroom contract. 

4. Ink smart contract: I built and tested the chatroom contract with !ink. 
![Contract flow chart](/frontend/public/images/whisper-smart-contract-components.png)


## Future Work

Integrate azero.id to have a better UX when sharing messages with each other
Implement e2e encryption
