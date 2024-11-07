import DashboardContainer from "routes/admin/DashboardContainer";

function ProductOptionLayout() {
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
    <DashboardContainer name={"ProductOption"} indexes={indexes} defaultLayout={defaultLayout} />
  );
}

export default ProductOptionLayout;