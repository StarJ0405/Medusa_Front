import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { HistoryReducer } from 'shared/redux/reducers/history/HistoryReducer';
function useOnLocationChange() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [force, setForce] = useState(false);
  const { prevUrl, currentUrl } = useSelector((state) => ({
    prevUrl: state.history.prevUrl, currentUrl: state.history.currentUrl,
  }));

  useEffect(() => {




  }, []);



  useEffect(() => {
    // window.history.pushState({ force: true }, null, location.pathname);
    // window.onpopstate = function (e) {
    //   if (e.state && e.state.force){
    //     navigate(prevUrl);
    //   }
      // window.history.go(1);
    // };

    // dispatch(HistoryReducer.actions.setHistory(location.pathname));

    // window.addEventListener("popstate", handleChange);
    // if (pathname.startsWith("/category")) {
    // } else {

    // }

  }, [location]);

  useEffect(() => {

  }, [prevUrl]);


}

export default useOnLocationChange;