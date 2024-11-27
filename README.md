# docker-web-scrape-exporter

[![Pipeline](https://github.com/simonjensen/docker-web-scrape-exporter/actions/workflows/publish.yaml/badge.svg?branch=master)](https://github.com/simonjensen/docker-web-scrape-exporter/actions/workflows/publish.yaml)

> A Prometheus web scrape exporter

---

## Usage

Start a container in interactive mode and perform installations etc.:

```sh
docker run -it --rm --name docker-web-scrape-exporter -v $(pwd)/src:/app -w /app -p 3000:3000 -u $(id -u ${USER}):$(id -g ${USER}) node:23-alpine sh
npm install --omit=dev
npm audit fix
```


Start a scraper instance:

```sh
docker run -it --rm --name docker-web-scrape-exporter \
    -e URL=https://github.com/simonjensen \
    -e CSS_SELECTOR='body > div.logged-out.env-production.page-responsive.page-profile > div.application-main > main > div.mt-4.position-sticky.top-0.d-none.d-md-block.color-bg-default.width-full.border-bottom.color-border-muted > div > div > div.Layout-main > div > nav > a:nth-child(2) > span' \
    -e PROMETHEUS_METRIC_NAME=github_repository_count \
    -p 3000:3000 \
    docker.io/simonjensen/docker-web-scrape-exporter:latest
```

Fetch the scraped results:

```sh
curl -X GET http://localhost:3000
```
