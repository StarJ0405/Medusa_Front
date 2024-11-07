import style from "./AdminUserManagement.module.css";
import { Responsive, WidthProvider } from "react-grid-layout";
import DashboardContainer from "./DashboardContainer";


const ResponsiveReactGridLayout = WidthProvider(Responsive);

function AdminUserManagement() {
  const indexes = [23, 24, 25, 26];
  const defaultLayout =
  {
    "lg": [
      {
        "w": 5,
        "h": 16,
        "x": 0,
        "y": 0,
        "i": "0",
        "moved": false,
        "static": false
      },
      {
        "w": 5,
        "h": 16,
        "x": 5,
        "y": 0,
        "i": "1",
        "moved": false,
        "static": false
      },
      {
        "w": 5,
        "h": 6,
        "x": 0,
        "y": 16,
        "i": "2",
        "moved": false,
        "static": false
      },
      {
        "w": 5,
        "h": 6,
        "x": 5,
        "y": 16,
        "i": "3",
        "moved": false,
        "static": false
      }
    ],
    "xs": [
      {
        "w": 5,
        "h": 16,
        "x": 0,
        "y": 0,
        "i": "0",
        "moved": false,
        "static": false
      },
      {
        "w": 5,
        "h": 16,
        "x": 5,
        "y": 0,
        "i": "1",
        "moved": false,
        "static": false
      },
      {
        "w": 5,
        "h": 6,
        "x": 0,
        "y": 16,
        "i": "2",
        "moved": false,
        "static": false
      },
      {
        "w": 5,
        "h": 6,
        "x": 5,
        "y": 16,
        "i": "3",
        "moved": false,
        "static": false
      }
    ]
  }

  return (
    <DashboardContainer name={"AdminUserManagement"} indexes={indexes} defaultLayout={defaultLayout} />
  );
}

export default AdminUserManagement;