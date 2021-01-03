const request = require("./request");

const Get = async function (mainConfig, path) {
  let b = request(mainConfig, path, "get");

  return b;
};

const Delete = async function (mainConfig, path) {
  let b = request(mainConfig, path, "delete");

  return b;
};

const Post = async function (mainConfig, path, data, contentType = "") {
  let b = request(mainConfig, path, "post", data, contentType);

  return b;
};

const Put = async function (mainConfig, path, data, contentType = "") {
  let b = request(mainConfig, path, "put", data, contentType);

  return b;
};

const Patch = async function (mainConfig, path, data, contentType = "") {
  let b = request(mainConfig, path, "patch", data, contentType);

  return b;
};

module.exports = {
  Get,
  Post,
  Delete,
  Put,
  Patch,
};
