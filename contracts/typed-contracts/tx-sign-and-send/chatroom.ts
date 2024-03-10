/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { KeyringPair } from '@polkadot/keyring/types';
import type { ApiPromise } from '@polkadot/api';
import type { GasLimit, GasLimitAndRequiredValue, Result } from '@727-ventures/typechain-types';
import { txSignAndSend } from '@727-ventures/typechain-types';
import type * as ArgumentTypes from '../types-arguments/chatroom';
import type BN from 'bn.js';
// @ts-ignore
import type {EventRecord} from "@polkadot/api/submittable";
import {decodeEvents} from "../shared/utils";
import EVENT_DATA_TYPE_DESCRIPTIONS from '../event-data/chatroom.json';


export default class Methods {
	readonly __nativeContract : ContractPromise;
	readonly __keyringPair : KeyringPair;
	readonly __apiPromise: ApiPromise;

	constructor(
		apiPromise: ApiPromise,
		nativeContract : ContractPromise,
		keyringPair : KeyringPair,
	) {
		this.__apiPromise = apiPromise;
		this.__nativeContract = nativeContract;
		this.__keyringPair = keyringPair;
	}

	/**
	* createChatroom
	*
	*/
	"createChatroom" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "createChatroom", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
	}

	/**
	* getChatroom
	*
	* @param { ArgumentTypes.AccountId } chatroomId,
	*/
	"getChatroom" (
		chatroomId: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "getChatroom", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [chatroomId], __options);
	}

	/**
	* isAParticipant
	*
	* @param { ArgumentTypes.AccountId } chatroomId,
	* @param { ArgumentTypes.AccountId } participantId,
	*/
	"isAParticipant" (
		chatroomId: ArgumentTypes.AccountId,
		participantId: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "isAParticipant", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [chatroomId, participantId], __options);
	}

	/**
	* invite
	*
	* @param { ArgumentTypes.AccountId } chatroomId,
	* @param { ArgumentTypes.AccountId } participant,
	*/
	"invite" (
		chatroomId: ArgumentTypes.AccountId,
		participant: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "invite", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [chatroomId, participant], __options);
	}

	/**
	* sendMessage
	*
	* @param { ArgumentTypes.AccountId } chatroomId,
	* @param { string } message,
	*/
	"sendMessage" (
		chatroomId: ArgumentTypes.AccountId,
		message: string,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "sendMessage", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [chatroomId, message], __options);
	}

	/**
	* getMessages
	*
	* @param { ArgumentTypes.AccountId } chatroomId,
	*/
	"getMessages" (
		chatroomId: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "getMessages", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [chatroomId], __options);
	}

	/**
	* deleteChatroom
	*
	* @param { ArgumentTypes.AccountId } chatroomId,
	*/
	"deleteChatroom" (
		chatroomId: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "deleteChatroom", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [chatroomId], __options);
	}

	/**
	* setTimeout
	*
	* @param { ArgumentTypes.AccountId } chatroomId,
	* @param { (number | string | BN) } timeout,
	*/
	"setTimeout" (
		chatroomId: ArgumentTypes.AccountId,
		timeout: (number | string | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "setTimeout", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [chatroomId, timeout], __options);
	}

	/**
	* checkTimeout
	*
	* @param { ArgumentTypes.AccountId } chatroomId,
	*/
	"checkTimeout" (
		chatroomId: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "checkTimeout", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [chatroomId], __options);
	}

}