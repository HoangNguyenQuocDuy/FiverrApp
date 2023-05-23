import { useEffect } from "react";
import {
  useLocation,
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { Fragment } from "react";
import routes from "./routers";
import DefaultLayout from "./layouts/DefaultLayout";
import "./App.css";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

const Wrapper = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);

  return children;
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Wrapper>
          <Routes>
            {routes.map((route, idx) => {
              const Page = route.component;
              let Layout = DefaultLayout;
              if (route.layout) Layout = route.layout;
              else if (route.layout === null) Layout = Fragment;
              return (
                <Route
                  key={idx}
                  path={route.path}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
              );
            })}
          </Routes>
        </Wrapper>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
