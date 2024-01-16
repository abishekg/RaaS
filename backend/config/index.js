import Cloud from '@google-cloud/storage';
// const path = require('path');
import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);

// 👇️ "/home/john/Desktop/javascript"
const __dirname = path.dirname(__filename);
console.log('directory-name 👉️', __dirname);
const serviceKey = path.join(__dirname, './keys.json');
const {Storage} = Cloud;
const gcp = new Storage({
    keyFilename: serviceKey,
    projectId: 'raas-dsc'
})

export default gcp;