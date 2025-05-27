// b2.js
const B2 = require("backblaze-b2");
require("dotenv").config();

const b2 = new B2({
  applicationKeyId: process.env.B2_KEY_ID,
  applicationKey: process.env.B2_APP_KEY,
});

const bucketId = process.env.B2_BUCKET_ID;

async function uploadFileToB2(fileBuffer, fileName) {
  await b2.authorize();

  const { data } = await b2.getUploadUrl({ bucketId });

  const result = await b2.uploadFile({
    uploadUrl: data.uploadUrl,
    uploadAuthToken: data.authorizationToken,
    fileName,
    data: fileBuffer,
  });

  const publicUrl = `https://f002.backblazeb2.com/file/${process.env.B2_BUCKET_NAME}/${fileName}`;
  return publicUrl;
}

module.exports = { uploadFileToB2 };
