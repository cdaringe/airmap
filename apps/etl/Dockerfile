# this dockerfile presumes a local build is already completed!
FROM node:alpine
WORKDIR /etl/app

ENV NODE_ENV=production

ENV LANG=en_US.UTF-8
ENV LANGUAGE=en_US:en
ENV LC_ALL=en_US.UTF-8
ENV TZ=America/Los_Angeles
RUN apk add --no-cache tzdata \
    && cp /usr/share/zoneinfo/America/Los_Angeles /etc/localtime \
    && echo "America/Los_Angeles" > /etc/timezone \
    && apk del tzdata

COPY ./dist ./dist
COPY package.json entrypoint.sh ./
RUN npm i -g pnpm && pnpm install --prod \
  && touch .env
CMD ["sh", "entrypoint.sh"]
