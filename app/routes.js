import Application from './containers/Application';
import Analytics from './containers/Analytics';
import Expenses from './containers/Expenses';
import Users from './containers/Users';
import Categories from './containers/Categories';


export default {
  path: '/',
  component: Application,
  indexRoute: { component: Analytics },
  childRoutes: [{
    path: '/expenses',
    component: Expenses
  }, {
    path: '/users',
    component: Users
  }, {
    path: '/categories',
    component: Categories
  }]
};
