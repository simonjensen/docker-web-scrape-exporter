# docker-web-scrape-exporter

A Prometheus web scrape exporter.


## Usage

Start a scraper instance:
```
docker run -it --rm --name linkedin-scraper \
    -e URL=https://www.linkedin.com/in/devops-consultant-simon-jensen/ \
    -e CSS_SELECTOR_CONTEXT='body > main > section.core-rail > section > section.top-card-layout > div > div.top-card-layout__entity-info-container > div:nth-child(1) > h3 > span.top-card__subline-item.top-card__subline-item--bullet' \
    -e PROMETHEUS_METRIC_NAME=linkedin_connections \
    -p 3001:3001 \
    docker.io/simonjensen/docker-web-scrape-exporter:latest
```

Fetch the scraped results:
```
curl -X GET http://localhost:3001
```
