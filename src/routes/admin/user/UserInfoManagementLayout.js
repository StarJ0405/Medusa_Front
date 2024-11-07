import DashboardContainer from "../DashboardContainer";

function UserInfoManagementLayout() {
    const indexes = [43];
    const defaultLayout =
    {
        "lg": [
            {
                "w": 10,
                "h": 24,
                "x": 0,
                "y": 0,
                "i": "0",
                "moved": false,
                "static": false
            }
        ]
    }

    return (
        <DashboardContainer name={"UserInfoManagement"} indexes={indexes} defaultLayout={defaultLayout} />
    );
}

export default UserInfoManagementLayout;