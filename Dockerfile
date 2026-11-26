FROM docker.io/library/node:26-alpine@sha256:6bd9ab43c0ec0190ca7b2d193906cb8b7edf6e7f4afa43ddeccd6452710bffb5

WORKDIR /app

COPY ./src/ ./

RUN npm set progress=false && \
    npm config set depth 0 && \
    npm install --omit=dev && \
    npm audit fix

ENV URL=""
ENV CSS_SELECTOR=""
ENV PROMETHEUS_METRIC_NAME=""

EXPOSE 3000

CMD [ "npm", "start" ]
