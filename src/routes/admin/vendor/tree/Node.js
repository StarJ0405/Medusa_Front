import style from "../ProductCategoryLayout.module.scss";
import Icon from "react-icons-kit";
import React, { Component, Fragment, useState, useEffect } from "react";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import { folder } from "react-icons-kit/feather/folder";
import { file } from "react-icons-kit/feather/file";
import { folderPlus } from "react-icons-kit/feather/folderPlus";
import { filePlus } from "react-icons-kit/feather/filePlus";
import { chevronsRight } from "react-icons-kit/feather/chevronsRight";
import { chevronsDown } from "react-icons-kit/feather/chevronsDown";
import CategoryToolbar from "./CategoryToolbar";

function Node({ root, type, node, activeNode, setActiveNode, handleContextClick, addItem }) {
    const disable = node.id === root ? true : false;

    const collect = (props) => {
        return props;
    }

    return (
        <ContextMenuTrigger
            id="FILE_CONTEXT_MENU"
            key={node.id}
            name={node.id}
            collect={collect}
            holdToDisplay={-1}
            onItemClick={handleContextClick}
            disable={disable}
        >
            <CategoryToolbar type={type} node={node} addItem={addItem} activeNode={activeNode} setActiveNode={setActiveNode} />
        </ContextMenuTrigger>
    );

}

export default Node;