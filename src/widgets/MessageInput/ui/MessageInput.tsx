import cls from './MessageInput.module.scss'
import React from 'react'
import { ReactComponent as Cog } from 'shared/assets/icons/cog.svg'
import { ReactComponent as Send } from 'shared/assets/icons/paper-airplane.svg'
import { Button } from 'shared/ui/Button'

export const MessageInput = () => {
  return (
    <div className={cls.messages__input}>
      <div className={cls.input__block}>
        <div className={cls.attach}>
          <Button>
            <Cog className="icon" />
          </Button>
        </div>

        <div style={{ flexGrow: 1 }}>
          <div style={{ overflow: 'hidden', height: '56px' }}>
            <div style={{ position: 'relative' }}>
              <div className={cls.body} contentEditable placeholder="Введите сообщение..." />
            </div>
          </div>
        </div>

        <div className={cls.send}>
          <Button>
            <Send className="icon" />
          </Button>
        </div>
      </div>
    </div>
  )
}
