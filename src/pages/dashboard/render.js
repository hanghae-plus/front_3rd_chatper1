import {$, setTpl} from "../../utils/dom.js";
import {dashboardTpl} from "./templates.js";

const setDashboardOnDocument = () => {
    setTpl(dashboardTpl())($('#root'));
}

export default setDashboardOnDocument