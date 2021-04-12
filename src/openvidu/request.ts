import {Map, Method} from "./types";
import {Observable} from "rxjs";
import axios, {AxiosRequestConfig, AxiosResponse} from "axios";
import {fromJson, toJson} from "../utils";

export class Request {

    private domain = "https://127.0.0.1:8091/api/";
    private path = "";
    private method: Method = "GET";
    private headers: Map = {};
    private data: Map = {};


    constructor() {
        this.setHeader("Authorization", "Basic T1BFTlZJRFVBUFA6SGVsbG8=");
        this.setHeader("Content-Type", "application/json")
    }

    setPath(path: string): Request {
        this.path = path;
        return this;
    }

    setMethod(method: Method): Request {
        this.method = method;
        return this;
    }

    setHeader(key: string, value: string): Request {
        this.headers[key] = value;
        return this;
    }

    setHeaders(headers: Map): Request {
        Object.assign(this.headers, headers);
        return this;
    }

    setData(data: Map): Request {
        Object.assign(this.data, data);
        return this;
    }

    setDataProperty(key: string, value: any): Request {
        this.data[key] = value;
        return this;
    }

    request(): Observable<AxiosResponse> {

        let config: AxiosRequestConfig = {
            baseURL: this.domain,
            url: this.path,
            method: this.method,
            headers: this.headers,
            data: toJson(this.data)
        };

        console.warn(config);

        return new Observable(observer => {

            axios.request(config).then(response => {
                try {
                    response.data = fromJson(response.data);
                } catch {}

                observer.next(response);
                observer.complete();
            }, reject => {
                observer.error(reject);
            }).catch(error => {
                observer.error(error);
            });
        });
    }

}
