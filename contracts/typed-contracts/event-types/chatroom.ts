import type {ReturnNumber} from "@727-ventures/typechain-types";
import type * as ReturnTypes from '../types-returns/chatroom';

export interface ChatroomCreated {
	id: string;
	owner: ReturnTypes.AccountId | null;
	members: Array<ReturnTypes.AccountId | null>;
}

