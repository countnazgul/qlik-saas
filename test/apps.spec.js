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

describe("App operations", function () {
  it("Import app (POST)", async function () {
    this.timeout(60000);
    let qvfFile = fs.readFileSync(process.env.QVF_PATH);

    let importFile = await saasInstance.Post({
      path: `apps/import?mode=NEW&name=${process.env.QVF_NAME}`,
      contentType: "application/octet-stream",
      data: qvfFile,
    });

    expect(importFile).to.have.property("attributes");
  });

  it("Export app (POST)", async function () {
    this.timeout(60000);
    let getAppId = await saasInstance
      .Get("items?resourceType=app")
      .then(function (apps) {
        return apps.filter(
          (a) => a.name === process.env.QVF_NAME
        )[0].resourceId;
      });

    if (!getAppId) throw "App not found";

    let exportedApp = await saasInstance.Post({
      path: `apps/${getAppId}/export?NoData=true`,
    });

    fs.writeFileSync(
      "C:\\Users\\countnazgul\\Documents\\Qlik\\Sense\\Apps\\blah.qvf",
      exportedApp
    );

    expect(importFile).to.have.property("attributes");
  });

  it("Update app info (PUT)", async function () {
    this.timeout(60000);

    let getAppId = await saasInstance
      .Get("items?resourceType=app")
      .then(function (apps) {
        return apps.filter(
          (a) => a.name === process.env.QVF_NAME
        )[0].resourceId;
      });

    let data = {
      attributes: {
        description: "Updated description",
      },
    };

    let updateApp = await saasInstance.Put({
      path: `apps/${getAppId}`,
      data: data,
    });

    expect(updateApp.attributes).to.have.property(
      "description",
      data.attributes.description
    );
  });

  it("Delete app (DELETE)", async function () {
    let cspOrigins = await saasInstance.Get("csp-origins");

    let originForDelete = cspOrigins.filter(function (c) {
      return c.name == "Test Origin";
    });

    if (originForDelete.length == 0) throw "CSP origin do not exists";

    let deleteResult = await saasInstance.Delete(
      `csp-origins/${originForDelete[0].id}`
    );

    expect(deleteResult).to.have.length.property("status", 204);
  });
});
