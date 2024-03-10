/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { GasLimit, GasLimitAndRequiredValue } from '@727-ventures/typechain-types';
import { buildSubmittableExtrinsic } from '@727-ventures/typechain-types';
import type * as ArgumentTypes from '../types-arguments/chatroom';
import type BN from 'bn.js';
import type { ApiPromise } from '@polkadot/api';



export default class Methods {
	readonly __nativeContract : ContractPromise;
	readonly __apiPromise: ApiPromise;

	constructor(
		nativeContract : ContractPromise,
		apiPromise: ApiPromise,
	) {
		this.__nativeContract = nativeContract;
		this.__apiPromise = apiPromise;
	}
	/**
	 * createChatroom
	 *
	*/
	"createChatroom" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "createChatroom", [], __options);
	}

	/**
	 * getChatroom
	 *
	 * @param { ArgumentTypes.AccountId } chatroomId,
	*/
	"getChatroom" (
		chatroomId: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "getChatroom", [chatroomId], __options);
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
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "isAParticipant", [chatroomId, participantId], __options);
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
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "invite", [chatroomId, participant], __options);
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
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "sendMessage", [chatroomId, message], __options);
	}

	/**
	 * getMessages
	 *
	 * @param { ArgumentTypes.AccountId } chatroomId,
	*/
	"getMessages" (
		chatroomId: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "getMessages", [chatroomId], __options);
	}

	/**
	 * deleteChatroom
	 *
	 * @param { ArgumentTypes.AccountId } chatroomId,
	*/
	"deleteChatroom" (
		chatroomId: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "deleteChatroom", [chatroomId], __options);
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
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "setTimeout", [chatroomId, timeout], __options);
	}

	/**
	 * checkTimeout
	 *
	 * @param { ArgumentTypes.AccountId } chatroomId,
	*/
	"checkTimeout" (
		chatroomId: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "checkTimeout", [chatroomId], __options);
	}

}