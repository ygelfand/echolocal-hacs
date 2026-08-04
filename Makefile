COMPONENT := custom_components/echolocal
BUNDLE := $(COMPONENT)/frontend/echolocal.js
BRAND := $(COMPONENT)/brand
VERSION := $(shell python3 -c "import json; print(json.load(open('$(COMPONENT)/manifest.json'))['version'])")

.DEFAULT_GOAL := help

.PHONY: help
help: ## Show this help
	@grep -hE '^[a-zA-Z_-]+:.*?## ' $(MAKEFILE_LIST) \
		| sort \
		| awk 'BEGIN{FS=":.*?## "}{printf "  \033[36m%-10s\033[0m %s\n", $$1, $$2}'

.PHONY: version
version: ## Print the manifest version
	@echo $(VERSION)

.PHONY: deps
deps: ## Install the frontend build dependencies
	npm ci

node_modules: package-lock.json
	npm ci
	@touch node_modules

.PHONY: build
build: node_modules ## Bundle the frontend into the component
	npm run build

.PHONY: watch
watch: node_modules ## Rebuild on every change; reload the browser to pick it up
	npm run watch

.PHONY: typecheck
typecheck: node_modules ## Typecheck the frontend
	npm run typecheck

.PHONY: lint
lint: node_modules ## Lint the Python and typecheck the frontend
	ruff check $(COMPONENT)
	ruff format --check $(COMPONENT)
	npm run typecheck

.PHONY: fmt
fmt: ## Format the Python
	ruff format $(COMPONENT)

.PHONY: fresh
fresh: build ## Fail if the committed bundle is not what the sources build
	@git diff --quiet -- $(BUNDLE) || { \
		echo "$(BUNDLE) is out of date — run make build and commit it"; exit 1; }
	@echo "bundle is current"

.PHONY: check
check: lint fresh ## Validate the manifests, lint, and confirm the bundle is current
	@python3 -m json.tool $(COMPONENT)/manifest.json >/dev/null && echo "manifest.json ok"
	@python3 -m json.tool hacs.json >/dev/null && echo "hacs.json ok"
	@python3 -m compileall -q $(COMPONENT) && echo "compile ok"

.PHONY: brand
brand: ## Regenerate the brand icons Home Assistant serves from the integration (needs rsvg-convert)
	@for n in icon dark_icon; do \
		node brand.mjs $$n | rsvg-convert -w 256 -h 256 -o $(BRAND)/$$n.png; \
		node brand.mjs $$n | rsvg-convert -w 512 -h 512 -o $(BRAND)/$$n@2x.png; \
		echo "$(BRAND)/$$n.png $(BRAND)/$$n@2x.png"; \
	done

.PHONY: preview
preview: build ## Serve the card and dashboard preview against a fixture, no Home Assistant needed
	@echo "http://localhost:8777/dev/preview.html"
	python3 -m http.server 8777

.PHONY: clean
clean: ## Remove build output and caches
	rm -rf node_modules $(COMPONENT)/__pycache__ $(BUNDLE).map

.PHONY: release
release: check ## Tag the manifest version and publish a GitHub release (gh)
	@git diff --quiet HEAD || { echo "working tree dirty — commit first"; exit 1; }
	@git rev-parse "v$(VERSION)" >/dev/null 2>&1 && { echo "tag v$(VERSION) already exists"; exit 1; } || true
	git push
	gh release create "v$(VERSION)" --title "v$(VERSION)" --generate-notes
	@echo "released v$(VERSION)"
