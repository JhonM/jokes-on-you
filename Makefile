default: clean install clean_frontend install_frontend

clean:
	rm -rf node_modules && rm -rf dist

install:
	npm install

lint:
	npm run lint

dev:
	npm run start:dev

prod:
	npm run build && npm run start

build:
	npm run build

test:
	npm run test

test_watch:
	npm run test:watch

clean_frontend:
	cd frontend && rm -rf node_modules && rm -rf dist

install_frontend:
	cd frontend && npm install

lint_frontend:
	cd frontend && npm run verify

dev_frontend:
	cd frontend && npm run start

build_frontend:
	cd frontend && npm run build

clean_frontend_cache:
	cd frontend && rm -rf .parcel-cache
