import style from "../ProductCategoryLayout.module.scss";
import Icon from "react-icons-kit";
import React, { Component, Fragment, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import { folder } from "react-icons-kit/feather/folder";
import { file } from "react-icons-kit/feather/file";
import { folderPlus } from "react-icons-kit/feather/folderPlus";
import { filePlus } from "react-icons-kit/feather/filePlus";
import { chevronsRight } from "react-icons-kit/feather/chevronsRight";
import { chevronsDown } from "react-icons-kit/feather/chevronsDown";
import clsx from "classnames";
import { bold } from 'react-icons-kit/icomoon/bold';
import { box } from 'react-icons-kit/feather/box';
import { faStaylinked } from "@fortawesome/free-brands-svg-icons";
import VerticalMiddleWrapper from "layouts/wrapper/VerticalMiddleWrapper";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ProductType } from "shared/constants/constants";

function CategoryToolbar({ type, node, addItem, activeNode, setActiveNode }) {
    const [isActive, setActive] = useState();

    useEffect(() => { 
        setActive(activeNode && activeNode.id === node.id && activeNode.type === node.type && activeNode.category === node.category ? true : false);
    });

    const unfold = () => {
        node.collapsed = false;
    }
    const onAddCategory = (e) => {
        e.preventDefault();
        e.stopPropagation();
        unfold();
        addItem(ProductType.CATEGORY, node);
    }

    const onAddBrand = (e) => {
        e.preventDefault();
        e.stopPropagation();
        unfold();
        addItem(ProductType.BRAND, node);
    }

    const onAddProduct = (e) => {
        e.preventDefault();
        e.stopPropagation();
        unfold();
        addItem(ProductType.PRODUCT, node);
    }


    const onClick = (e) => {
        if (node.id !== "root") {
            unfold();
            setActiveNode(node);
        }
    }

    const onMouseDown = () => {
        if (node.id !== "root") {
            unfold();
            setActiveNode(node);
        }
    }

    return (
        <div className={style.toolbar} onMouseDown={onMouseDown}>
            <VerticalMiddleWrapper>
                <div className={clsx(style.floatLeft, { [style.active]: isActive })} onClick={onClick}>
                    <VerticalMiddleWrapper>
                        {
                            {
                                CATEGORY: node.icon ? <img className={style.icon} src={node.icon} /> : <Icon icon={folder} />,
                                BRAND: node.icon ? <img className={style.icon} src={node.icon} /> : <Icon icon={bold} />,
                                PRODUCT: node.image ? <img className={style.icon} src={node.image} /> : <Icon icon={box} />,
                            }[node.type]
                        }

                        <span className={style.title}>{(node.brandTitleKr?node.brandTitleKr+" ":"")}{node.titleKr}</span>
                    </VerticalMiddleWrapper>
                </div>
            </VerticalMiddleWrapper>
            <div className={style.toolbarFileFolder}>
                {node.type === ProductType.CATEGORY && (
                    <Fragment>
                        {
                            type === ProductType.BRAND ?
                                <Icon title="New Brand" icon={bold} onMouseDown={onAddBrand} />
                                :
                                <>
                                    <Icon title="New Category" icon={folderPlus} onMouseDown={onAddCategory} />
                                    {/* <Icon title="New Product" icon={filePlus} onMouseDown={onAddProduct} /> */}
                                </>
                        }

                    </Fragment>
                )}

                {node.type === ProductType.BRAND && (
                    <Fragment>
                        <Icon title="New Product" icon={filePlus} onMouseDown={onAddProduct} />
                    </Fragment>
                )}
            </div>
        </div>
    );
}

export default CategoryToolbar;