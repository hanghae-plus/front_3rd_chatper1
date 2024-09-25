import {$, setTpl} from "../../utils/dom.js";
import {logTpl} from "./templates.js";

const setLogOnDocument = () => {
    setTpl(logTpl())($('#root'));
}

export default setLogOnDocument