/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { ApiPromise } from '@polkadot/api';
import type { GasLimit, GasLimitAndRequiredValue, Result } from '@727-ventures/typechain-types';
import type { QueryReturnType } from '@727-ventures/typechain-types';
import { queryJSON, queryOkJSON, handleReturnType } from '@727-ventures/typechain-types';
import type * as ArgumentTypes from '../types-arguments/chatroom';
import type * as ReturnTypes from '../types-returns/chatroom';
import type BN from 'bn.js';
//@ts-ignore
import {ReturnNumber} from '@727-ventures/typechain-types';
import {getTypeDescription} from './../shared/utils';
import DATA_TYPE_DESCRIPTIONS from '../data/chatroom.json';


export default class Methods {
	readonly __nativeContract : ContractPromise;
	readonly __apiPromise: ApiPromise;
	readonly __callerAddress : string;

	constructor(
		nativeContract : ContractPromise,
		nativeApi : ApiPromise,
		callerAddress : string,
	) {
		this.__nativeContract = nativeContract;
		this.__callerAddress = callerAddress;
		this.__apiPromise = nativeApi;
	}

	/**
	* createChatroom
	*
	* @returns { Result<ReturnTypes.AccountId, ReturnTypes.LangError> }
	*/
	"createChatroom" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<ReturnTypes.AccountId, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "createChatroom", [], __options , (result) => { return handleReturnType(result, getTypeDescription(10, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getChatroom
	*
	* @param { ArgumentTypes.AccountId } chatroomId,
	* @returns { Result<ReturnTypes.Room | null, ReturnTypes.LangError> }
	*/
	"getChatroom" (
		chatroomId: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<ReturnTypes.Room | null, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "getChatroom", [chatroomId], __options , (result) => { return handleReturnType(result, getTypeDescription(11, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* invite
	*
	* @param { ArgumentTypes.AccountId } chatroomId,
	* @param { ArgumentTypes.AccountId } participant,
	* @returns { Result<null, ReturnTypes.LangError> }
	*/
	"invite" (
		chatroomId: ArgumentTypes.AccountId,
		participant: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<null, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "invite", [chatroomId, participant], __options , (result) => { return handleReturnType(result, getTypeDescription(7, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* sendMessage
	*
	* @param { ArgumentTypes.AccountId } chatroomId,
	* @param { string } message,
	* @returns { Result<null, ReturnTypes.LangError> }
	*/
	"sendMessage" (
		chatroomId: ArgumentTypes.AccountId,
		message: string,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<null, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "sendMessage", [chatroomId, message], __options , (result) => { return handleReturnType(result, getTypeDescription(7, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getMessages
	*
	* @param { ArgumentTypes.AccountId } chatroomId,
	* @returns { Result<Array<string>, ReturnTypes.LangError> }
	*/
	"getMessages" (
		chatroomId: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Array<string>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "getMessages", [chatroomId], __options , (result) => { return handleReturnType(result, getTypeDescription(14, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* deleteChatroom
	*
	* @param { ArgumentTypes.AccountId } chatroomId,
	* @returns { Result<null, ReturnTypes.LangError> }
	*/
	"deleteChatroom" (
		chatroomId: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<null, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "deleteChatroom", [chatroomId], __options , (result) => { return handleReturnType(result, getTypeDescription(7, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* setTimeout
	*
	* @param { ArgumentTypes.AccountId } chatroomId,
	* @param { (number | string | BN) } timeout,
	* @returns { Result<null, ReturnTypes.LangError> }
	*/
	"setTimeout" (
		chatroomId: ArgumentTypes.AccountId,
		timeout: (number | string | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<null, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "setTimeout", [chatroomId, timeout], __options , (result) => { return handleReturnType(result, getTypeDescription(7, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* checkTimeout
	*
	* @param { ArgumentTypes.AccountId } chatroomId,
	* @returns { Result<null, ReturnTypes.LangError> }
	*/
	"checkTimeout" (
		chatroomId: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<null, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "checkTimeout", [chatroomId], __options , (result) => { return handleReturnType(result, getTypeDescription(7, DATA_TYPE_DESCRIPTIONS)); });
	}

}