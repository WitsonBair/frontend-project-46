install:
	npm ci

test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8

lint:
	npx eslint .	

fix:
	npx eslint . --fix

publish:
	npm publish --dry-run
jest:
	NODE_OPTIONS=--experimental-vm-modules npx jest