import style from "./MobileAccount.module.css"
import { Provider, useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getTokenPayload, removeLocalStorage } from "shared/utils/Utils";
import useAltEffect from "shared/hooks/useAltEffect";
import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import VerticalFlex from "layouts/flex/VerticalFlex";
import Particle from "components/Particle";
import PaddingWrapper from "layouts/wrapper/PaddingWrapper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faGear, faTicketSimple } from "@fortawesome/free-solid-svg-icons";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import ButtonEclipse from "components/buttons/ButtonEclipse";
import { Link, useLocation } from "react-router-dom";
import { requester } from "App";
import { decode } from "shared/utils/Utils";
import MobileOrderList from "./sign/order/MobileOrderList";
import { faClock, faHeart, faStar } from "@fortawesome/free-regular-svg-icons";
import MobileMyPage from "./myPage/MobileMyPage";
import ProgressBar from "components/progressBar/ProgressBar";
import MobileProfileImage from "../setting/category/profile/MobileProfileImage";
import FixedHeader from "layouts/container/FIxedHeader";
import MobilePurchaseOrder from "routes/order/purchaseOrder/MobilePurchaseOrder";
import { useTranslation } from "react-i18next";


function MobileAccount() {
  const { t } = useTranslation();

  const { userName } = useSelector((state) => ({
    userName: state.auth.userName,
  }));
  const { products } = useSelector((state) => ({
    products: state.cart.products,
  }));
  const location = useLocation();
  const [isLogin, setLogin] = useState(false);
  const [data, setData] = useState();
  const [point, setPoint] = useState("20%");

  useAltEffect(() => {
    requester.getOrderProducts((result) => {
      setData(result.data);
      
    });
  }, []);

  useAltEffect(() => {
    if (userName) {
      setLogin(true);
    }
  }, [userName]);

  const onClickBack = () => {
    window.history.back();
  }

  return (

    <VerticalFlex >
      <FlexChild height={40}>
        {isLogin ?
          <FixedHeader height={40}>
            <div className={style.accountArea}>
              <HorizontalFlex>
                <FlexChild>
                  <p onClick={onClickBack}><FontAwesomeIcon icon={faArrowLeft} />&nbsp;&nbsp;</p>
                  <p>{t("account")} {t("info")}</p>
                </FlexChild>
                <FlexChild justifyContent={"flex-end"}>
                  <Link to="/setting" style={{
                    color: "white",
                  }}>
                    <p className={style.setting}><FontAwesomeIcon icon={faGear} /></p>
                  </Link>
                </FlexChild>
              </HorizontalFlex>
            </div>
          </FixedHeader>
          :
          <FixedHeader height={40}>
            <div className={style.accountArea}>
              <p onClick={onClickBack}><FontAwesomeIcon icon={faArrowLeft} /></p>
              <p>{t("login")}</p>
            </div>
          </FixedHeader>
        }

      </FlexChild>
      <FlexChild>
        {isLogin ?
          <>
            <FlexChild>
              <div className={style.myProfileWrap}>
                {userName ?
                  <VerticalFlex>
                    <FlexChild>
                      <HorizontalFlex>
                        <FlexChild width={50}>
                          <MobileProfileImage />
                        </FlexChild>
                        <FlexChild>
                          <div className={style.profileWrap}>
                            <VerticalFlex>
                              <FlexChild justifyContent={"flex-start"} >
                                <div>
                                  <p className={style.account}>민들 레</p>
                                </div>
                              </FlexChild>
                              <FlexChild>
                                <HorizontalFlex>
                                  <FlexChild>
                                    <div className={style.progressBarWrap}>
                                      <ProgressBar point={point} />
                                    </div>
                                  </FlexChild>
                                  <FlexChild width={100}>
                                    <p className={style.point}>{point} / 100%</p>
                                  </FlexChild>
                                </HorizontalFlex>
                              </FlexChild>
                            </VerticalFlex>
                          </div>
                        </FlexChild>
                      </HorizontalFlex>
                    </FlexChild>
                    <FlexChild>
                      <div className={style.myPageWrap}>
                        <MobileMyPage />
                      </div>
                    </FlexChild>
                  </VerticalFlex>
                  : null}
              </div>
            </FlexChild>
            <FlexChild>
              <div className={style.title}>
                <p>{t("member")} {t("orderHistory")}</p>
              </div>
            </FlexChild>
            <FlexChild>
              <div className={style.orderHeaderWrap}>
                <HorizontalFlex justifyContent={"center"}>

                  <FlexChild justifyContent={"center"}>
                    <p>{t("orderTime")}</p>
                  </FlexChild>
                  <FlexChild justifyContent={"flex-end"}>
                    <p>{t("orderNumber")}</p>
                  </FlexChild>
                  <FlexChild justifyContent={"flex-end"}>
                    <p>{t("totalAmount")}</p>
                  </FlexChild>
                  <FlexChild justifyContent={"flex-end"}>
                    <p>{t("quantity")}</p>
                  </FlexChild>
                </HorizontalFlex>
              </div>
            </FlexChild>
            <FlexChild>
              {data ? data.map((data, index) => (
                <div className={style.container}>
                  <MobilePurchaseOrder data={data} key={index} index={index} />
                </div>
              )) : <p>{t("notProducts")}</p>}
            </FlexChild>
            <FlexChild height={60} />
          </>
          :
          <>
            <div className={style.signUpWrap}>
              <p>{t("notAccount")}? </p>
              <Link to="/signUp"><p className={style.signUp}>{t("signUp")}</p></Link>
            </div>
          </>
        }
      </FlexChild>
    </VerticalFlex>
  );
}

export default MobileAccount;