PROJECT_NAME := ecorp-ctf-challenge
#(if you change this also change the name in the Dockerfiles)
NETWORK_NAME := main_network 

setup:
	cp -f .env challenge/web/.env

	# Create a network, which allows containers to communicate
	# with each other, by using their container name as a hostname
	@docker network ls | grep -q ${NETWORK_NAME}|| docker network create main_network
	#
	cd challenge/web && yarn build
	docker compose up --build

seed:
	docker exec ecorp-ctf-challenge-web-1 yarn db-bootstrap

stop:
	docker compose down

start:
	cp -f .env challenge/web/.env
	docker compose up

clean:
	rm -rf challenge/web/.next
	rm -rf challenge/web/prisma/migrations # This is only because it's a CTF challenge
	docker-compose -p ${PROJECT_NAME} down --rmi all --volumes --remove-orphans



# DEV -- IGNORE FOR PROD --
setup-dev:
	cp -f .env challenge/web/.env
	cd challenge/web && yarn
	cd challenge/bot && yarn
	@docker network ls | grep -q ${NETWORK_NAME}|| docker network create main_network
	docker compose -f compose-dev.yaml up --build
start-dev:
	cp -f .env challenge/web/.env
	docker compose -f compose-dev.yaml up
