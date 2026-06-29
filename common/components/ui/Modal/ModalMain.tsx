import style from "./Modal.module.scss";
import { ReactNode, useRef } from "react";
import {CSSTransition} from 'react-transition-group';
import Image from "next/image";
import closeIcon from './closeIcon.svg'

type PropsType = {
  active: boolean;
  setActive: any;
  children?: ReactNode;
  content?: boolean;
  closeButton: boolean;
  dataType?: string;
  fullScreen?: boolean;
};

const TIMEOUT = 400;

const ModalMain = ({
  active,
  setActive,
  children,
  content,
  closeButton,
  dataType,
  fullScreen,
}: PropsType) => {
  const modalRef = useRef<HTMLDivElement>(null);

  return (
    <CSSTransition
      nodeRef={modalRef}
      in={active}
      timeout={TIMEOUT}
      unmountOnExit
      classNames={{
        enter: style.enter,
        enterActive: style.enterActive,
        exit: style.exit,
        exitActive: style.exitActive,
      }}
    >
      <div ref={modalRef} datatype={dataType}>
        {content === true ? (
          <div
            className={style.modal_active_content}
            onClick={() => setActive(false)}
          >
            <div
              className={`${style.modal__content_active} ${fullScreen ? style.modal__content_fullScreen : ''}`}
              onClick={(e) => e.stopPropagation()}
            >
              {children}
              {closeButton && (
              <button
                className={style.close__button}
                onClick={() => setActive(false)}
              >
                <Image src={closeIcon} alt="close" width={26} height={26} />
              </button>
            )}
          </div>
        </div>
      ) : (
        <div
          className={style.modal_active}
          onClick={() => setActive(false)}
        >
          <div
            className={`${style.modal__content_active} ${fullScreen ? style.modal__content_fullScreen : ''}`}
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </div>
        </div>
      )}
    </div>
    </CSSTransition>
  );
};

export default ModalMain;
