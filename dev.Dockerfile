FROM node:16-alpine

WORKDIR /app

RUN yarn --frozen-lockfile

COPY . ./

ENV NEXT_TELEMETRY_DISABLED 1
CMD yarn dev

