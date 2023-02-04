import axios from 'axios';

export default class Helper {
    static apiHost = '127.0.0.1';
    static apiPort = 5000;

    static post(url, data) {
        try {
            let response = axios.post(url, data);
            //console.log(response);
            return response;
        } catch (e) {
            console.log(e);
        }
    }

    static get(url) {
        try {
            let response = axios.get(url);
            console.log(response)
            return response;
        } catch (e) {
            console.log(e);
        }
    }

    /**
     * Grabs the `userId` from the storage.
     * @returns Promise of the `userId` string.
     */

    static getUserId() {
        console.log("getuserID1");
        return Storage.get({ key: 'userId' })
        .then(({value}) => value || '');
        
    }

    /**
     * Creates an API URL to be used to make requests with.
     * @param request Request string (i.e. nutrition, pantry) corresponding to API URLs.
     * @returns Concatenated string of the API URL.
     */

    static getAPIUrl(request) {
        return `http://${Helper.apiHost}:${Helper.apiPort}/${request}`;
    }

}
