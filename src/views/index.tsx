import React, { Suspense } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import Loading from '@cpsCommon/Loading';
import routes from '@router/routerConfig';
import Main from '@cps/layout/Main';

const Entry = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Switch>
        {/* <Route path='/login' component={Login} /> */}
        <Redirect exact from='/' to="/home" />
        <Main>
          {
            routes.map((route, i) => {
              return (
                <Route
                  key={i}
                  exact
                  path={route.path}
                  render={props => (
                    <route.component {...props} />
                  )}
                />
              );
            })
          }
        </Main>
      </Switch>
    </Suspense>
  );
}

export default Entry
