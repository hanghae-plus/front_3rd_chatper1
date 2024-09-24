import {$, setTpl} from "../../utils/dom.js";
import {profileTpl} from "./templates.js";
import {addUserInfoFormEvent} from "./event.js";

const setProfileOnDocument = () => {
    setTpl(profileTpl())($('#root'));
    addUserInfoFormEvent()
}

export default setProfileOnDocument