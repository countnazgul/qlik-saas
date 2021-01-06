require("dotenv").config();
const qlikSaas = require("../src/index");

const chai = require("chai");
const expect = chai.expect;

let config = {
  url: process.env.URL,
  token: process.env.TOKEN,
};

let saasInstance = new qlikSaas(config);

describe("CSP origins operations", function () {
  it("Create CSP Origin", async function () {
    let data = {
      name: "Test Origin",
      description: "Origin created for testing purposes",
      origin: "localhost:3000",
      connectSrc: true,
      connectSrcWSS: true,
      objectSrc: true,
      scriptSrc: true,
      styleSrc: true,
    };

    let cspOrigin = await saasInstance.Post({
      path: "csp-origins",
      data,
      contentType: "application/json",
    });

    expect(cspOrigin).to.have.property("id");
  });
  it("Get CSP Origins", async function () {
    let cspOrigins = await saasInstance.Get("csp-origins");

    expect(cspOrigins).to.have.length.greaterThan(0);
  });

  it("Delete CSP Origins", async function () {
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
