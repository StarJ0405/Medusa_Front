import style from "./OverlayMenu.module.css"

function OverlayMenuBaseMain(props) {
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

export default OverlayMenuBaseMain;