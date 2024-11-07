import DashboardContainer from "routes/admin/DashboardContainer";


function ProductStatusDetailLayout() {
    const indexes = [59];
    const defaultLayout =
    {
        "lg": [
            {
                "w": 10,
                "h": 29,
                "x": 0,
                "y": 0,
                "i": "0",
                "moved": false,
                "static": false
            }
        ]
    }

    return (
        <DashboardContainer name={"ProductStatusDetail"} indexes={indexes} defaultLayout={defaultLayout} />
    );
}


export default ProductStatusDetailLayout;