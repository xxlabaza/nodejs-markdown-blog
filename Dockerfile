
FROM  node:13.10.1-alpine3.11
LABEL maintainer="Artem Labazin <xxlabaza@gmail.com>"

HEALTHCHECK --interval=5s --timeout=1s --retries=1 \
  CMD curl --fail http://localhost:5000/health || exit 1

RUN mkdir -p /home/node/app/node_modules \
    && chown -R node:node /home/node/app \
    && apk --no-cache add curl

WORKDIR /home/node/app

COPY package*.json ./

USER node

RUN npm install --only=production

COPY --chown=node:node . .

CMD [ "npm", "start" ]
