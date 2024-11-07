import DashboardContainer from "routes/admin/DashboardContainer";


function ProductOptionDetailLayout() {
    const indexes = [52];
    const defaultLayout =
    {
        "lg": [
            {
                "w": 10,
                "h": 5,
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

export default ProductOptionDetailLayout;