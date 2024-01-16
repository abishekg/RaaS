import gcp from '../config/index.js';

const bucket = gcp.bucket('blob-storage-raas');

export const uploadImage = (file) => new Promise((resolve, reject) => {
    const {originalname, buffer} = file;

    const blob = bucket.file(originalname.replace(/ /g, "_"));
    const blobStream = blob.createWriteStream({
        resumable: false
    })

    blobStream
        .on('finish', () => {
            const publicUrl = `https://storage.cloud.google.com/${bucket.name}/${blob.name}`
            resolve(publicUrl)
        })
        .on('error', (error) => {
        reject(`Unable to upload image! ${error}`)
    })
        .end(buffer)
})
