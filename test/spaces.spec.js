require("dotenv").config();
const qlikSaas = require("../src/index");

const chai = require("chai");
const expect = chai.expect;

let config = {
  url: process.env.URL,
  token: process.env.TOKEN,
};

let saasInstance = new qlikSaas(config);

describe("Spaces operations", function () {
  it("Get all spaces (GET)", async function () {
    let spaces = await saasInstance.Get("spaces");

    expect(spaces).to.have.length.greaterThan(0);
  });

  it("Get single space details (GET)", async function () {
    let spaces = await saasInstance.Get("spaces");
    let singleSpace = await saasInstance.Get(`spaces/${spaces[0].id}`);

    expect(singleSpace).to.have.property("createdBy");
  });

  it("Create space (POST)", async function () {
    let data = {
      name: "Testing qlik-saas",
      description: "Space for testing qlik-saas package",
      type: "shared",
    };

    let createSpace = await saasInstance.Post(
      "spaces",
      data,
      "application/json"
    );

    expect(createSpace).to.have.property("id");
  });

  it("Delete space (DELETE)", async function () {
    let spaces = await saasInstance.Get("spaces");
    let singleSpace = spaces.filter((s) => s.name === "Testing qlik-saas");

    if (!singleSpace.length == 1) throw new Error("Space not found!");

    let deleteSpace = await saasInstance.Delete(`spaces/${singleSpace[0].id}`);
    expect(singleSpace).to.have.property("createdBy");
  });

  it("Update space (PUT)", async function () {
    let spaces = await saasInstance.Get("spaces");
    let singleSpace = spaces.filter((s) => s.name === "Testing qlik-saas");

    if (!singleSpace.length == 1) throw new Error("Space not found!");

    let data = {
      name: "Testing qlik-saas (Updated)",
    };

    let updateSpace = await saasInstance.Put(
      `spaces/${singleSpace[0].id}`,
      data,
      "application/json"
    );

    let b = 1;
    expect(updateSpace).to.have.property("name", data.name);
  });
});
