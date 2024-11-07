import DashboardContainer from "routes/admin/DashboardContainer";

function RegisteredProductLayout() {
    const indexes = [59];
    const defaultLayout =
    {
        "lg": [
          {
            "w": 11,
            "h": 28,
            "x": 0,
            "y": 0,
            "i": "0",
            "moved": false,
            "static": false
          }
        ]
      }

    return (
        <DashboardContainer name={"AdminProductRegistration"} indexes={indexes} defaultLayout={defaultLayout} />
    );
}

export default RegisteredProductLayout;