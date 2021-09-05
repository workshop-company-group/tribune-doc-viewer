NAME=tribune-doc-viewer
HASH=${shell git rev-parse --short HEAD}

before:
	@echo ":::starting CI/CD pipeline.."
	curl "https://api.GitHub.com/repos/Tribunes/tribune-doc-viewer/statuses/$(GIT_COMMIT)?access_token=$(GITHUB_TOKEN)" \
		--silent --output /dev/null \
		-H "Content-Type: application/json" \
		-X POST \
		-d "{\"state\": \"pending\", \"context\": \"continuous-integration/jenkins\", \"description\": \"Jenkins\", \"target_url\": \"${BUILD_URL}console\"}"

post-success:
	@echo ":::finishing..."
	curl "https://api.GitHub.com/repos/Tribunes/tribune-doc-viewer/statuses/$(GIT_COMMIT)?access_token=$(GITHUB_TOKEN)" \
		--silent --output /dev/null \
		-H "Content-Type: application/json" \
		-X POST \
		-d "{\"state\": \"success\", \"context\": \"continuous-integration/jenkins\", \"description\": \"Jenkins\", \"target_url\": \"${BUILD_URL}console\"}"

post-failure:
	@echo ":::finishing..."
	curl "https://api.GitHub.com/repos/Tribunes/tribune-doc-viewer/statuses/$(GIT_COMMIT)?access_token=$(GITHUB_TOKEN)" \
		--silent --output /dev/null \
		-H "Content-Type: application/json" \
		-X POST \
		-d "{\"state\": \"failure\", \"context\": \"continuous-integration/jenkins\", \"description\": \"Jenkins\", \"target_url\": \"${BUILD_URL}console\"}"

after:
	@echo ":::finishing.."
	make stop-container --ignore-errors

test:
	@echo ":::running tests.."

build:
	@echo ":::building image.."
	docker build --rm -t $(NAME):$(HASH) .

stop-container:
	docker stop $(NAME)$(HASH)
	docker rm $(NAME)$(HASH)
	docker rmi $(NAME):$(HASH)

run:
	@echo ":::running dev environment.."
	docker run --rm -d --name $(NAME)$(HASH) $(NAME):$(HASH)

node-build:
	@echo ":::testing npm build.."
	docker exec -i $(NAME)$(HASH) npm run build

electron-build:
	@echo ":::testing electron release build.."

lint:
	@echo ":::code linting.."
	docker exec -i $(NAME)$(HASH) npm run lint
	docker exec -i $(NAME)$(HASH) npm run lint:styles
