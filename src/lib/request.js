const axios = require("axios");

axios.interceptors.response.use(
  function (response) {
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
  contentType = ""
) {
  let config = {
    method: type,
    url: path ? `${mainConfig.baseURL}/${path}` : mainConfig.baseURL,
    headers: {
      Authorization: `Bearer ${mainConfig.token}`,
      "Content-Type": contentType,
    },
    data: data,
  };

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

    if (d.data.links && d.data.links.next) {
      return makeRequest(d.data.links.next.href, "", config, returnData);
    }
  });

  return returnData;
}
