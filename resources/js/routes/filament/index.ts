import exports from './exports'
import imports from './imports'
import control from './control'

const filament = {
    exports: Object.assign(exports, exports),
    imports: Object.assign(imports, imports),
    control: Object.assign(control, control),
}

export default filament