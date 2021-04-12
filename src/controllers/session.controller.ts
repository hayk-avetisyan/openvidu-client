import {IncomingMessage, ServerResponse} from "http";
import {Request} from "../openvidu/request";
import {readRequestBody, toJson} from "../utils";

export class SessionController {

    static async create(request: IncomingMessage, response: ServerResponse): Promise<void> {

        readRequestBody(request, (roomId: any) => {

            new Request()
                .setPath("sessions")
                .setMethod("POST")
                .setDataProperty("customSessionId", roomId)
                .request().
            subscribe({
                next(session) {
                    response.write(toJson("sessionId", session.data.id));
                    response.end();
                },
                error(error) {
                    if(error?.response?.status === 409) {
                        response.write(toJson("sessionId", roomId));
                        response.end();
                    }
                    else {
                        console.log("error");
                    }
                }
            });

        });
    }
}
