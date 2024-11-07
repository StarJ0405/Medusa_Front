import style from "./AdminArticleManagement.module.css";
import { Responsive, WidthProvider } from "react-grid-layout";
import DashboardContainer from "./DashboardContainer";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

function AdminArticleManagement() {
    const indexes = [27, 28, 29, 30, 31];
    const defaultLayout =
    {
        "lg": [
            {
                "w": 5,
                "h": 12,
                "x": 0,
                "y": 0,
                "i": "0",
                "moved": false,
                "static": false
            },
            {
                "w": 5,
                "h": 12,
                "x": 5,
                "y": 0,
                "i": "1",
                "moved": false,
                "static": false
            },
            {
                "w": 10,
                "h": 10,
                "x": 0,
                "y": 12,
                "i": "2",
                "moved": false,
                "static": false
            },
            {
                "w": 5,
                "h": 5,
                "x": 0,
                "y": 22,
                "i": "3",
                "moved": false,
                "static": false
            },
            {
                "w": 5,
                "h": 5,
                "x": 5,
                "y": 22,
                "i": "4",
                "moved": false,
                "static": false
            }
        ],
        "xs": [
            {
                "w": 5,
                "h": 12,
                "x": 0,
                "y": 0,
                "i": "0",
                "moved": false,
                "static": false
            },
            {
                "w": 5,
                "h": 12,
                "x": 5,
                "y": 0,
                "i": "1",
                "moved": false,
                "static": false
            },
            {
                "w": 10,
                "h": 10,
                "x": 0,
                "y": 12,
                "i": "2",
                "moved": false,
                "static": false
            },
            {
                "w": 5,
                "h": 5,
                "x": 0,
                "y": 22,
                "i": "3",
                "moved": false,
                "static": false
            },
            {
                "w": 5,
                "h": 5,
                "x": 5,
                "y": 22,
                "i": "4",
                "moved": false,
                "static": false
            }
        ]
    }

    return (
        <DashboardContainer name={"AdminArticleManagement"} indexes={indexes} defaultLayout={defaultLayout} />
    );
}

export default AdminArticleManagement;