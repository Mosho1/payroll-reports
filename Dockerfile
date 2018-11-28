FROM node:latest
RUN npm i -g pm2

WORKDIR /tmp
RUN mkdir code
WORKDIR /tmp/code
COPY ./ ./

WORKDIR /tmp/code/backend
RUN npm i
RUN npm run build

WORKDIR /tmp/code/frontend
RUN npm i
RUN npm run build

EXPOSE 3000 4000

WORKDIR /tmp/code

CMD ["pm2", "start", "process.yml", "--no-daemon"]