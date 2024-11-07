import Radio from "components/inputs/radio/Radio";
import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import style from "./MobileAppQualityList.module.css"

function MobileAppQualityList(props) {
    const { data } = props;

    return (
        <div className={style.container}>
            <HorizontalFlex>
                <FlexChild>
            <p className={style.list}>{data.list}</p>
            </FlexChild>
            <FlexChild width={40}>
                <Radio name={data.name} checked={data.checked} />
            </FlexChild>
            </HorizontalFlex>
        </div>


    );
}

export default MobileAppQualityList;