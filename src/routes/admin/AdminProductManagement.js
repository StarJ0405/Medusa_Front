import { useEffect, useState } from "react";
import style from "./AdminProductManagement.module.css";
import DashboardContainer from "./DashboardContainer";

function AdminProductManagement(props) {
    const indexes = [13, 14, 15, 16, 17, 18, 19, 20, 21, 22];
    const defaultLayout =
    {
        "lg": [
            {
                "w": 9,
                "h": 6,
                "x": 0,
                "y": 0,
                "i": "0",
                "moved": false,
                "static": false
            },
            {
                "w": 4,
                "h": 12,
                "x": 0,
                "y": 6,
                "i": "1",
                "moved": false,
                "static": false
            },
            {
                "w": 5,
                "h": 12,
                "x": 4,
                "y": 6,
                "i": "2",
                "moved": false,
                "static": false
            },
            {
                "w": 3,
                "h": 6,
                "x": 0,
                "y": 24,
                "i": "3",
                "moved": false,
                "static": false
            },
            {
                "w": 3,
                "h": 6,
                "x": 3,
                "y": 18,
                "i": "4",
                "moved": false,
                "static": false
            },
            {
                "w": 3,
                "h": 6,
                "x": 6,
                "y": 18,
                "i": "5",
                "moved": false,
                "static": false
            },
            {
                "w": 3,
                "h": 6,
                "x": 0,
                "y": 18,
                "i": "6",
                "moved": false,
                "static": false
            },
            {
                "w": 3,
                "h": 6,
                "x": 3,
                "y": 24,
                "i": "7",
                "moved": false,
                "static": false
            },
            {
                "w": 3,
                "h": 6,
                "x": 6,
                "y": 24,
                "i": "8",
                "moved": false,
                "static": false
            },
            {
                "w": 9,
                "h": 12,
                "x": 0,
                "y": 30,
                "i": "9",
                "moved": false,
                "static": false
            }
        ],
        "xs": [
            {
                "w": 4,
                "h": 6,
                "x": 0,
                "y": 0,
                "i": "0",
                "moved": false,
                "static": false
            },
            {
                "w": 4,
                "h": 12,
                "x": 0,
                "y": 6,
                "i": "1",
                "moved": false,
                "static": false
            },
            {
                "w": 4,
                "h": 12,
                "x": 0,
                "y": 18,
                "i": "2",
                "moved": false,
                "static": false
            },
            {
                "w": 4,
                "h": 6,
                "x": 0,
                "y": 48,
                "i": "3",
                "moved": false,
                "static": false
            },
            {
                "w": 4,
                "h": 6,
                "x": 0,
                "y": 36,
                "i": "4",
                "moved": false,
                "static": false
            },
            {
                "w": 4,
                "h": 6,
                "x": 0,
                "y": 42,
                "i": "5",
                "moved": false,
                "static": false
            },
            {
                "w": 4,
                "h": 6,
                "x": 0,
                "y": 30,
                "i": "6",
                "moved": false,
                "static": false
            },
            {
                "w": 4,
                "h": 6,
                "x": 0,
                "y": 54,
                "i": "7",
                "moved": false,
                "static": false
            },
            {
                "w": 4,
                "h": 6,
                "x": 0,
                "y": 60,
                "i": "8",
                "moved": false,
                "static": false
            },
            {
                "w": 4,
                "h": 6,
                "x": 0,
                "y": 66,
                "i": "9",
                "moved": false,
                "static": false
            }
        ]
    }

    return (
        <DashboardContainer name={"AdminProductManagement"} indexes={indexes} defaultLayout={defaultLayout} />
    );


}

export default AdminProductManagement;