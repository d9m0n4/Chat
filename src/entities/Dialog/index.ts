export { DialogList } from './ui/DialogList/DialogList';
export {
  getFilteredDialogs,
  isDialogLoading,
  getActiveDialog,
  getDialogPartner,
  getDialogsState,
  getPrevActiveDialog,
} from './model/selectors';
export { dialogReducers } from './model/slices/dialogSlice';
export type { IDialogData } from './model/types/dialogs';
