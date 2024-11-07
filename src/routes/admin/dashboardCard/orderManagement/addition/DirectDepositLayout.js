import DashboardContainer from "routes/admin/DashboardContainer";
import style from "./DirectDepositLayout.module.css";

function DirectDepositLayout() {
  const indexes = [59];
  const defaultLayout =
  {
    "lg": [
      {
        "w": 10,
        "h": 35,
        "x": 0,
        "y": 0,
        "i": "0",
        "moved": false,
        "static": false
      }
    ]
  }

  return (
    <DashboardContainer name={"DirectDeposit"} indexes={indexes} defaultLayout={defaultLayout} />
  );
}

export default DirectDepositLayout;