import style from "./DesktopCategory.module.css";
import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import VerticalFlex from "layouts/flex/VerticalFlex";
import { useTranslation } from "react-i18next";
import PaddingWrapper from "layouts/wrapper/PaddingWrapper";
import CategoryRow from "./modules/CategoryRow";
import SubCategory from "./modules/SubCategory";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useAltEffect from "shared/hooks/useAltEffect";
import { requester } from "App";
import { useEffect, useState } from "react";
import { ProductType } from "shared/constants/constants";
import VerticalMiddleWrapper from "layouts/wrapper/VerticalMiddleWrapper";
import { fas } from "@fortawesome/free-solid-svg-icons";

function DesktopCategory(props) {
  const { t } = useTranslation();
  const [categories, setCategories] = useState();

  useAltEffect(() => {
    requester.getAllCategories((result) => {
      setCategories(result.data);
    })
  }, []);

  return (
    <div className={style.categoryArea}>
      <VerticalFlex>
        <FlexChild height={40}>
          <div className={style.categoryHeader}>
            <PaddingWrapper padding={"0px 10px"}>
              <VerticalFlex>
                <FlexChild>
                  <HorizontalFlex>
                    <FlexChild width={20}>
                      <FontAwesomeIcon icon={fas["faBars"]} />
                    </FlexChild>
                    <FlexChild>
                      <VerticalMiddleWrapper>
                        <p>{t("category")}</p>
                      </VerticalMiddleWrapper>
                    </FlexChild>
                  </HorizontalFlex>
                </FlexChild>
              </VerticalFlex>
            </PaddingWrapper>
          </div>
        </FlexChild>
        <FlexChild>
          {
            categories &&
            <div className={style.categoryList}>
              <VerticalFlex>
                {
                  categories.map((category, index) =>
                    <FlexChild key={index}>
                      <CategoryRow data={category} />
                    </FlexChild>
                  )
                }
              </VerticalFlex>
            </div>
          }
        </FlexChild>
      </VerticalFlex>
    </div>
  );
}

export default DesktopCategory;
