import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import Main from '../pages/Main';
import Dashboard from '../pages/Dashboard';
import Group from '../pages/Group';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Main} />
    <Route path="/dashboard" exact component={Dashboard} isPrivate />
    <Route path="/group-chat" exact component={Group} isPrivate />
    <Route
      path="/group-chat/:category/:doc"
      exact
      component={Group}
      isPrivate
    />
    <Route path="/individual-chat" exact component={Main} />
  </Switch>
);

export default Routes;
