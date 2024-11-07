
import FlexChild from "layouts/flex/FlexChild";
import { Responsive, WidthProvider } from "react-grid-layout";
import DashboardContainer from "routes/admin/DashboardContainer";
import ExhibitionProgress from "./ExhibitionProgress";


const ResponsiveReactGridLayout = WidthProvider(Responsive);

function AminExhibitionManagement() {
    
    return (
      <FlexChild>
        <ExhibitionProgress />
      </FlexChild>
        
    );
}

export default AminExhibitionManagement;