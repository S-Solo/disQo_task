import React, { Suspense, lazy } from "react";
import Layout from "components/Layout";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const Notepad = lazy(() => import("./containers/Notepad"));

const App = () => {
  return (
    <Layout>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route exact path="/" component={Notepad} />
            <Route path="/test" render={() => <div>Test Route</div>} />
          </Switch>
        </Suspense>
      </Router>
    </Layout>
  );
};

export default App;
