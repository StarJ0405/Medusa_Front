import DashboardContainer from "routes/admin/DashboardContainer";

function ReservationRegistrationManualLayout() {
    const indexes = [54];
    const defaultLayout =
    {
        "lg": [
          {
            "w": 10,
            "h": 12,
            "x": 0,
            "y": 0,
            "i": "0",
            "moved": false,
            "static": false
          }
        ]
      }

    return (
        <DashboardContainer name={"ReservationRegistrationManual"} indexes={indexes} defaultLayout={defaultLayout} />
    );
}

export default ReservationRegistrationManualLayout;