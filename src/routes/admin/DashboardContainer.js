import clsx from "clsx";
import style from "./DashboardContainer.module.css";
import { useContext, useState, useEffect } from "react";
import { BrowserDetectContext } from "providers/BrowserEventProvider";
import { Responsive, WidthProvider } from "react-grid-layout";
import { requester } from "App";
import Center from "layouts/wrapper/Center";
import CustomButton from "components/buttons/CustomButton";
import DashboardCard from "./dashboardCard/DashboardCard";
import { Switch } from "@mui/material";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import FlexChild from "layouts/flex/FlexChild";
import { decode, encode } from "shared/utils/Utils";
import { light } from "@fortawesome/fontawesome-svg-core/import.macro";
import { toast, ToastContainer } from "react-toastify";

const ResponsiveReactGridLayout = WidthProvider(Responsive);
function DashboardContainer(props) {
    const { name, defaultLayout, indexes } = props;
    const { isMobile } = useContext(BrowserDetectContext);
    const [currentBreakpoint, setCurrentBreakpoint] = useState("lg");
    const [compactType, setCompactType] = useState("vertical");
    const [mounted, setMounted] = useState(false);
    const [isDraggable, setDraggable] = useState(false);
    const [toolbox, setToolbox] = useState({
        lg: []
    });


    const [layouts, setLayouts] = useState(defaultLayout);

    const onBreakpointChange = (breakpoint) => {
        console.log(breakpoint);
        setCurrentBreakpoint(breakpoint);
        setToolbox({
            ...toolbox,
            [breakpoint]: toolbox[breakpoint] || toolbox[currentBreakpoint] || []
        });
    };

    const onCompactTypeChange = () => {
        let oldCompactType = "";

        const compactType =
            oldCompactType === "horizontal"
                ? "vertical"
                : oldCompactType === "vertical"
                    ? null
                    : "horizontal";
        setCompactType(compactType);
    };

    const onLayoutChange = (layout, layouts) => {
        console.log("현재 활성화된 레이아웃:", layout);

        setLayouts({ ...layouts });
    };

    const onDrop = (layout, layoutItem, _ev) => {
        // alert(
        //     `Element parameters:\n${JSON.stringify(
        //         layoutItem,
        //         ["x", "y", "w", "h"],
        //         2
        //     )}`
        // );
    };

    const updateLayouts = () => {
        console.log(JSON.stringify(layouts));
        let convertLayoutData = encode(JSON.stringify(layouts));
        let layoutsData = { name: name, layouts: convertLayoutData }
        console.log(convertLayoutData)
        console.log(layoutsData)
        requester.updateLayouts(layoutsData, (result) => {
            console.log(result.data);
            toast.success("저장했습니다", {
                autoClose: 1000, position: toast.POSITION.BOTTOM_CENTER
            });
        })
    }

    const onEditClick = () => {
        setDraggable(!isDraggable);
    }

    const onResizeStop = () => {
        console.log("onResizeStop");
    }

    const onWidthChange = (containerWidth, margin, cols, containerPadding) => {
        console.log("containerWidth", containerWidth);
    }


    useEffect(() => {
        setMounted(true);

    }, []);

    useEffect(() => {

        let data = { name: name }

        mounted &&
            requester.findLayouts(data, (result => {
                if (result.data.length > 0) {
                    let rawData = decode(result.data[0].layouts);
                    let layoutsData = JSON.parse(rawData);
                    setLayouts(layoutsData);
                }
            }))
    }, [mounted]);

    useEffect(() => {
        console.log(layouts);
    }, [layouts])

    return (
        <div>
            <div className={style.toolbar}>
                <Center width={"100%"}>
                    <HorizontalFlex gap={20}>
                        <FlexChild width={"initial"}>
                            <Switch onClick={onEditClick} checked={isDraggable} />
                            {"편집모드"}
                        </FlexChild>
                        <FlexChild>
                            {
                                isDraggable && <CustomButton text={"저장"} onClick={updateLayouts} />
                            }
                        </FlexChild>
                    </HorizontalFlex>
                </Center>
            </div>
            <div className={clsx(style.container, { [style.mobile]: isMobile })} >
                <ResponsiveReactGridLayout
                    {...props}
                    style={{ background: "#F5F6FB" }}
                    layouts={layouts}
                    measureBeforeMount={false}
                    useCSSTransforms={mounted}
                    compactType={compactType}
                    preventCollision={!compactType}
                    onLayoutChange={onLayoutChange}
                    onBreakpointChange={onBreakpointChange}
                    onDrop={onDrop}
                    isDroppable
                    isDraggable={isDraggable}
                    isResizable={isDraggable}
                    rowHeight={1}
                    breakpoints={{ lg: 1200, xs: 768 }}
                    margin={[10, 30]}
                >
                    {
                        isMobile ?
                            layouts.xs && layouts.xs.map((box, index) => {
                                // console.log(box);
                                return (
                                    <div key={index} className={clsx(style.box, { [style.draggable]: isDraggable }, {[style.mobile] : isMobile})} >
                                        <DashboardCard index={indexes[index]} />
                                    </div>
                                );
                            }
                            )

                            :

                            layouts && layouts.lg.map((box, index) => {

                                // console.log(box);
                                return (
                                    <div key={index} className={clsx(style.box, { [style.draggable]: isDraggable })} >
                                        <DashboardCard index={indexes[index]} />
                                    </div>
                                );
                            }
                            )
                    }
                </ResponsiveReactGridLayout>
            </div>
        </div>
    );
}

export default DashboardContainer;