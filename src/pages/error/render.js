import {$, setTpl} from "../../utils/dom.js";
import {errorTpl} from "./templates.js";
import {Logger} from "../../utils/logger.js";

const setErrorOnDocument = () => {
    const logger = new Logger()
    logger.log({
        type : 'error',
        location : 'errorPage',
        message : 'not find page error'
    })

    setTpl(errorTpl())($('#root'));
}

export default setErrorOnDocument