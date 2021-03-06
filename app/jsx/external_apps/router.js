import React from 'react'
import ReactDOM from 'react-dom'
import page from 'page'
import Root from 'jsx/external_apps/components/Root'
import AppList from 'jsx/external_apps/components/AppList'
import AppDetails from 'jsx/external_apps/components/AppDetails'
import Configurations from 'jsx/external_apps/components/Configurations'
import AppCenterStore from 'jsx/external_apps/lib/AppCenterStore'
import regularizePathname from 'jsx/external_apps/lib/regularizePathname'

  const currentPath = window.location.pathname;
  const re = /(.*\/settings|.*\/details)/;
  const matches = re.exec(currentPath);
  const baseUrl = matches[0];

  let targetNodeToRenderIn = null;


  /**
   * Route Handlers
   */
  const renderAppList = (ctx) => {
    if (!window.ENV.APP_CENTER.enabled) {
      page.redirect('/configurations');
    } else {
      ReactDOM.render(
        <Root>
          <AppList pathname={ctx.pathname} />
        </Root>
      , targetNodeToRenderIn);
    }
  };

  const renderAppDetails = (ctx) => {
    ReactDOM.render(
      <Root>
        <AppDetails
          shortName={ctx.params.shortName}
          pathname={ctx.pathname}
          baseUrl={baseUrl}
          store={AppCenterStore}
        />
      </Root>
    , targetNodeToRenderIn);
  };

  const renderConfigurations = (ctx) => {
    ReactDOM.render(
      <Root>
        <Configurations
          pathname={ctx.pathname}
          env={window.ENV} />
      </Root>
    , targetNodeToRenderIn);
  }

  /**
   * Route Configuration
   */
  page.base(baseUrl);
  page('*', regularizePathname);
  page('/', renderAppList);
  page('/app/:shortName', renderAppDetails);
  page('/configurations', renderConfigurations);

export default {
    start (targetNode) {
      targetNodeToRenderIn = targetNode;
      page.start();
    },
    stop () {
      page.stop();
    },
    regularizePathname
  };
