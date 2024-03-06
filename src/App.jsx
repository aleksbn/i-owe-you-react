import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import GlobalStyles from "./styles/GlobalStyles";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login";
import Statistics from "./pages/Statistics";
import Account from "./pages/Account";
import PersonsList from "./pages/PersonsList";
import Person from "./pages/Person";
import OwingsList from "./pages/OwingsList";
import Owing from "./pages/Owing";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 0,
		},
	},
});

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<ReactQueryDevtools initialIsOpen={false} />
			<GlobalStyles />
			<BrowserRouter>
				<Routes>
					<Route element={<AppLayout />}>
						<Route index element={<Navigate replace to="owings" />} />
						<Route path="statistics" element={<Statistics />} />
						<Route path="account" element={<Account />} />
						<Route path="people" element={<PersonsList />} />
						<Route path="people/:personId" element={<Person />} />
						<Route path="owings" element={<OwingsList />} />
						<Route path="owings/:owingId" element={<Owing />} />
					</Route>
					<Route path="login" element={<Login />} />
					<Route path="*" element={<PageNotFound />} />
				</Routes>
			</BrowserRouter>
		</QueryClientProvider>
	);
}

export default App;
