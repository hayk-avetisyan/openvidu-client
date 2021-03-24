import {IncomingMessage, ServerResponse} from "http";
import {routes} from "./routes";

export class Router {

    route(request: IncomingMessage, response: ServerResponse): void {
        let status = false;
        Router.prepareResponse(response);

        if (request.url && request.method) {

            let path = Object.getOwnPropertyNames(routes).find(url => request.url?.match(url) != null);
            if (path) {
                let controller = routes[path][request.method];
                if (controller) {
                    controller(request, response);
                    status = true;
                }
            }
        }

        if (!status) {
            response.statusCode = 404;
            response.end();
        }
    }


    static prepareResponse(response: ServerResponse): void {
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Content-Type", "application/json");
    }
}
