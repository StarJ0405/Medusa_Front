import style from "./TabView.module.css";

function TabViewChild(props) {
    return (
        <div className={style.child}>
            {props.children}
        </div>
    );
}

export default TabViewChild;