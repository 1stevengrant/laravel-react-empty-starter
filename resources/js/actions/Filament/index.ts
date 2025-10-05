import Actions from './Actions';
import Http from './Http';
import Pages from './Pages';

const Filament = {
    Actions: Object.assign(Actions, Actions),
    Pages: Object.assign(Pages, Pages),
    Http: Object.assign(Http, Http),
};

export default Filament;
