
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

const databaseHost = process.env.DATABASE_HOST || "127.0.0.1";
require("mongoose").connect(`mongodb://${databaseHost}/markdwon_blog-db`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

const express = require("express");
const app = express();

app.set('views','./src/resources/views');
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));

const methodOverride = require("method-override");
app.use(methodOverride("_method"));

const healthRouter = require("./src/main/HealthRouter");
const rootRouter = require("./src/main/RootRouter");
app.use("/", healthRouter, rootRouter);

const articleRouter = require("./src/main/ArticleRouter");
app.use("/articles", articleRouter);

const serverPort = process.env.SERVER_PORT || 5000;
app.listen(serverPort, function () {
  console.log(`the server started on port ${serverPort}`)
});
