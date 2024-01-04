export type Position = {
  x: number;
  y: number;
};

export interface IMessageContextMenu {
  isOpen: boolean;
  messageId?: number;
  position?: Position;
}
