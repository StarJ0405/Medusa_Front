import DashboardContainer from "./DashboardContainer";
import { Responsive, WidthProvider } from "react-grid-layout";


const ResponsiveReactGridLayout = WidthProvider(Responsive);

function AdminPromotionManagement() {
    const indexes = [32, 34, 35];
    const defaultLayout =
    {
        "lg": [
            {
                "w": 10,
                "h": 13,
                "x": 0,
                "y": 0,
                "i": "0",
                "moved": false,
                "static": false
            },
            {
                "w": 10,
                "h": 6,
                "x": 0,
                "y": 20,
                "i": "1",
                "moved": false,
                "static": false
            },
            {
                "w": 10,
                "h": 7,
                "x": 0,
                "y": 13,
                "i": "2",
                "moved": false,
                "static": false
            }
        ],
        "xs": [
            {
                "w": 10,
                "h": 13,
                "x": 0,
                "y": 0,
                "i": "0",
                "moved": false,
                "static": false
            },
            {
                "w": 10,
                "h": 6,
                "x": 0,
                "y": 20,
                "i": "1",
                "moved": false,
                "static": false
            },
            {
                "w": 10,
                "h": 7,
                "x": 0,
                "y": 13,
                "i": "2",
                "moved": false,
                "static": false
            }
        ]
    }

    return (
        <DashboardContainer name={"AdminArticleManagement"} indexes={indexes} defaultLayout={defaultLayout} />
    );
}

export default AdminPromotionManagement;