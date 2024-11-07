import style from "./AdminTabView.module.css";

function AdminTabViewChild(props) {
    return (
        <div className={style.child}>
            {props.children}
        </div>
    );
}

export default AdminTabViewChild;