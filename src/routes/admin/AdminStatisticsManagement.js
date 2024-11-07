
import { Responsive, WidthProvider } from "react-grid-layout";
import DashboardContainer from "./DashboardContainer";


const ResponsiveReactGridLayout = WidthProvider(Responsive);

function AdminStatisticsManagement() {
    const indexes = [36, 37, 38, 39, 40, 41, 42];
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
                "w": 5,
                "h": 11,
                "x": 0,
                "y": 12,
                "i": "2",
                "moved": false,
                "static": false
            },
            {
                "w": 5,
                "h": 11,
                "x": 5,
                "y": 12,
                "i": "3",
                "moved": false,
                "static": false
            },
            {
                "w": 5,
                "h": 11,
                "x": 0,
                "y": 23,
                "i": "4",
                "moved": false,
                "static": false
            },
            {
                "w": 5,
                "h": 6,
                "x": 5,
                "y": 23,
                "i": "5",
                "moved": false,
                "static": false
            },
            {
                "w": 5,
                "h": 5,
                "x": 5,
                "y": 29,
                "i": "6",
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
                "w": 5,
                "h": 11,
                "x": 0,
                "y": 12,
                "i": "2",
                "moved": false,
                "static": false
            },
            {
                "w": 5,
                "h": 11,
                "x": 5,
                "y": 12,
                "i": "3",
                "moved": false,
                "static": false
            },
            {
                "w": 5,
                "h": 11,
                "x": 0,
                "y": 23,
                "i": "4",
                "moved": false,
                "static": false
            },
            {
                "w": 5,
                "h": 6,
                "x": 5,
                "y": 23,
                "i": "5",
                "moved": false,
                "static": false
            },
            {
                "w": 5,
                "h": 5,
                "x": 5,
                "y": 29,
                "i": "6",
                "moved": false,
                "static": false
            }
        ]
    }

    return (
        <DashboardContainer name={"AdminUserManagement"} indexes={indexes} defaultLayout={defaultLayout} />
    );
}

export default AdminStatisticsManagement;