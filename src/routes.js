import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useAuth } from './contexts/auth';

import Home from './pages/Home';
import Team from './pages/Team';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

function PrivateRoute({ path, component }) {
  const { loading, authenticated } = useAuth();

  if (loading) return <h1>Loading...</h1>;

  if (!authenticated) return <Redirect to="/login" />;

  return <Route path={path} component={component} />;
}

function AuthRoute({ path, component }) {
  const { loading, authenticated } = useAuth();

  if (loading) return <h1>Loading...</h1>;

  if (authenticated) return <Redirect to="/dashboard" />;

  return <Route path={path} component={component} />;
}

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/team" component={Team} />
      <AuthRoute path="/register" component={Register} />
      <AuthRoute path="/login" component={Login} />
      <PrivateRoute path="/dashboard" component={Dashboard} />
    </Switch>
  );
}
