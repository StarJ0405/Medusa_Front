import { Route, Routes } from "react-router-dom";
import FrontLayout from "routes/front/FrontLayout";
import CreatePartnersLink from "routes/partners/CreatePartnersLink";
import PartnersHome from "routes/partners/front/PartnersHome";
import MyPartnersAccount from "routes/partners/MyPartnersAccount";
import MyPartnersTotal from "routes/partners/MyPartnersTotal";
import PartnersHistory from "routes/partners/PartnersHistory";
import PartnersLayout from "routes/partners/PartnersLayout";


function PartnersRouter() {
    return (
        <Routes>
            <Route path="/" element={<PartnersLayout />}>
                <Route path="createPartnersLink" element={<CreatePartnersLink />} />
                <Route path="partnersLinkHistory" element={<PartnersHistory />} />
                <Route path="myPartnersAccount" element={<MyPartnersAccount />} />
                <Route path="myPartnersTotal" element={<MyPartnersTotal />} />
            </Route>
        </Routes>
    )
}

export default PartnersRouter;