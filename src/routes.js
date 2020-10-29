import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useAuth } from './contexts/auth';

import Home from './pages/Home/Home';
import Team from './pages/Team/Team';
import Login from './pages/Authentication/Login';
import Register from './pages/Authentication/Register';
import Dashboard from './pages/Dashboard/Dashboard';
import NotFound from './pages/NotFound/NotFound';
import Loading from './pages/Loading/Loading';

function PrivateRoute({ path, component }) {
  const { loading, authenticated } = useAuth();

  if (loading) return <Loading />;

  if (!authenticated) return <Redirect to="/login" />;

  return <Route path={path} component={component} />;
}

function AuthRoute({ path, component }) {
  const { loading, authenticated } = useAuth();

  if (loading) return <Loading />;

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
      <Route component={NotFound} />
    </Switch>
  );
}
