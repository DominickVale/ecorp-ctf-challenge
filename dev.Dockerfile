FROM node:16-slim AS base
RUN apt-get update \
    && apt-get install -y wget gnupg \
    && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install -y google-chrome-stable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf libxss1 \
      --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

RUN groupadd -r pptruser && useradd -r -g pptruser -G audio,video pptruser \
    && mkdir -p /home/pptruser/.cache/yarn \
    && mkdir /home/pptruser/app \
    && chown -R pptruser:pptruser /home/pptruser

FROM base AS deps
WORKDIR /home/pptruser/app
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
COPY --chown=pptruser:pptruser package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN yarn --frozen-lockfile

FROM base AS builder

WORKDIR /home/pptruser/app
COPY --from=deps /home/pptruser/app/node_modules ./node_modules
COPY --chown=pptruser:pptruser . .
RUN chown -R pptruser:pptruser /home/pptruser
USER pptruser

ENV NEXT_TELEMETRY_DISABLED 1
