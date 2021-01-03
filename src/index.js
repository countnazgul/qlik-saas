#!/usr/bin/env node
const { Get, Delete, Patch, Post, Put } = require("./lib/main");

var qlikSaas = function QlikSaas(config) {
  if (!config.url) throw new Error("URL is required");
  if (!config.token) throw new Error("API token is required");
  if (!config.version) config.version = 1;
  config.baseURL = `https://${config.url}/api/v${config.version}`;

  this.Get = async function (path) {
    let b = await Get(config, path);
    return b;
  };

  this.Post = async function (path, data, contentType) {
    let b = await Post(config, path, data, contentType);
    return b;
  };

  this.Delete = async function (path) {
    let b = await Delete(config, path);
    return b;
  };

  this.Put = async function (path, data, contentType) {
    let b = await Put(config, path, data, contentType);
    return b;
  };

  this.Patch = async function (path, data, contentType) {
    let b = await Patch(config, path, data, contentType);
    return b;
  };
};

module.exports = qlikSaas;
