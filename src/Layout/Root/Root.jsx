import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../../Shared/Navbar/Navbar";
import Footer from "../../Shared/Footer/Footer";

const Root = () => {
    const location = useLocation();
    console.log(location);

    const noHeaderFooter = location.pathname.includes('login');

    return (
        <div>
            {noHeaderFooter || <Navbar></Navbar>}
            <Outlet></Outlet>
            {noHeaderFooter || <Footer></Footer>}
        </div>
    );
};

export default Root;