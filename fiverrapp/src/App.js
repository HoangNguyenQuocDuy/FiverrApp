import { useContext, useEffect } from "react";
import { useLocation, BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Fragment } from "react";
import { publicRoutes, privateRoutes } from "./routers";
import DefaultLayout from "./layouts/DefaultLayout";
import "./App.css";
import { AppContext } from "./context/AppProvider";

const Wrapper = ({ children }) => {
  const location = useLocation()

  useEffect(() => {
    document.documentElement.scrollTo(0, 0)
  }, [location.pathname])

  return children
}

function App() {
  const { currentUser } = useContext(AppContext);

  return (
    <Router>
      <Wrapper>
        <Routes>
          {publicRoutes.map((route, idx) => {
            const Page = route.component;
            let Layout = DefaultLayout;
            if (route.layout) Layout = route.Layout;
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
          {currentUser &&
            privateRoutes.map((route, idx) => {
              const Page = route.component;
              let Layout = DefaultLayout;
              if (route.layout) Layout = route.Layout;
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
  );

  // return (
  //   <Router>
  //       <Routes>
  //         {publicRoutes.map((publicRoute, idx) => {
  //           const Page = publicRoute.component
  //           var Layout = DefaultLayout

  //           if (publicRoute.layout) {
  //             Layout = publicRoute.layout
  //           } else if(publicRoute.layout === null) {
  //             Layout = Fragment
  //           }
  //           return (
  //             <Route key={idx} path={publicRoute.path}
  //               element={
  //                 <Layout>
  //                   <Page />
  //                 </Layout>
  //             }/>
  //             )
  //         })}
  //       </Routes>
  //   </Router>
  // );
}

export default App;
