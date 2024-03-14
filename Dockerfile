FROM node:21-alpine

WORKDIR /app

COPY ./src/ ./

RUN npm set progress=false && \
    npm config set depth 0 && \
    npm install --omit=dev && \
    npm audit fix

ENV URL ""
ENV CSS_SELECTOR ""
ENV PROMETHEUS_METRIC_NAME ""

EXPOSE 3000

CMD [ "npm", "start" ]
