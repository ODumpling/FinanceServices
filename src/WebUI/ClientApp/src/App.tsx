import React from "react";
import { Route } from "react-router-dom";
import AuthorizeRoute from "./components/auth/AuthorizeRoute";
import { ApplicationPaths } from "./components/auth/ApiAuthorizationConstants";
import ApiAuthorizationRoutes from "./components/auth/ApiAuthorizationRoutes";
import Layout from "./components/layouts/Layout";
import { Home } from "./pages/Home";

function App() {
  return (
    <Layout>
      <AuthorizeRoute exact path="/" component={Home} />
      <AuthorizeRoute path="/counter" component={Home} />
      <Route
        path={ApplicationPaths.ApiAuthorizationPrefix}
        component={ApiAuthorizationRoutes}
      />
    </Layout>
  );
}

export default App;
