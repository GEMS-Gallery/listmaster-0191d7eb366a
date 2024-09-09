import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export type Result = { 'ok' : boolean } |
  { 'err' : string };
export type Result_1 = { 'ok' : bigint } |
  { 'err' : string };
export interface ShoppingItem {
  'id' : bigint,
  'completedAt' : [] | [bigint],
  'completed' : boolean,
  'description' : string,
}
export interface _SERVICE {
  'addItem' : ActorMethod<[string], Result_1>,
  'deleteItem' : ActorMethod<[bigint], Result>,
  'getItems' : ActorMethod<[], Array<ShoppingItem>>,
  'toggleItemCompletion' : ActorMethod<[bigint], Result>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
