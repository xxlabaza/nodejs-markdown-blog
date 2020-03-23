
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

const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();


const statusUp = JSON.stringify({
  status: "UP",
  database: {
    status: "UP",
    connected: true
  }
});

const statusDown = JSON.stringify({
  status: "DOWN",
  database: {
    status: "DOWN",
    connected: false
  }
});

router.get("/health", (request, response) => {
  let status;
  let body;
  if (mongoose.connection.readyState === 1) {
    status = 200;
    body = statusUp;
  } else {
    status = 500;
    body = statusDown;
  }

  response
    .status(status)
    .type("application/json")
    .send(body);
});

module.exports = router;
