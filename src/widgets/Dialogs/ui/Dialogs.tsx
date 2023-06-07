import cls from './Dialogs.module.scss'
import {Button} from "shared/ui/Button";
import {ReactComponent as Add} from "shared/assets/icons/plus.svg";
import {DialogList} from "entities/Dialog";

export const Dialogs = () => {
  return <div className={cls.dialogs}>
    <div>
      <div className={cls.title}>
        <p>Диалоги</p>
        <Button>
          <Add className='icon'/>
        </Button>
      </div>
    </div>
    <div>
      <DialogList />
    </div>
  </div>
}
