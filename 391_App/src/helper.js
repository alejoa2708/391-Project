//import { Storage } from '@capacitor/storage';
import axios from 'axios';

export default class Helper {
    // Remote server host - 192.64.116.116
    static apiHost = '127.0.0.1';
    static apiPort = 5000;

    static post(url, data) {
        try {
            let response = axios.post(url, data);

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
        // let response = `http://${Helper.apiHost}:${Helper.apiPort}/${request}`;
        // console.log(response);
        return `http://${Helper.apiHost}:${Helper.apiPort}/${request}`;
    }

}
