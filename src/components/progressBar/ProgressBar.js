import clsx from "classnames";
import Container from "layouts/container/Container";
import style from "./ProgressBar.module.scss"

function ProgressBar(props) {
    return (
            <>
        

                <div className={clsx(style.progress, style.progressStriped, style.active)}>
                <span className={style.text}>{props.text ? props.text : null}</span>
                    <div role="progressbar progressStriped" style={{ width: props.point ? props.point : "40%" }} className={style.progressBar}>
                        
                    </div>

                </div>
                {/* <div className={clsx(style.progress ,style.progressStriped ,style.active)}>
                    <div role="progressbar " style={{width: "90%"}} className={clsx(style.progressBar, style.progressBarSecondary)}><span>Secondary</span></div>
                </div>
                <div className={clsx(style.progress ,style.progressStriped ,style.active)}>
                    <div role="progressbar " style={{width: "80%"}} className={clsx(style.progressBar, style.progressBarDefault)}><span>Default</span></div>
                </div>
                <div className={clsx(style.progress ,style.progressStriped ,style.active)}>
                    <div role="progressbar " style={{width: "70%"}} className={clsx(style.progressBar, style.progressBarSuccess)}><span>Success</span></div>
                </div>
                <div className={clsx(style.progress ,style.progressStriped ,style.active)}>
                    <div role="progressbar " style={{width: "60%"}} className={clsx(style.progressBar, style.progressBarInfo)}><span>Info</span></div>
                </div>
                <div className={clsx(style.progress ,style.progressStriped ,style.active)}>
                    <div role="progressbar " style={{width: "50%"}} className={clsx(style.progressBar, style.progressBarWarning)} ><span>Warning</span></div>
                </div>
                <div className={clsx(style.progress ,style.progressStriped ,style.active)}>
                    <div role="progressbar" style={{width: "40%"}} className={clsx(style.progressBar, style.progressBarDanger)}><span>Danger</span></div>
                </div> */}
        
            </>
            );
}

            export default ProgressBar;