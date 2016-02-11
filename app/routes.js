import Application from './containers/Application';
import Analytics from './containers/Analytics';


export default {
  path: '/app/',
  component: Application,
  indexRoute: { component: Analytics },
  childRoutes: []
};
