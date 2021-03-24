import {IncomingMessage, ServerResponse} from "http";
import {readRequestBody, roleName, toJson} from "../utils";
import {Request} from "../openvidu/request";

export class ConnectionController {

    static create(request: IncomingMessage, response: ServerResponse): void {

        readRequestBody(request, (data: any) => {
            new Request()
                .setPath(`sessions/${ data.roomId }/connection`)
                .setMethod("POST")
                .setDataProperty("role", roleName(data.role))
                .request().
            subscribe({
                next(connection) {
                    response.write(toJson(connection.data));
                    response.end();
                },
                error(error) {
                    console.log("error");
                }
            });
        });
    }
}
