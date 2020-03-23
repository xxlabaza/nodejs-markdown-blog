
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

const mongoose = require("mongoose");

let connection = null;

function getDefaultOptions () {
  return {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  };
}

module.exports = {
  async connect (uri, options = getDefaultOptions()) {
    const promise = mongoose.connect(uri, options);
    return promise.then((result) => {
      connection = result;
      return result;
    });
  },
  async disconnect () {
    if (connection === null) {
      return Promise.reject(new Error("there is not connection to a database"));
    }

    const promise = connection.disconnect();
    promise.then(() => {
      connection = null;
    });
    return promise;
  },
  getConnection () {
    return connection;
  }
};
