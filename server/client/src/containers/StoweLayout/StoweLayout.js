import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';

import {
  AppAside,
  AppBreadcrumb,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav,
} from '@coreui/react';
// sidebar nav config
import navigation from '../../_stoweNav';
// routes config
import routes from '../../stoweRoutes';

const StoweAside = React.lazy(() => import('./StoweAside'));
const StoweFooter = React.lazy(() => import('./StoweFooter'));
const StoweHeader = React.lazy(() => import('./StoweHeader'));

class StoweLayout extends Component {

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  signOut(e) {
    e.preventDefault()
    this.props.history.push('/login')
  }
  
  render() {
    console.log('routes:> ', routes);
    return (
      <div className="app">
        {/* <AppHeader fixed>
          <Suspense fallback={this.loading()}>
            <StoweHeader onLogout={e=>this.signOut(e)}/>
          </Suspense>
        </AppHeader> */}
        <div className="app-body">
          {/* <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            <Suspense>
            <AppSidebarNav navConfig={navigation} {...this.props} />
            </Suspense>
            <AppSidebarFooter />
            <AppSidebarMinimizer /> 
          </AppSidebar> */}
          <main className="main">
            {/* <AppBreadcrumb appRoutes={routes}/> */}
            <Container fluid>
              <Suspense fallback={this.loading()}>
                <Switch>
                  {routes.map((route, idx) => {
                    return route.component ? (
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={props => (
                          <route.component {...props} />
                        )} />
                    ) : (null);
                  })}
                  <Redirect from="/" to="/dashboard" />
                </Switch>
              </Suspense>
            </Container>
          </main>
          {/* <AppAside fixed>
            <Suspense fallback={this.loading()}>
              <StoweAside />
            </Suspense>
          </AppAside> */}
        </div>
        <AppFooter>
          <Suspense fallback={this.loading()}>
            <StoweFooter />
          </Suspense>
        </AppFooter>
      </div>
    );
  }
}

export default StoweLayout;
