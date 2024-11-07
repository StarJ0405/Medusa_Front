import DashboardContainer from "routes/admin/DashboardContainer";
import style from "./CourierInterlockingLayout.module.css";

function CourierInterlockingLayout() {
    const indexes = [44];
    const defaultLayout =
    {
        "lg": [
          {
            "w": 10,
            "h": 25,
            "x": 0,
            "y": 0,
            "i": "0",
            "moved": false,
            "static": false
          }
        ]
      }

    return (
        <DashboardContainer name={"CourierInterlocking"} indexes={indexes} defaultLayout={defaultLayout} />
    );
}

export default CourierInterlockingLayout;