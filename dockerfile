
FROM node:12.16

USER node
WORKDIR /home/node/

COPY package.json .
COPY yarn.lock .
RUN yarn install

COPY . .

# Execução
CMD ["yarn", "start"]