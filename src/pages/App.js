import Router from "../utils/router.js";
import {Store} from "../utils/store.js";
import {addGlobalErrorHandler} from "../events/addGlobalErrorHandler.js";

const App = () => {
    addGlobalErrorHandler()
    new Router()
    new Store()
}

export default App