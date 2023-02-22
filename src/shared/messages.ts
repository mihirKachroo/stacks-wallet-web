import { ExtensionMethods, InternalMethods, Message } from '@shared/message-types';

/**
 * Popup <-> Background Script
 */
type BackgroundMessage<Msg extends ExtensionMethods, Payload = undefined> = Omit<
  Message<Msg, Payload>,
  'source'
>;

export type RequestDerivedStxAccounts = BackgroundMessage<
  InternalMethods.RequestDerivedStxAccounts,
  { secretKey: string; highestAccountIndex: number }
>;

type GetActiveFormState = BackgroundMessage<InternalMethods.GetActiveFormState, { tabId: number }>;

type SetActiveFormState = BackgroundMessage<
  InternalMethods.SetActiveFormState,
  { tabId: number; symbol: string; amount?: string; recipient?: string }
>;

type ShareInMemoryKeyToBackground = BackgroundMessage<
  InternalMethods.ShareInMemoryKeyToBackground,
  { secretKey: string; keyId: string }
>;

type RequestInMemoryKeys = BackgroundMessage<InternalMethods.RequestInMemoryKeys>;

type RemoveInMemoryKeys = BackgroundMessage<InternalMethods.RemoveInMemoryKeys>;

type OriginatingTabClosed = BackgroundMessage<
  InternalMethods.OriginatingTabClosed,
  { tabId: number }
>;

export type BackgroundMessages =
  | RequestDerivedStxAccounts
  | GetActiveFormState
  | SetActiveFormState
  | ShareInMemoryKeyToBackground
  | RequestInMemoryKeys
  | RemoveInMemoryKeys
  | OriginatingTabClosed;

export function sendMessage(message: BackgroundMessages) {
  return chrome.runtime.sendMessage(message);
}
