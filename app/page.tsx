import getCurrentUser from "./actions/getCurrentUser";
import Dashboard from "./components/Pages/Dashboard/Dashboard";
import Landing from "./components/Pages/Landing/Landing";

export default async function Home() {
	const currentUser = await getCurrentUser();

	return <div className="">{currentUser ? <Dashboard /> : <Landing />}</div>;
}
