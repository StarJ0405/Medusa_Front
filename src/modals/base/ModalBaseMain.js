import style from "./ModalBase.module.css"

function ModalBaseMain(props) {
  return (
    <div className={style.main} style={{padding: (props.padding ? props.padding + "px" : null),}}>
        {props.withCloseButton ?
          <button className={style.closeButton} onClick={props.modalClose}>
            {' '}&times;{' '}
          </button> : null
        }

        {props.children}
    </div>
  );
}

export default ModalBaseMain;