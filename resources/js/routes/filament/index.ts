import control from './control';
import exports from './exports';
import imports from './imports';

const filament = {
    exports: Object.assign(exports, exports),
    imports: Object.assign(imports, imports),
    control: Object.assign(control, control),
};

export default filament;
