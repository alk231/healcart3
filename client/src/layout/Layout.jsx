import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import CommonLayout from "./CommonLayout";

const Layout = () => {
	return (
		<CommonLayout>
			{/* Outlet is used to render nested routes */}
			<Outlet />
			{/* Footer is used to display the page footer */}
			<Footer />
		</CommonLayout>
	);
};

export default Layout;