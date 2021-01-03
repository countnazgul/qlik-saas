#!/usr/bin/env node
const request = require("./lib/request");

var qlikSaas = function QlikSaas(config) {
  if (!config.url) throw { message: "URL parameter is required" };
  if (!config.token) throw { message: "API token parameter is required" };
  if (!config.version) config.version = 1;

  config.baseURL = `https://${config.url}/api/v${config.version}`;

  this.Get = async function (path) {
    if (!path) throw { message: `"path" parameter is missing` };

    return await request(config, path, "get");
  };

  this.Delete = async function (path) {
    if (!path) throw { message: `"path" parameter is missing` };

    return await request(config, path, "delete");
  };

  this.Patch = async function (
    path,
    data = {},
    contentType = "application/json"
  ) {
    if (!path) throw { message: `"path" parameter is missing` };

    return await request(config, path, "patch", data, contentType);
  };

  this.Post = async function (
    path,
    data = {},
    contentType = "application/json"
  ) {
    if (!path) throw { message: `"path" parameter is missing` };

    return await request(config, path, "post", data, contentType);
  };

  this.Put = async function (
    path,
    data = {},
    contentType = "application/json"
  ) {
    if (!path) throw { message: `"path" parameter is missing` };

    return await request(config, path, "put", data, contentType);
  };
};

module.exports = qlikSaas;
