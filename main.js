
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

const log = require("./src/main/js/logger").get();
const db = require("./src/main/js/database");
const app = require("./src/main/js/app");

async function connectToDatabase () {
  const host = process.env.DATABASE_HOST || "127.0.0.1";
  const uri = `mongodb://${host}/markdwon_blog-db`;

  log.info("connecting to a database '%s' ...", uri);
  try {
    await db.connect(uri);
  } catch (ex) {
    const message = `unable to connect to the database, the reason is - ${ex.message}`;
    throw new Error(message);
  }
  log.info("the connection was established");
}

function startServer () {
  log.info("starting a web server....");

  const serverPort = process.env.SERVER_PORT || 5000;
  return new Promise((resolve, reject) => {
    app.listen(serverPort, function () {
      log.info("the web server was started on port %d", serverPort);
      resolve();
    }).on("error", function (error) {
      const message = `unable to start the web server, the reason is - ${error}`;
      reject(new Error(message));
    });
  });
}

connectToDatabase()
  .then(startServer)
  .catch(ex => log.error(ex.message));
