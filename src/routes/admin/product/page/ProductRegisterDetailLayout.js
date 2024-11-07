import PaddingWrapper from "layouts/wrapper/PaddingWrapper";
import DashboardContainer from "routes/admin/DashboardContainer";
import ProductDetailRegister from "./ProductDetailRegister";
import ProductRegisterDetail from "./ProductRegisterDetail";

function ProductRegisterDetailLayout() {
  return (
    <PaddingWrapper padding={10}>
      <ProductRegisterDetail />
    </PaddingWrapper>
  );

  // const indexes = [48, 57, 58];
  // const defaultLayout =
  // {
  //     "lg": [
  //       {
  //         "w": 11,
  //         "h": 25,
  //         "x": 0,
  //         "y": 0,
  //         "i": "0",
  //         "moved": false,
  //         "static": false
  //       },
  //       {
  //         "w": 11,
  //         "h": 13,
  //         "x": 0,
  //         "y": 25,
  //         "i": "1",
  //         "moved": false,
  //         "static": false
  //       },
  //       {
  //         "w": 11,
  //         "h": 32,
  //         "x": 0,
  //         "y": 38,
  //         "i": "2",
  //         "moved": false,
  //         "static": false
  //       }
  //     ]
  //   }

  // return (
  //     <DashboardContainer name={"ProductRegisterDetail"} indexes={indexes} defaultLayout={defaultLayout} />
  // );
}

export default ProductRegisterDetailLayout;