import type BN from 'bn.js';

export type AccountId = string | number[]

export type Message = {
	sender: AccountId,
	content: string,
	sentTimestamp: (number | string | BN)
}

export enum LangError {
	couldNotReadInput = 'CouldNotReadInput'
}

export type Room = {
	owner: AccountId,
	timeout: (number | string | BN)
}

