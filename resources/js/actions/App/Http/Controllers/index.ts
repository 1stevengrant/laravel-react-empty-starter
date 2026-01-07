import HomeController from './HomeController'
import PrdStatusController from './PrdStatusController'
import ProgressController from './ProgressController'
import DashboardController from './DashboardController'
import Settings from './Settings'
import Auth from './Auth'

const Controllers = {
    HomeController: Object.assign(HomeController, HomeController),
    PrdStatusController: Object.assign(PrdStatusController, PrdStatusController),
    ProgressController: Object.assign(ProgressController, ProgressController),
    DashboardController: Object.assign(DashboardController, DashboardController),
    Settings: Object.assign(Settings, Settings),
    Auth: Object.assign(Auth, Auth),
}

export default Controllers