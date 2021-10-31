import axios from 'axios';
import { encode } from 'js-base64';
//using environmental data embedded in React build
const cloudantDBURL = process.env.REACT_APP_CLOUDANT_URL
const username = process.env.REACT_APP_CLOUDANT_USERNAME
const password = process.env.REACT_APP_CLOUDANT_PASSWORD

//BASE64 encoded username password creates authkey
const authKeyEncode = encode(`${username}:${password}`);

export default axios.create({
    baseURL: `${cloudantDBURL}`,
    headers: {
        'Authorization': `Basic ${authKeyEncode}`,
    }
});
