import DashboardContainer from "./DashboardContainer";

function AdminDashboard(props) {
    const indexes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    // const indexes = [0];
    const defaultLayout = {
        "lg": [
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
                "h": 6,
                "x": 4,
                "y": 0,
                "i": "1",
                "moved": false,
                "static": false
            },
            {
                "w": 2,
                "h": 6,
                "x": 8,
                "y": 0,
                "i": "2",
                "moved": false,
                "static": false
            },
            {
                "w": 3,
                "h": 6,
                "x": 0,
                "y": 6,
                "i": "3",
                "moved": false,
                "static": false
            },
            {
                "w": 4,
                "h": 6,
                "x": 3,
                "y": 6,
                "i": "4",
                "moved": false,
                "static": false
            },
            {
                "w": 3,
                "h": 6,
                "x": 7,
                "y": 6,
                "i": "5",
                "moved": false,
                "static": false
            },
            {
                "w": 10,
                "h": 18,
                "x": 0,
                "y": 12,
                "i": "6",
                "moved": false,
                "static": false
            },
            {
                "w": 4,
                "h": 6,
                "x": 0,
                "y": 30,
                "i": "7",
                "moved": false,
                "static": false
            },
            {
                "w": 4,
                "h": 6,
                "x": 4,
                "y": 30,
                "i": "8",
                "moved": false,
                "static": false
            },
            {
                "w": 2,
                "h": 6,
                "x": 8,
                "y": 30,
                "i": "9",
                "moved": false,
                "static": false
            },
            {
                "w": 10,
                "h": 6,
                "x": 0,
                "y": 36,
                "i": "10",
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
                "h": 6,
                "x": 0,
                "y": 6,
                "i": "1",
                "moved": false,
                "static": false
            },
            {
                "w": 4,
                "h": 6,
                "x": 0,
                "y": 12,
                "i": "2",
                "moved": false,
                "static": false
            },
            {
                "w": 4,
                "h": 6,
                "x": 0,
                "y": 18,
                "i": "3",
                "moved": false,
                "static": false
            },
            {
                "w": 4,
                "h": 6,
                "x": 0,
                "y": 24,
                "i": "4",
                "moved": false,
                "static": false
            },
            {
                "w": 4,
                "h": 6,
                "x": 0,
                "y": 30,
                "i": "5",
                "moved": false,
                "static": false
            },
            {
                "w": 4,
                "h": 18,
                "x": 0,
                "y": 36,
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
            },
            {
                "w": 4,
                "h": 6,
                "x": 0,
                "y": 72,
                "i": "10",
                "moved": false,
                "static": false
            }
        ]
    }
    return (
        <DashboardContainer name={"AdminDashboard"} indexes={indexes} defaultLayout={defaultLayout} />
    );
}

export default AdminDashboard;