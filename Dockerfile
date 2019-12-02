FROM node:12

WORKDIR /app

COPY package*.json ./

RUN npm set progress=false && \
    npm config set depth 0 && \
    npm install --only=production

COPY app.js /app/

ENV PORT 3001
ENV URL ""
ENV CSS_SELECTOR ""
ENV CSS_SELECTOR_CONTEXT ""
ENV PROMETHEUS_METRIC_NAME ""

EXPOSE $PORT

CMD [ "node", "/app/app.js" ]
