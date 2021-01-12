require("dotenv").config();
const fs = require("fs");
const qlikSaas = require("../src/index");

const chai = require("chai");
const expect = chai.expect;

let config = {
  url: process.env.URL,
  token: process.env.TOKEN,
};

let saasInstance = new qlikSaas(config);

describe("Extensions operations", function () {
  it("Upload new extension (POST)", async function () {
    this.timeout(60000);
    let zipFile = fs.readFileSync(process.env.EXTENSION_PATH);

    let spaces = await saasInstance.Post({
      path: "extensions",
      contentType: "multipart/form-data",
      file: zipFile,
    });

    expect(spaces).to.have.property("userId");
  });

  it("Delete extension (DELETE)", async function () {
    this.timeout(60000);
    let extension = await saasInstance.Get("extensions").then(function (ex) {
      return ex.filter(function (e) {
        return e.name === process.env.EXTENSION_NAME;
      });
    });

    if (extension.length == 0) throw "Extension not found";

    let deleteExtension = await saasInstance.Delete(
      `extensions/${extension[0].id}`
    );

    expect(deleteExtension).to.have.property("status", 204);
  });
});
