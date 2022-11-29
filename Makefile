gendiff-help:
	node gendiff.js -h
lint:
	npx eslint .
jest test:
	NODE_OPTIONS=--experimental-vm-modules npx jest