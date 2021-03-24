import {IncomingMessage, ServerResponse} from "http";
import {Request} from "../openvidu/request";
import {readRequestBody, toJson} from "../utils";

export class SessionController {

    static create(request: IncomingMessage, response: ServerResponse): void {

        readRequestBody(request, (sessionId: any) => {

            new Request()
                .setPath("sessions")
                .setMethod("POST")
                .setDataProperty("customSessionId", sessionId)
                .request().
            subscribe({
                next(session) {
                    response.write(toJson("sessionId", session.data.id));
                    response.end();
                },
                error(error) {
                    if(error.response.status == 409) {
                        response.write(toJson("sessionId", sessionId));
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
