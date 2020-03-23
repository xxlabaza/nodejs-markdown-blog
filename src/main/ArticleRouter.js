
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
const router = express.Router();
const Article = require("./ArticleModel");


router.get("/create", (request, response) => {
  response.render("articles/create", { article: new Article() });
});

router.get("/edit/:articleId", async (request, response) => {
  const articleId = request.params.articleId;
  const result = await Article.findById(articleId);
  response.render("articles/edit", { article: result });
});

router.get("/:slug", async (request, response) => {
  const slug = request.params.slug;
  const result = await Article.findOne({ slug: slug });
  if (result === null) {
    response.redirect("/");
  } else {
    response.render("articles/show", { article: result });
  }
});

router.post("/", (request, response, next) => {
  request.article = new Article();
  next();
}, saveAndRedirect("articles/create"));

router.put("/:articleId", async (request, response, next) => {
  const articleId = request.params.articleId;
  request.article = await Article.findById(articleId);
  next();
}, saveAndRedirect("articles/edit"));

router.delete("/:articleId", async (request, response) => {
  const articleId = request.params.articleId;
  await Article.findByIdAndDelete(articleId);
  response.redirect("/");
});

function saveAndRedirect (path) {
  return async (request, response) => {
    const article = request.article;
    article.title = request.body.title;
    article.description = request.body.description;
    article.markdown = request.body.markdown;

    try {
      const result = await article.save();
      response.redirect(`/articles/${result.slug}`);
    } catch (ex) {
      response.render(`articles/create/${path}`, { article: article });
    }
  };
}

module.exports = router;
