
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

const log4js = require("log4js");
const path = require("path");

// for clustering via PM2 read this:
// https://log4js-node.github.io/log4js-node/clustering.html
// log4js.configure({

// });

function getCallerFileName () {
  const originalFunction = Error.prepareStackTrace;
  try {
    const error = new Error();
    Error.prepareStackTrace = function (_, stack) {
      return stack;
    };

    const currentFile = error.stack.shift().getFileName();
    while (error.stack.length) {
      const callerFile = error.stack.shift().getFileName();
      if (currentFile !== callerFile) {
        return callerFile;
      }
    }
  } catch (ex) {
    // noop
  } finally {
    Error.prepareStackTrace = originalFunction;
  }
}

module.exports.get = function (level = "info", file = getCallerFileName()) {
  const scriptName = path.basename(file);
  const logger = log4js.getLogger(scriptName);
  logger.level = level;
  return logger;
};
