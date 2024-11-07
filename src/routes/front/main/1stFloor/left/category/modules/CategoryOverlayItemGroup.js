import style from "./CategoryOverlayItemGroup.module.css";
import { useState } from "react";
import { NavLink } from "react-router-dom";

function CategoryOverlayItemGroup(props) {
    const { data, brands } = props;

    const onMouseOver = (brandId) => {
        props.callback(brandId);
    }

    const onMouseLeave = (e) => {
        props.callback(null);
    }


    return (
        <div className={style.itemGroup}>
            <div className={style.hashTagArea}>
                <span className={style.hashTag}>{data.hashTagKr}</span>
            </div>
            <ul>
                {
                    data.children.map((item) =>
                        <li key={item.id} >
                            <NavLink to={"product/detail/"+item.id}>
                                <span className={style.item} onMouseOver={() => onMouseOver(item.parentId)} onMouseLeave={onMouseLeave}>{brands.find((brand) => brand.id === item.parentId).titleKr}{" "}{item.titleKr}</span>
                            </NavLink>
                        </li>
                    )
                }
            </ul>
        </div>
    )
}

export default CategoryOverlayItemGroup;