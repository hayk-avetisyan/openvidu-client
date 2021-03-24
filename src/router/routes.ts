import {SessionController} from "../controllers/session.controller";
import {ConnectionController} from "../controllers/connection.controller";

export const routes: any = {
    "/session/create": {
        "POST": SessionController.create,
    },
    "/connection/create": {
        "POST": ConnectionController.create,
    }
};
