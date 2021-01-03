const axios = require("axios");

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
  return response;
};

async function makeRequest(config, data = []) {
  returnData = [...data];

  await axios(config)
    .then(async function (d) {
      if (d.data.data) returnData = [...returnData, ...d.data.data];
      if (!d.data.data) returnData = d.data;

      if (d.data.links && d.data.links.next) {
        return makeRequest(d.data.links.next.href, "", config, returnData);
      }
    })
    .catch(function (e) {
      throw new Error(e.message);
    });

  return returnData;
}
