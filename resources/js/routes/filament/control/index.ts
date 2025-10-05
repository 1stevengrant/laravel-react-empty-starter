import auth from './auth'
import pages from './pages'

const control = {
    auth: Object.assign(auth, auth),
    pages: Object.assign(pages, pages),
}

export default control