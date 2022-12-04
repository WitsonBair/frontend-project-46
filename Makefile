gendiff-help:
	node gendiff.js -h
lint:
	npx eslint .
lintfix:
	npx eslint . --fix
jest:
	NODE_OPTIONS=--experimental-vm-modules npx jest