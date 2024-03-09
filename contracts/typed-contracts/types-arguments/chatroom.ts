import type BN from 'bn.js';

export type AccountId = string | number[]

export enum LangError {
	couldNotReadInput = 'CouldNotReadInput'
}

export type Room = {
	owner: AccountId,
	messages: Array<string>,
	timeout: (number | string | BN)
}

