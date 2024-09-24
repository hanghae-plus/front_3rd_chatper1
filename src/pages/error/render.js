import {$, setTpl} from "../../utils/dom.js";
import {errorTpl} from "./templates.js";

const setErrorOnDocument = () => {
    setTpl(errorTpl())($('#root'));
}

export default setErrorOnDocument