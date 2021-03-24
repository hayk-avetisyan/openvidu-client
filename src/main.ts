import {createServer, Server} from "http";
import {OpenVidu} from "openvidu-node-client";
import {Router} from "./router/router";

let router = new Router();
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

let server: Server = createServer(((request, response) => {
    router.route(request, response);
}));

server.listen(9000);
