import style from "./ModalBase.module.css"

function ModalBaseFooter({ buttonText, modalClose }) {
  return (
    <div className={style.footer}>
      <button className={style.close} onClick={modalClose}>
        {' '}{buttonText}{' '}
      </button>
    </div>
  );
}

export default ModalBaseFooter;