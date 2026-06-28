import style from "./Modal.module.scss";
import { ReactNode, useEffect } from "react";
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
const ModalMain = ({
  active,
  setActive,
  children,
  content,
  closeButton,
  dataType,
  fullScreen,
}: PropsType) => {
  useEffect(() => {
    setActive(false);
  }, []);
  return (
    <div datatype={dataType}>
      {content === true ? (
        <div
          className={active ? style.modal_active_content : style.modal}
          onClick={() => setActive(false)}
        >
            <div
              className={`${active ? style.modal__content_active : style.modal__content} ${fullScreen ? style.modal__content_fullScreen : ''}`}
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
          className={active ? style.modal_active : style.modal}
          onClick={() => setActive(false)}
        >
          <div
            className={`${active ? style.modal__content_active : style.modal__content} ${fullScreen ? style.modal__content_fullScreen : ''}`}
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalMain;
