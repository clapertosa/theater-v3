const request = require("supertest");
const serverPromise = require("../../index");

describe("/POST Search resolver", () => {
  let server;
  beforeAll(async () => {
    server = await serverPromise;
  });

  it.skip("should ", () => {
    return request(server)
      .post("/graphql")
      .send({ query: "{ search(query: 'Meet Joe Black') { id title } }" });
  });
});
