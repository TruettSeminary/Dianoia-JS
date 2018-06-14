import fetch, {Headers, Request} from 'node-fetch'; 

const HTTP_METHODS = {
    GET: 'GET',
    POST: 'POST', 
    PUT: 'PUT', 
    DELETE: 'DELETE', 
    HEAD: 'HEAD', 
    OPTIONS: 'OPTIONS', 
    CONNECT: 'CONNECT', 
    TRACE: 'TRACE'
};


export default class FetchEngine {
    constructor(baseURL, jwt) {
        this.baseURL = baseURL;

        this.setJWT = (jwt) => {
            this.jwt = jwt; 
            let headerOptions = {
                'Content-Type': 'application/json'
            };
            if(jwt !== null && jwt !== '') {
                headerOptions['Authorization'] = `Bearer ${this.jwt}`;
            }
            this.headers = new Headers(headerOptions); 
        }

        this.setJWT(jwt); 
    }

    generateRequest(method, url, body) {
        // return a new request object
        // TODO: check on credentials
        // TODO: chekc on "mode" setting to ensure cors is allowed
        let init = {
            method, 
            headers: this.headers, 
            credentials: 'omit'
        }; 

        if(body && ![HTTP_METHODS.GET, HTTP_METHODS.HEAD].includes(method)) {
            init['body'] = JSON.stringify(body);
        }

        return new Request(url, init); 
    }

    generateURL(path, params = {}) {
        // TODO: validate path is formatted correctly
        let url = this.baseURL + path; 
        Object.keys(params).forEach((key, index)=>{
            if(index === 0) url += '?';
            else url += '&';
            url += `${key}=${params[key]}`;
        });

        return url; 
    }

    parseJSON(response) {
        return response.json ? response.json() : response; 
    }

    checkStatus(response) {
        if(response.status >= 200 && response.status < 300) {
            return response; 
        }

        return this.parseJSON(response).then(responseFormatted => {
            const error = new Error(response.statusText); 
            error.response = response; 
            error.response.payload = responseFormatted; 
            throw error; 
        });
    }

    request({method, path, params, body}) {
        let url = this.generateURL(path, params);
        return fetch(this.generateRequest(method, url, body))
            .then(res => this.checkStatus(res))
            .then(res => this.parseJSON(res))
            .then((response) => {
                return response; 
            }); 
    }

    get({path, params}) {
        return this.request({
            method: HTTP_METHODS.GET, 
            path,
            params
        });
    }

    post({path, params, body}) {
        return this.request({
            method: HTTP_METHODS.POST, 
            path,
            params, 
            body
        });
    }

    put({path, params, body}) {
        return this.request({
            method: HTTP_METHODS.PUT, 
            path,
            params, 
            body
        });
    }

    delete({path, params, body}) {
        return this.request({
            method: HTTP_METHODS.DELETE, 
            path,
            params, 
            body
        });
    }
}
