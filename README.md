# docker-web-scrape-exporter

> A Prometheus web scrape exporter


## Usage

Start a scraper instance:

```sh
docker run -it --rm --name docker-web-scrape-exporter \
    -e URL=https://github.com/simonjensen \
    -e CSS_SELECTOR='body > div.logged-out.env-production.page-responsive.page-profile > div.application-main > main > div.mt-4.position-sticky.top-0.d-none.d-md-block.color-bg-default.width-full.border-bottom.color-border-muted > div > div > div.Layout-main > div > nav > a:nth-child(2) > span' \
    -e PROMETHEUS_METRIC_NAME=github_repository_count \
    -p 3001:3001 \
    docker.io/simonjensen/docker-web-scrape-exporter:latest
```

Fetch the scraped results:

```sh
curl -X GET http://localhost:3001
```
