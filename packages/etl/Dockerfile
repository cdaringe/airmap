FROM node:alpine as build
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=$PATH:/home/node/.npm-global/bin
WORKDIR /etl/
RUN chown -R node .
RUN chmod 1766 .
WORKDIR /etl/app
RUN chown -R node .
RUN chmod 1766 .
RUN npm add --global pnpm@7
USER node
COPY package.json .
RUN NODE_ENV=development pnpm install --dir /etl/app
RUN mv node_modules node_modules_dev
RUN NODE_ENV=production pnpm install --prod --dir /etl/app
RUN mv node_modules /etl/node_modules_prod
RUN mv node_modules_dev node_modules
COPY ./* /etl/app/
RUN pnpm run build

FROM node:alpine
WORKDIR /etl/app
ENV NODE_ENV=production
COPY --from=build /etl/app/dist dist
COPY --from=build /etl/node_modules_prod node_modules
COPY --from=build /etl/app/package.json package.json
COPY entrypoint.sh entrypoint.sh
CMD ["sh", "entrypoint.sh"]
