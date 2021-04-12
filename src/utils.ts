import {IncomingMessage} from "http";
import {OpenViduRole} from "openvidu-node-client";

export function toJson(key: any, value?: any): string | undefined {
    if(value) return JSON.stringify({[key]: value});
    return key ? JSON.stringify(key) : undefined;
}

export function fromJson(data: any): {} {
    return JSON.parse(data);
}

export function roleName(role: "1" | "2" | "3") {
    switch (role) {
        case "1": {
            return OpenViduRole.SUBSCRIBER;
        }
        case "2": {
            return OpenViduRole.PUBLISHER;
        }
        case "3": {
            return OpenViduRole.MODERATOR;
        }
    }
}

export function readRequestBody(request: IncomingMessage, callback: Function): void {
    var body: string = "";
    request.on('readable', function() {
        body += request.read();
    });
    request.on('end', function() {
        body = body.replace(/null$/, "");

        try {
            callback(fromJson(body));
        } catch {
            callback(body);
        }
    });
}
