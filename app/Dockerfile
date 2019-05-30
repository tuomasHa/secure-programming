FROM node:10

# copy source files to image
RUN mkdir /home/node/app
ADD [--chown=node:node] . /home/node/app

USER node

WORKDIR /home/node/app
RUN npm install

ENTRYPOINT ["node", "src/server.js"]
