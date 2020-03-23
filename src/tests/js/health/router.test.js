
/*
 * Copyright 2020 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const request = require("supertest");
const db = require("../../../main/js/database");
const app = require("../../../main/js/app");

let server;

beforeAll(() => {
  return db.connect("mongodb://127.0.0.1/markdwon_blog-db");
});

beforeAll(done => {
  server = app.listen(4000, (error) => {
    if (error) {
      return done(error);
    }
    done();
  });
});

afterAll(done => {
  return server && server.close(done);
});

afterAll(() => {
  return db.disconnect();
});

describe("check /health endpoint", () => {

  test("the endpoint is reachable", () => {
    return request(app).get("/health")
      .expect("Content-Type", /json/)
      .expect(200);
  });

  test("the endpoint returns proper JSON", async () => {
    const response = await request(app).get("/health");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      status: "UP",
      database: {
        status: "UP",
        connected: true
      }
    });
  });
});
