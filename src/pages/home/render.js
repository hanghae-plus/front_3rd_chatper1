import {$, setTpl} from "../../utils/dom.js";
import {homeTpl} from "./templates.js";

const setHomeOnDocument = () => {
    setTpl(homeTpl())($('#root'));
}

export default setHomeOnDocument