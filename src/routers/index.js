import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import { hot } from 'react-hot-loader'
import Inital from 'containers/initial';
import Exercise from 'containers/exercise';
import Report from 'containers/report';
import Error from 'containers/error';

export const history = createHistory();

const Routers = () => (
  <Switch>
    <Route
      path="/error/:type/:retryUrl?"
      component={Error}
    />

    <Route
      path="/report/:mode/:exerciseId/:questionId?"
      component={Report}
    />

    <Route
      path="/init/:mode/:practiceId/:exerciseId/:operation?"
      component={Inital}
    />

    <Route
      path="/:mode/:practiceId/:exerciseId/:stepId/:operation?"
      component={Exercise}
    />

  </Switch>
);

const HotSwitch = hot(module)(Routers);

export const AppRouter = () => (
  <Router history={history}>
    <HotSwitch />
  </Router>
);
