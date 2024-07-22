// Global styles file
import GlobalStyles from "./styles/GlobalStyles";
// Imported libraries
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
// Context providers
import { UserDataProvider } from "./context/UserDataProvider";
import { DarkModeProvider } from "./context/DarkModeProvider";
// Toaster
import { Toaster } from "react-hot-toast";
// Custom routes and components
import AppLayout from "./ui/layout/AppLayout";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Account from "./pages/Account";
import PersonsList from "./pages/PersonsList";
import Person from "./pages/Person";
import OwingsList from "./pages/OwingsList";
import Owing from "./pages/Owing";
import ProtectedRoute from "./ui/component/ProtectedRoute";
import Register from "./pages/Register";
import Welcome from "./pages/Welcome";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

/**
 * Renders the main App component with nested providers, routes, and components.
 *
 * @return {JSX.Element} The rendered main App component.
 */
function App() {
  return (
    <UserDataProvider>
      <DarkModeProvider>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <GlobalStyles />
          <BrowserRouter>
            <Routes>
              <Route
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate replace to="welcome" />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="account" element={<Account />} />
                <Route path="people" element={<PersonsList />} />
                <Route path="people/:personId" element={<Person />} />
                <Route path="owings" element={<OwingsList />} />
                <Route path="owings/:owingId" element={<Owing />} />
                <Route path="welcome" element={<Welcome />} />
              </Route>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </BrowserRouter>
          <Toaster
            position="top-center"
            gutter={12}
            containerStyle={{ margin: "8px" }}
            toastOptions={{
              success: {
                duration: 3000,
              },
              error: {
                duration: 5000,
              },
              style: {
                fontSize: "16px",
                maxWidth: "500px",
                padding: "16px 24px",
                backgroundColor: "var(--color-grey-0)",
                color: "var(--color-grey-700)",
              },
            }}
          />
        </QueryClientProvider>
      </DarkModeProvider>
    </UserDataProvider>
  );
}

export default App;
