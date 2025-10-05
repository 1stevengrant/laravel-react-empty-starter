import Auth from './Auth';
import DashboardController from './DashboardController';
import HomeController from './HomeController';
import Settings from './Settings';

const Controllers = {
    HomeController: Object.assign(HomeController, HomeController),
    DashboardController: Object.assign(DashboardController, DashboardController),
    Settings: Object.assign(Settings, Settings),
    Auth: Object.assign(Auth, Auth),
};

export default Controllers;
