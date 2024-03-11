/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { ApiPromise } from '@polkadot/api';
import type { KeyringPair } from '@polkadot/keyring/types';
import type { GasLimit, GasLimitAndRequiredValue, Result } from '@727-ventures/typechain-types';
import type { QueryReturnType } from '@727-ventures/typechain-types';
import { queryOkJSON, queryJSON, handleReturnType } from '@727-ventures/typechain-types';
import { txSignAndSend } from '@727-ventures/typechain-types';
import type * as ArgumentTypes from '../types-arguments/chatroom';
import type * as ReturnTypes from '../types-returns/chatroom';
import type BN from 'bn.js';
//@ts-ignore
import {ReturnNumber} from '@727-ventures/typechain-types';
import {getTypeDescription} from './../shared/utils';
// @ts-ignore
import type {EventRecord} from "@polkadot/api/submittable";
import {decodeEvents} from "../shared/utils";
import DATA_TYPE_DESCRIPTIONS from '../data/chatroom.json';
import EVENT_DATA_TYPE_DESCRIPTIONS from '../event-data/chatroom.json';


export default class Methods {
	readonly __nativeContract : ContractPromise;
	readonly __keyringPair : KeyringPair;
	readonly __callerAddress : string;
	readonly __apiPromise: ApiPromise;

	constructor(
		apiPromise : ApiPromise,
		nativeContract : ContractPromise,
		keyringPair : KeyringPair,
	) {
		this.__apiPromise = apiPromise;
		this.__nativeContract = nativeContract;
		this.__keyringPair = keyringPair;
		this.__callerAddress = keyringPair.address;
	}

	/**
	* createChatroom
	*
	* @returns { void }
	*/
	"createChatroom" (
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "createChatroom", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
	}

	/**
	* getChatroom
	*
	* @param { ArgumentTypes.AccountId } chatroomId,
	* @returns { Result<ReturnTypes.Room | null, ReturnTypes.LangError> }
	*/
	"getChatroom" (
		chatroomId: ArgumentTypes.AccountId,
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnTypes.Room | null, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "getChatroom", [chatroomId], __options, (result) => { return handleReturnType(result, getTypeDescription(12, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* isAParticipant
	*
	* @param { ArgumentTypes.AccountId } chatroomId,
	* @param { ArgumentTypes.AccountId } participantId,
	* @returns { Result<boolean, ReturnTypes.LangError> }
	*/
	"isAParticipant" (
		chatroomId: ArgumentTypes.AccountId,
		participantId: ArgumentTypes.AccountId,
		__options: GasLimit,
	): Promise< QueryReturnType< Result<boolean, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "isAParticipant", [chatroomId, participantId], __options, (result) => { return handleReturnType(result, getTypeDescription(15, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* invite
	*
	* @param { ArgumentTypes.AccountId } chatroomId,
	* @param { ArgumentTypes.AccountId } participant,
	* @returns { void }
	*/
	"invite" (
		chatroomId: ArgumentTypes.AccountId,
		participant: ArgumentTypes.AccountId,
		__options: GasLimit,
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
	* @returns { void }
	*/
	"sendMessage" (
		chatroomId: ArgumentTypes.AccountId,
		message: string,
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "sendMessage", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [chatroomId, message], __options);
	}

	/**
	* getMessages
	*
	* @param { ArgumentTypes.AccountId } chatroomId,
	* @returns { Result<Array<ReturnTypes.Message>, ReturnTypes.LangError> }
	*/
	"getMessages" (
		chatroomId: ArgumentTypes.AccountId,
		__options: GasLimit,
	): Promise< QueryReturnType< Result<Array<ReturnTypes.Message>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "getMessages", [chatroomId], __options, (result) => { return handleReturnType(result, getTypeDescription(17, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* deleteChatroom
	*
	* @param { ArgumentTypes.AccountId } chatroomId,
	* @returns { void }
	*/
	"deleteChatroom" (
		chatroomId: ArgumentTypes.AccountId,
		__options: GasLimit,
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
	* @returns { void }
	*/
	"setTimeout" (
		chatroomId: ArgumentTypes.AccountId,
		timeout: (number | string | BN),
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "setTimeout", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [chatroomId, timeout], __options);
	}

	/**
	* checkTimeout
	*
	* @param { ArgumentTypes.AccountId } chatroomId,
	* @returns { void }
	*/
	"checkTimeout" (
		chatroomId: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "checkTimeout", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [chatroomId], __options);
	}

}