import Auth from './Auth';
import DashboardController from './DashboardController';
import HomeController from './HomeController';
import PrdController from './PrdController';
import ProgressController from './ProgressController';
import Settings from './Settings';

const Controllers = {
    HomeController: Object.assign(HomeController, HomeController),
    PrdController: Object.assign(PrdController, PrdController),
    ProgressController: Object.assign(ProgressController, ProgressController),
    DashboardController: Object.assign(DashboardController, DashboardController),
    Settings: Object.assign(Settings, Settings),
    Auth: Object.assign(Auth, Auth),
};

export default Controllers;
