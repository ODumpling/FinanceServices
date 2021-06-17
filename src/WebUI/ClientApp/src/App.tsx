import React from "react";
import { Route } from "react-router-dom";
import AuthorizeRoute from "./components/auth/AuthorizeRoute";
import { ApplicationPaths } from "./components/auth/ApiAuthorizationConstants";
import ApiAuthorizationRoutes from "./components/auth/ApiAuthorizationRoutes";
import Layout from "./components/layouts/Layout";
import { Home } from "./pages/Home";
import { Fund } from "./pages/Fund";

function App() {
  return (
    <Layout>
      <AuthorizeRoute exact path="/" component={Home} />
      <AuthorizeRoute path="/funds/:id" component={Fund} />
      <Route
        path={ApplicationPaths.ApiAuthorizationPrefix}
        component={ApiAuthorizationRoutes}
      />
    </Layout>
  );
}

export default App;
