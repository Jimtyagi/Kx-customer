// import { signS3URLMutation } from "js/QueryMutation/Mutations";
import client from "js/apoloClient";
import Upload from "react-native-background-upload";
import { NetInfo, Platform } from "react-native";
import RNGRP from "react-native-get-real-path";
import { rethumbUrl } from "../static";
export const uploadFile = ({ file, getUploadId, getProgress }) => {
  return (dispatch, getState) => {
    return new Promise(async (resolve, reject) => {
      try {
        // const {
        //   data: {
        //     platform: { signS3URL }
        //   }
        // } = await client.mutate({
        //   mutation: signS3URLMutation,
        //   variables: {
        //     fileMimeType: file.mimeType,
        //     fileGroup: "content"
        //   }
        // });

        const res = await uploadFileToS3({
          signS3URL,
          file,
          getUploadId,
          getProgress
        });
        // // const res = await RNFetchBlob.fetch('PUT', signedUrl, {'Content-Type' : file.mimeType, 'X-Amz-Tagging':tag},RNFetchBlob.wrap(fileUrl))
        // console.log(res.respInfo, "Ek");
        resolve(res);
      } catch (e) {
        reject(e);
      }
    });
  };
};

export const uploadFileToS3 = ({
  signS3URL,
  file,
  getUploadId,
  getProgress
}) => {
  return new Promise(async (resolve, reject) => {
    NetInfo.addEventListener(
      "connectionChange",
      function(type) {
        handleConnectionInfoChange(type, resolve, reject);
      },
      false
    );

    try {
      const returnUrl = signS3URL.displayURL;
      const signedUrl = signS3URL.uploadURL;
      const tag = signS3URL.tag;
      let fileUrl = file.url;

      if (Platform.OS == "android") {
        fileUrl = await RNGRP.getRealPathFromURI(fileUrl);
      }

      console.log(fileUrl, "fileUrl");

      const options = {
        url: signedUrl,
        path: fileUrl,
        method: "PUT",
        headers: { "Content-Type": file.mimeType, "X-Amz-Tagging": tag }
      };

      const uploadId = await Upload.startUpload(options);

      getUploadId ? getUploadId(uploadId) : null;

      Upload.addListener("progress", uploadId, data => {
        if (getProgress) {
          getProgress(data.progress);
        }
      });

      Upload.addListener("error", uploadId, data => {
        console.log(`Error: ${data.error}%`);
        reject(data.error);
      });

      Upload.addListener("cancelled", uploadId, data => {
        console.log("Canceled");
        resolve("error");
      });

      Upload.addListener("completed", uploadId, data => {
        // data includes responseCode: number and responseBody: Object
        console.log("Completed!");
        resolve(returnUrl);
      });
    } catch (e) {
      console.log(e, "error");
      reject(e);
    }
  });
};

const handleConnectionInfoChange = (type, resolve, reject) => {
  if (type == "wifi" || type == "cellular") {
  } else {
    reject("No Internet");
  }
};
