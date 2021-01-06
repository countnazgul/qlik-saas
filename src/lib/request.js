const axios = require("axios");
const FormData = require("form-data");
const { Readable } = require("stream");

axios.interceptors.response.use(
  async function (response) {
    if (response.headers.location) {
      let redirectConfig = {
        method: "get",
        responseType: "arraybuffer",
        url: `${response.config.baseURL}${response.headers.location}`,
        headers: {
          Authorization: response.config.headers["Authorization"],
        },
      };

      let redirectData = await axios(redirectConfig);

      let b = redirectData.data;
      return redirectData;
    }

    return response;
  },
  function (e) {
    throw {
      status: e.response.status,
      statusText: e.response.statusText,
      message: e.message,
    };
  }
);

module.exports = async function (
  mainConfig,
  path,
  type,
  data,
  contentType = "application/json",
  file,
  fileName
) {
  let config = {
    method: type,
    baseURL: mainConfig.baseURL,
    url: path
      ? `/api/v${mainConfig.version}/${path}`
      : `/api/v${mainConfig.version}`,
    headers: {
      Authorization: `Bearer ${mainConfig.token}`,
      "Content-Type": contentType,
    },
    data: data,
  };

  if (contentType == "multipart/form-data") {
    if (path.toLowerCase().indexOf("extensions")) {
      let formData = new FormData();
      formData.append("file", bufferToStream(file), {
        contentType: "application/x-zip-compressed",
        filename: fileName ? fileName : "extension.zip",
      });

      config.headers = { ...config.headers, ...formData.getHeaders() };
      config.data = formData;
    }
  }

  if (contentType == "application/octet-stream") {
    config.data = bufferToStream(data);
  }

  let response = await makeRequest(config);

  if (response.data) return response.data;
  if (type == "post") return response.status;
  return response;
};

async function makeRequest(config, data = []) {
  returnData = [...data];

  await axios(config).then(async function (d) {
    if (d.data.data) returnData = [...returnData, ...d.data.data];
    if (!d.data.data) returnData = { data: d.data, status: d.status };

    if (d.data.links && (d.data.links.next || d.data.links.Next)) {
      config.url = d.data.links.next.href
        ? d.data.links.next.href
        : d.data.links.Next.Href;
      return makeRequest(config, returnData);
    }
  });

  return returnData;
}

function bufferToStream(buffer) {
  var stream = new Readable();
  stream.push(buffer);
  stream.push(null);

  return stream;
}
