import DashboardContainer from "routes/admin/DashboardContainer";

function StockManagementLayout() {
    const indexes = [53];
    const defaultLayout =
    {
        "lg": [
          {
            "w": 10,
            "h": 27,
            "x": 0,
            "y": 0,
            "i": "0",
            "moved": false,
            "static": false
          }
        ]
      }

    return (
        <DashboardContainer name={"StockManagement"} indexes={indexes} defaultLayout={defaultLayout} />
    );
}

export default StockManagementLayout;