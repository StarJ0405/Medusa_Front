import { useState, useEffect, useContext } from "react";
import { requester } from "App";
import FlexChild from "layouts/flex/FlexChild";
import Icon from "react-icons-kit";
import _ from "lodash";
import deepdash from "deepdash";
import style from "./AdminCategoryLayout.module.css";
import { clone } from "shared/utils/Utils";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import { AuthContext } from "providers/AuthProvider";
import { CSidebar, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from "@coreui/react";
import clsx from "clsx";
import OutsideClickDetector from "components/buttons/OutsideClickDetector";
import AdminCategoryDetail from "./AdminCategoryDetail";
import { folderPlus } from "react-icons-kit/feather/folderPlus";
import { filePlus } from "react-icons-kit/feather/filePlus";
import { ProductType } from "shared/constants/constants";
import Center from "layouts/wrapper/Center";
import { stubFalse } from "lodash-es";
import CIcon from "@coreui/icons-react";
import { cilTrash } from "@coreui/icons";
import { Switch } from "@mui/material";

deepdash(_);

function AdminCategoryLayout() {
    const { roles } = useContext(AuthContext);
    const [depth, setDepth] = useState();
    const flattenList = [];
    const [categories, setCategories] = useState();
    const [selectedCategory, setSelectedCategory] = useState();
    const [isDetailVisible, setDetailVisible] = useState(false);

    useEffect(() => {
        if (roles) {
            refreshCategories();
        }
    }, [roles]);


    const refreshCategories = () => {
        requester.getAllCategoriesForAdmin((result) => {
            let resultData = result.data;
            console.log(result.data);
            initCategories(resultData);
        });
    }

    const initCategories = (data) => {
        let onlyCategories = clone(data);
        _.filterDeep(onlyCategories, (value, key, item) => {
            let childrenLength = item.children.length;
            let productLength = 0;
            item.children.map((child) => {
                if (child.type === ProductType.PRODUCT) {
                    productLength++;
                }
            });

            if (productLength > 0) {
                item.children = [];
            }
        });

        let obj = { children: onlyCategories };

        //부모를 강제로 넣었으니 depth를 -1부터 시작
        setupCategoryDepth(obj, -1, (result) => {
            //강제로 추가한 부모를 필터링
            let depth = 0;
            let filtered = result.filter((category) => {
                //필터링하면서 tree의 depth를 측정
                let currentCategoryDepth = category.depth;
                if (currentCategoryDepth > depth) {
                    depth = currentCategoryDepth;
                }
                return currentCategoryDepth > 0
            });
            setDepth(depth);
            setCategories(filtered);
        });

        if (selectedCategory) {
            let data = { id: selectedCategory.id };
            requester.getCategoryForAdmin(data, (result) => {
                
                setSelectedCategory(result.data);
            });
        }
    }

    const onDeleteClick = (category) => {
        let data;
        if (category) {
            data = clone(category);
        } else {
            data = clone(selectedCategory);
        }

        requester.deleteCategory(data, (result) => {
            let resultData = result.data;
            initCategories(resultData);
        });

    }
    const onOutsideClick = () => {
        setDetailVisible(false);
    }

    const onCategoryClick = (category) => {
        let data = { id: category.id };
        requester.getCategoryForAdmin(data, (result) => {
            setSelectedCategory(result.data);
            setDetailVisible(true);
        });

    }

    const setupCategoryDepth = (obj, depth, callback) => {
        obj.depth = depth + 1;
        let removedChildren = clone(obj);
        removedChildren.children = null;
        flattenList.push(removedChildren);
        if (obj.children && obj.children.length > 0) {
            obj.children.map((child) => setupCategoryDepth(child, obj.depth));
        }

        callback && callback(flattenList);
    }

    const CategoryRow = ({ data }) => {
        const [isDisplay, setDisplay] = useState(data.displayYn);

        let dummies = Array.from({ length: data.depth - 1 });

        const onDisplayToggleClick = () => {
            setDisplay((before) => !before);
        }

        return (
            <CTableRow>
                {dummies.map((data, index) =>
                    <CTableDataCell key={index} width={10}>
                        {/* <CIcon icon={cilMinus} /> */}
                    </CTableDataCell>
                )}
                <CTableDataCell colSpan={depth - data.depth + 1}>
                    <HorizontalFlex>
                        <FlexChild width={50}>
                            <img className={style.icon} src={data.icon} />
                        </FlexChild>
                        <FlexChild>
                            <div className={style.categoryTitleArea} onClick={() => onCategoryClick(data)}>
                                {`${data.titleKr} (${data.titleCn})`}
                            </div>
                        </FlexChild>
                    </HorizontalFlex>
                </CTableDataCell>
                <CTableDataCell width={150}>
                    <HorizontalFlex>
                        <FlexChild>
                            <Center>
                                <Icon className={style.interactionButton} title="New Category" icon={folderPlus} />
                            </Center>
                        </FlexChild>
                        <FlexChild>
                            <Center>
                                <Icon className={style.interactionButton} title="New Category" icon={filePlus} />
                            </Center>
                        </FlexChild>
                    </HorizontalFlex>
                </CTableDataCell>
                <CTableDataCell>
                    <Center>
                        <Switch onClick={onDisplayToggleClick} checked={isDisplay} />
                    </Center>
                </CTableDataCell>
                <CTableDataCell>
                    <Center>
                        <CIcon className={style.interactionButton} title="New Category" icon={cilTrash} onClick={() => onDeleteClick(data)} />
                    </Center>
                </CTableDataCell>
            </CTableRow>
        );
    }

    return (
        <div>
            <CTable striped hover bordered align="middle">
                <CTableHead align="middle" >
                    <CTableRow>
                        <CTableHeaderCell scope="col" colSpan={depth} align="middle">name</CTableHeaderCell>
                        <CTableHeaderCell scope="col" align="middle">interaction</CTableHeaderCell>
                        <CTableHeaderCell scope="col" align="middle">display</CTableHeaderCell>
                        <CTableHeaderCell scope="col" align="middle">delete</CTableHeaderCell>
                    </CTableRow>
                </CTableHead>
                <CTableBody>
                    {categories && categories.map((category, index) =>
                        <CategoryRow data={category} key={index} />
                    )}
                </CTableBody>
            </CTable>
            {/* <OutsideClickDetector onOutsideClick={onOutsideClick}> */}
                <CSidebar className={clsx(style.detailView, { [style.show]: isDetailVisible })} position="fixed" visible={isDetailVisible}>
                    <AdminCategoryDetail selectedCategory={selectedCategory} onClose={() => setDetailVisible(false)} onChange={refreshCategories} visible={isDetailVisible} />
                </CSidebar>
            {/* </OutsideClickDetector> */}
        </div>
    );
}

export default AdminCategoryLayout;