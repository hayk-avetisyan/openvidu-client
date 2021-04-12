import {IncomingMessage, ServerResponse} from "http";
import {readRequestBody, roleName, toJson} from "../utils";
import {Request} from "../openvidu/request";

export class ConnectionController {

    static create(request: IncomingMessage, response: ServerResponse): void {

        readRequestBody(request, async (data: any) => {
            new Request()
                .setPath("tokens")
                .setMethod("POST")
                .setDataProperty("role", roleName(data.role))
                .setDataProperty("session", data.roomId)
                .request().
            subscribe({
                next(connection) {
                    console.warn(connection.data.token);
                    connection.data.token = connection.data.token.replace("127.0.0.1", "localhost:8091");

                    response.write(toJson(connection.data));
                    response.end();
                },
                error(error) {
                    console.log("error");
                }
            });
        });
    }

    static options(request: IncomingMessage, response: ServerResponse): void {
        response.statusCode = 200;
        response.end();
    }
}
