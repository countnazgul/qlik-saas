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
  it("Get app meta data with filter", async function () {});

  it("Import app", async function () {
    this.timeout(60000);
    let qvfFile = fs.readFileSync(process.env.QVF_PATH);

    let importFile = await saasInstance.Post({
      path: "apps/import?mode=NEW&name=Consumer Sales",
      contentType: "application/octet-stream",
      data: qvfFile,
    });

    expect(importFile).to.have.property("attributes");
  });

  it("Export app", async function () {
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
});
