import DashboardContainer from "../DashboardContainer";

function UserActivityManagementLayout() {
    const indexes = [43];
    const defaultLayout =
    {
        "lg": [
          {
            "w": 10,
            "h": 26,
            "x": 0,
            "y": 0,
            "i": "0",
            "moved": false,
            "static": false
          }
        ]
      }

    return (
        <DashboardContainer name={"UserActivityManagement"} indexes={indexes} defaultLayout={defaultLayout} />
    );
}

export default UserActivityManagementLayout;