import style from "./AdminOrderManagement.module.css";
import _ from "lodash";
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import { useState, useEffect } from "react";
import DashboardCard from "./dashboardCard/DashboardCard";
import Center from "layouts/wrapper/Center";
import CustomButton from "components/buttons/CustomButton";
import { requester } from "App";
import DashboardContainer from "./DashboardContainer";

function AdminOrderManagement(props) {
  const indexes = [0, 1, 6, 11, 12];
  const defaultLayout =
  {
    "lg": [
      {
        "w": 5,
        "h": 6,
        "x": 0,
        "y": 0,
        "i": "0",
        "moved": false,
        "static": false
      },
      {
        "w": 5,
        "h": 6,
        "x": 5,
        "y": 0,
        "i": "1",
        "moved": false,
        "static": false
      },
      {
        "w": 10,
        "h": 19,
        "x": 0,
        "y": 6,
        "i": "2",
        "moved": false,
        "static": false
      },
      {
        "w": 5,
        "h": 6,
        "x": 0,
        "y": 25,
        "i": "3",
        "moved": false,
        "static": false
      },
      {
        "w": 5,
        "h": 6,
        "x": 5,
        "y": 25,
        "i": "4",
        "moved": false,
        "static": false
      }
    ],
    "xs": [
      {
        "w": 3,
        "h": 6,
        "x": 0,
        "y": 0,
        "i": "0",
        "moved": false,
        "static": false
      },
      {
        "w": 3,
        "h": 6,
        "x": 0,
        "y": 6,
        "i": "1",
        "moved": false,
        "static": false
      },
      {
        "w": 3,
        "h": 19,
        "x": 0,
        "y": 12,
        "i": "2",
        "moved": false,
        "static": false
      },
      {
        "w": 3,
        "h": 6,
        "x": 0,
        "y": 31,
        "i": "3",
        "moved": false,
        "static": false
      },
      {
        "w": 3,
        "h": 6,
        "x": 0,
        "y": 37,
        "i": "4",
        "moved": false,
        "static": false
      }
    ]
  }

  return (
    <DashboardContainer name={"AdminOrderManagement"} indexes={indexes} defaultLayout={defaultLayout} />
  );
}

export default AdminOrderManagement;