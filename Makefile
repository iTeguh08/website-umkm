all : up up-d down queue-work test artisan composer php php-version shell tinker setup sail-install
.PHONY : all

COMPOSE_PROJECT_NAME = umbrella
sail = export COMPOSE_PROJECT_NAME=${COMPOSE_PROJECT_NAME} && ./vendor/bin/sail

up:
	${sail} up

up-d:
	${sail} up -d

down:
	export COMPOSE_PROJECT_NAME=$COMPOSE_PROJECT_NAME
	${sail} down

queue-work:
	export COMPOSE_PROJECT_NAME=$COMPOSE_PROJECT_NAME
	${sail} artisan queue:work

test:
	export COMPOSE_PROJECT_NAME=$COMPOSE_PROJECT_NAME
	${sail} test

artisan:
	${sail} artisan $(CMD)

composer:
	${sail} composer $(CMD)

php:
	${sail} php $(CMD)

php-version:
	${sail} php --version

shell:
	${sail} shell

tinker:
	${sail} tinker

tinkerwell:
	export COMPOSE_PROJECT_NAME=${COMPOSE_PROJECT_NAME} && /Applications/Tinkerwell.app/Contents/MacOS/Tinkerwell

setup:
	docker run --rm \
		-v "$(PWD)":/opt \
		-w /opt \
		laravelsail/php82-composer:latest \
		bash -c "if [ ! -f composer.json ]; then echo 'composer.json not found'; exit 1; fi && composer install --ignore-platform-reqs && cp -n .env.example .env || true && php artisan key:generate"

initial-setup:
	docker run --rm \
		-v "$(PWD)":/opt \
		-w /opt \
		laravelsail/php82-composer:latest \
		bash -c "composer create-project laravel/laravel laravel --prefer-dist && mv -f laravel/* . && mv -f laravel/.* . 2>/dev/null || true && rm -rf laravel"

# Install sail in existing project
sail-install:
	docker run --rm -i \
		-v "$(PWD)":/opt \
		-w /opt \
		laravelsail/php82-composer:latest \
		bash -c "if [ ! -f /opt/.env ]; then cp /opt/.env.example /opt/.env; fi; php artisan sail:install"