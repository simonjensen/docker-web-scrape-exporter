FROM node:21-alpine

WORKDIR /app

COPY package*.json ./

RUN npm set progress=false && \
    npm config set depth 0 && \
    npm install --omit=dev

COPY app.js /app/

ENV PORT 3001
ENV URL ""
ENV CSS_SELECTOR ""
ENV PROMETHEUS_METRIC_NAME ""

EXPOSE $PORT

CMD [ "node", "/app/app.js" ]
