import clsx from "clsx";
import style from "./NavTabs.module.css";

function NavTabChild(props) {
    const { index, activeIndex } = props;

    return (
        <div className={clsx(style.child, { [style.active]: activeIndex === index })}>
            {props.children}
        </div>
    );
}

export default NavTabChild;