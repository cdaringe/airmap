FROM node:alpine as build
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=$PATH:/home/node/.npm-global/bin
USER node
RUN npm add --global pnpm@6
WORKDIR /etl/app
COPY package.json .
RUN NODE_ENV=development pnpm install --dir /etl/app
# RUN NODE_ENV=development npm i
RUN mv node_modules node_modules_dev
RUN NODE_ENV=production pnpm install --prod --dir /etl/app
# RUN NODE_ENV=production npm i --prod
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
