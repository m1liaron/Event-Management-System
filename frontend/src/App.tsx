import { Route, Routes } from "react-router";
import { appPath } from "./common/enums";
import { CreateEventPage, HomePage, MyEventsPage } from "./pages";
import { NavigationTab } from "./common/components/navigation-tab/navigation-tab";

function App() {
	return (
		<>
		<NavigationTab/>
		<Routes>
			<Route path={appPath.ROOT} element={<HomePage />} />
			<Route path={appPath.MY_EVENTS} element={<MyEventsPage />} />
			<Route path={appPath.CREATE_EVENT} element={<CreateEventPage />} />
		</Routes>
		</>
	);
}

export default App;
