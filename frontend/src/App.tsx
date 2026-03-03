import { Route, Routes } from "react-router";
import { appPath } from "./common/enums";
import { CreateEventPage, EventDetailsPage, HomePage, LoginPage, MyEventsPage, RegisterPage } from "./pages";
import { NavigationTab } from "./common/components/navigation-tab/navigation-tab";
import { useEffect } from "react";
import { api } from "./api/axios";
import { ToastContainer } from "react-toastify";

function App() {

	useEffect(() => {
		const getUser = async () => {
			await api.get("/users/me");
		}

		getUser();
	}, []);

	return (
		<>
		    <ToastContainer/>
			<NavigationTab/>
			<Routes>
				<Route path={appPath.ROOT} element={<HomePage />} />
				<Route path={appPath.MY_EVENTS} element={<MyEventsPage />} />
				<Route path={appPath.EVENT_DETAILS} element={<EventDetailsPage />} />
				<Route path={appPath.CREATE_EVENT} element={<CreateEventPage />} />
				<Route path={appPath.REGISTER} element={<RegisterPage />} />
				<Route path={appPath.LOGIN} element={<LoginPage />} />
			</Routes>
		</>
	);
}

export default App;
