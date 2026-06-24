import style from "./Modal.module.scss";
import { ReactNode, useEffect } from "react";

type PropsType = {
  active: boolean;
  setActive: any;
  children?: ReactNode;
  content?: boolean;
  closeButton: boolean;
  dataType?: string;
};
const ModalMain = ({
  active,
  setActive,
  children,
  content,
  closeButton,
  dataType,
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
            className={
              active ? style.modal__content_active : style.modal__content
            }
            onClick={(e) => e.stopPropagation()}
          >
            {children}
            {closeButton && (
              <button
                className={style.close__button}
                onClick={() => setActive(false)}
              >
                <svg width="40" height="40" viewBox="0 0 40 40">
                  <path
                    fill="white"
                    fillRule="evenodd"
                    d="M25.6 14.3a1 1 0 0 1 0 1.4l-4.24 4.25 4.25 4.24a1 1 0 1 1-1.42 1.42l-4.24-4.25-4.24 4.25a1 1 0 0 1-1.42-1.42l4.25-4.24-4.25-4.24a1 1 0 0 1 1.42-1.42l4.24 4.25 4.24-4.25a1 1 0 0 1 1.42 0z"
                  ></path>
                </svg>
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
            className={
              active ? style.modal__content_active : style.modal__content
            }
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
