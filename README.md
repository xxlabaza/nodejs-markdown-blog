
# Overview

This is a yet another implementation of a markdown blog engine based on **Web Dev Simplified** [tutorial](https://www.youtube.com/watch?v=1NrHkjlWVhM) and customised (try to find my own NodeJS style...) by me.

The project's features:

* its frontend made with `Bootstrap` and `EJS` templates;
* stores data in `MongoDB` via `mongoose` library;
* runs `ESLint` before the tests;
* it has the tests with power of `Jest` and `supertest` (for API checks);
* uses `nodemon` for automaticaly restarting app during the development;
* it uses `Docker` and `docker-compose` tools for distribution, local launch and testing.

## Launch

### Docker compose

To run the project with a `docker-compose` tool, just type the following in a terminal:

```bash
$> docker-compose up --detach
Creating mongodb ... done
Creating markdown-blog ... done
```

To stop the project:

```bash
$> docker-compose stop
Stopping markdown-blog ... done
Stopping mongodb       ... done
```

### Developer mode

To run the project in develop mode, start a **MongoDB** database, for example via a **Docker**:

```bash
$> docker run -p 27017:27017 mongo:4.2.3
...
```

Then, start the project itself:

```bash
$> npm run start:dev

> markdown-blog@1.0.0 start-dev /markdown-blog
> nodemon main.js

[nodemon] 2.0.2
[nodemon] to restart at any time, enter `rs`
[nodemon] watching dir(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `node main.js`
...
```

Open [localhost:5000](http://localhost:5000) in your web browser and see something like the screenshots below.

**Main page**:

![all articles](https://github.com/xxlabaza/nodejs-markdown-blog/blob/master/.screenshots/screenshot-1.png?raw=true)

**Read an article**:

![view article](https://github.com/xxlabaza/nodejs-markdown-blog/blob/master/.screenshots/screenshot-2.png?raw=true)

**Edit an article**:

![edit article](https://github.com/xxlabaza/nodejs-markdown-blog/blob/master/.screenshots/screenshot-3.png?raw=true)
