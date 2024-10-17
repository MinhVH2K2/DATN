export class FileUtil {
  genarateUrl = (newFleNm: string, typeUse: string) => {
    return process.env.REACT_APP_API_MEDIA_URL + `/public/getImage?typeUse=${typeUse}&atchFleSeqNm=${newFleNm}`;
  };

  genarateUrlByte = (newFleNm: string, typeUse: string) => {
    return process.env.REACT_APP_API_URL + `/file/get-byte-array?typeUse=${typeUse}&atchFleSeqNm=${newFleNm}`;
  };

  genarateUrlByteDownload = (newFleNm: string) => {
    return process.env.REACT_APP_MAIN_URL + `/common/fileServices/download?atchFleSeqNm=${newFleNm}`;
  };

  FileUtil = {
    genarateUrlGetImage: this.genarateUrl,
    genarateUrlGetByte: this.genarateUrlByte,
    genarateUrlByteDownload: this.genarateUrlByteDownload,
  };
}
