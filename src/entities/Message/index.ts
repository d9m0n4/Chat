export { Message } from './ui/Message';
export {
  getContextMenuPosition,
  getContextMenuIsOpen,
  getContextMenuMessageId,
  getMessagesState,
  getMessages,
} from './model/selectors';

export type {
  Position,
  IMessageContextMenu,
} from './model/types/messageContextMenu';

export type { IMessagesData } from './model/types/Message';
