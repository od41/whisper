import type BN from 'bn.js';
import type {ReturnNumber} from '@727-ventures/typechain-types';

export type AccountId = string | number[]

export type Message = {
	sender: AccountId,
	content: string,
	sentTimestamp: number
}

export enum LangError {
	couldNotReadInput = 'CouldNotReadInput'
}

export type Room = {
	owner: AccountId,
	timeout: number
}

