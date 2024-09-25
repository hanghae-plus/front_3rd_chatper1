import Router from "../utils/router.js";
import {Store} from "../utils/store.js";
import {addGlobalErrorHandler} from "../events/addGlobalErrorHandler.js";

const App = () => {
    new Router()
    new Store()
    addGlobalErrorHandler()
}

export default App