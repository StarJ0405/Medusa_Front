import { useState, useEffect } from "react";
import useAltEffect from "shared/hooks/useAltEffect";
import { requester } from "App";
import VerticalFlex from "layouts/flex/VerticalFlex";
import FlexChild from "layouts/flex/FlexChild";
import { Outlet } from "react-router-dom";
import Tree from "react-ui-tree";
import Icon from "react-icons-kit";
import { chevronsRight } from "react-icons-kit/feather/chevronsRight";
import { chevronsDown } from "react-icons-kit/feather/chevronsDown";
import { ContextMenu, MenuItem } from "react-contextmenu";
import _ from "lodash";
import { StrollableContainer } from "react-stroller";
import deepdash from "deepdash";
import style from "./ProductCategoryLayout.module.scss";
import Node from "./tree/Node";
import { clone, getDifference, flattenTree } from "shared/utils/Utils";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import { Navigate, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import VerticalMiddleWrapper from "layouts/wrapper/VerticalMiddleWrapper";
import { ProductType } from "shared/constants/constants";

deepdash(_);

function ProductCategoryLayout() {
    const [initData, setInitData] = useState();
    const [activeNode, setActiveNode] = useState();
    const [collapsed, setCollapsed] = useState(false);
    const [tree, setTree] = useState({ id: "root", titleKr: "카테고리", titleCn: "categpry", type: "CATEGORY", leaf: false, children: [] });
    const [beforeTreeState, setBeforeTreeState] = useState();
    const navigate = useNavigate();

    useAltEffect(() => {
        requester.getAllProductCategories((result) => {
            let initiatedData = { ...tree, children: result.data };
            setInitData(clone(initiatedData));
            setTree(initiatedData);
        });
    }, []);

    const updateItem = (id, data) => {
        let result;

        const newTree = _.mapDeep(clone(tree), (item, key, parentValue) => {
            const cloneItem = Object.assign({}, item);
            if (cloneItem.id === id) {
                Object.keys(data).map((key) => {
                    if (key !== "children") {
                        item[key] = data[key];
                    }
                });
                result = item;
            }
            return cloneItem;
        })[0];

        setTree(() => {
            setBeforeTreeState(newTree);
            return { ...newTree };
        });

        setActiveNode(result);

        return result;
    }

    const onTreeUiChange = (changedTree) => {
        const newTree = _.mapDeep(clone(changedTree), (item, key, parentValue) => {
            const cloneItem = Object.assign({}, item);
            if (cloneItem) {
                if (cloneItem.children && cloneItem.children.length > 0) {
                    cloneItem.children.map((child) => {
                        if (cloneItem.id && cloneItem.id === "root") {
                            child.parentId = null;
                        } else {
                            child.parentId = cloneItem.id;
                        }
                    });
                } else {
                    cloneItem.children = [];
                }
            }
            return cloneItem;
        })[0];

        let origin = flattenTree(tree);
        let changed = flattenTree(newTree);
        let differences = getDifference(origin, changed);
        let isDifferentFromBeforeTreeUiUpdate = differences.length > 0 ? true : false;

        if (isDifferentFromBeforeTreeUiUpdate) {
            setTree(() => {
                setBeforeTreeState(tree);
                return { ...newTree };
            });
        }
    };

    const addItem = (itemType, active) => {
        let newItem;
        let cloneParent = active.id === "root" ? null : active.id;
        let generatedUuid = uuidv4();
        let generatedSuffix = generatedUuid.split("-")[0];
        if (itemType === ProductType.CATEGORY) {
            newItem = {
                id: generatedUuid,
                type: ProductType.CATEGORY,
                titleKr: `New ${itemType} ${generatedSuffix}`,
                parentId: cloneParent,
                children: [],
                collapsed: false
            };
        } else if (itemType === ProductType.BRAND) {
            newItem = {
                id: generatedUuid,
                type: ProductType.BRAND,
                titleKr: `New ${itemType} ${generatedSuffix}`,
                parentId: cloneParent,
                children: [],
                collapsed: false
            };
        } else if (itemType === ProductType.PRODUCT) {
            newItem = {
                id: generatedUuid,
                type: ProductType.PRODUCT,
                titleKr: `New ${itemType} ${generatedSuffix}`,
                parentId: cloneParent,
                collapsed: true
            };
        }

        const newTree = _.mapDeep(clone(tree), (item, key, parentValue) => {
            const cloneItem = Object.assign({}, item);
            if (cloneItem) {
                if (cloneItem.id === active.id && cloneItem.type === active.type) {
                    if (cloneItem.type === ProductType.CATEGORY) {
                        cloneItem.children.push(newItem);
                    } else if (cloneItem.type === ProductType.BRAND && cloneItem.category === active.category) {
                        cloneItem.children.push(newItem);
                    } else if (cloneItem.type === ProductType.PRODUCT) {

                    }
                }
            }
            return cloneItem;
        })[0];

        setTree(() => {
            setBeforeTreeState(tree);
            return { ...newTree };
        });
    };

    const deleteFromTree = (o, id) => {
        function getNode(a, i) {
            if (a.id === id) {
                index = i;
                return true;
            }
            if (Array.isArray(a.children) && a.children.some(getNode)) {
                if (~index) {
                    a.children.splice(index, 1);
                    index = -1;
                }
                return true;
            }
        }

        var index = -1;
        [o].some(getNode);
    };

    const handleContextClick = (e, { action, name: id }) => {
        switch (action) {
            case "delete":
                const deleteObj = _.findDeep(tree, item => item.id === id, {
                    childrenPath: "children"
                });
                let data = deleteObj.value;
                let cloneTree = clone(tree);
                deleteFromTree(cloneTree, id, data);
                setTree(() => {
                    setBeforeTreeState(tree);
                    return { ...cloneTree };
                });
                break;
            default:
        }
    };

    const toggleCollapse = () => {
        setCollapsed((before) => !before);
    };

    useEffect(() => {
        let url;
        if (activeNode) {
            url = activeNode.type + "/manager/" + activeNode.id;
            navigate(url);
        }
    }, [activeNode]);

    useEffect(() => {
        if (beforeTreeState === undefined) {
            //initiated
        } else {
            let initiatedData = flattenTree(initData);
            let origin = flattenTree(beforeTreeState);
            let changed = flattenTree(tree);
            let differences = getDifference(origin, changed)
            let difference = differences[0];
            let isSameOriginAndInitiatedData = getDifference(origin, initiatedData).length > 0 ? false : true;
            let isDifferentFromInitiatedData = getDifference(changed, initiatedData).length > 0 ? true : false;
            let isDifferentFromBefore = getDifference(changed, origin).length > 0 ? true : false;
            let isChanged = (origin.length > 0 && isDifferentFromBefore) || (isSameOriginAndInitiatedData && isDifferentFromBefore);

            if (isChanged) {
                let data = difference;
                if (origin.length === changed.length) {
                    //update
                    if (difference) {
                        requester.updateProductCategory(data, (result) => {
                            if (result.code === 0) {
                                let resultData = result.data;
                                let changedItem = updateItem(data.id, resultData);
                                setActiveNode(changedItem);
                                // setTree((before) => {
                                //     setBeforeTreeState(tree);
                                //     return { ...tree };
                                // });
                            }
                        });
                    }
                } else if (origin.length > changed.length) {
                    //delete
                    if (difference) {
                        requester.removeProductCategory(data, (result) => {

                        })
                    }
                } else if (origin.length < changed.length) {
                    //add
                    if (difference) {
                        requester.createProductCategory(data, (result) => {
                            if (result.code === 0) {
                                let resultData = result.data;
                                let changedItem = updateItem(data.id, resultData);
                                setActiveNode(changedItem);
                                // setTree((before) => {
                                //     setBeforeTreeState(tree);
                                //     return { ...tree };
                                // });
                            }
                        });
                    }
                }
            }
        }
    }, [tree]);

    return (
        <div className={style.pure}>
            {
                tree &&
                <>
                    <HorizontalFlex flexStart={true} height={"100%"}>
                        <FlexChild width={300} height={"100%"} overflowY={"auto"} >
                            <div className={style.tree}>
                                <div className={style.toolbar}>
                                    <div className={style.floatLeft}>
                                        <VerticalMiddleWrapper>
                                            <Icon title={collapsed ? "expand" : "collapse"} icon={collapsed ? chevronsRight : chevronsDown} onClick={toggleCollapse} />
                                            <span>카테고리</span>
                                        </VerticalMiddleWrapper>
                                    </div>
                                </div>
                                {!collapsed && (
                                    <Tree paddingLeft={20} tree={tree}
                                        onChange={onTreeUiChange}
                                        renderNode={(node) => <Node root={tree.id} node={node} activeNode={activeNode} setActiveNode={setActiveNode} handleContextClick={handleContextClick} addItem={addItem} />}
                                    />
                                )}
                            </div>
                        </FlexChild>
                        <FlexChild height={"100%"}>
                            <div className={style.noPure}>
                                <Outlet context={[updateItem, setActiveNode]} />
                            </div>
                        </FlexChild>
                    </HorizontalFlex>
                    <ContextMenu id="FILE_CONTEXT_MENU" >
                        <MenuItem data={{ action: "delete" }} onClick={handleContextClick} > Delete </MenuItem>
                    </ContextMenu>
                </>
            }
        </div>
    );
}

export default ProductCategoryLayout;