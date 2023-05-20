.PHONY: build-dev
build-dev:
	docker compose -f docker-compose.base.yaml build

.PHONY: up-dev
up-dev:
	docker compose -f docker-compose.base.yaml up

.PHONY: down-dev
down-dev:
	docker compose -f docker-compose.base.yaml down

.PHONY: setup-dev
setup-dev: build-dev up-dev

.PHONY: build-prod
build-prod:
	docker compose -f docker-compose.base.yaml -f docker-compose.prod.yaml build

.PHONY: up-prod
up-prod:
	docker compose -f docker-compose.base.yaml -f docker-compose.prod.yaml up

.PHONY: down-prod
down-prod:
	docker compose -f docker-compose.base.yaml -f docker-compose.prod.yaml down

.PHONY: setup-db-prod
setup-db-prod: up-prod
	yarn prisma generate && yarn prisma db push

.PHONY: setup-prod
setup-prod: build-prod up-prod
