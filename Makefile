NAME=tribune-doc-viewer

before:
	@echo ":::starting CI/CD pipeline.."
	curl "https://api.GitHub.com/repos/Tribunes/tribune-doc-viewer/statuses/$(GIT_COMMIT)?access_token=$(GITHUB_TOKEN)" \
		-H "Content-Type: application/json" \
		-X POST \
		-d "{\"state\": \"pending\", \"context\": \"continuous-integration/jenkins\", \"description\": \"Jenkins\", \"target_url\": \"${BUILD_URL}console\"}"

post-success:
	@echo ":::finishing..."
	curl "https://api.GitHub.com/repos/Tribunes/tribune-doc-viewer/statuses/$(GIT_COMMIT)?access_token=$(GITHUB_TOKEN)" \
		-H "Content-Type: application/json" \
		-X POST \
		-d "{\"state\": \"success\", \"context\": \"continuous-integration/jenkins\", \"description\": \"Jenkins\", \"target_url\": \"${BUILD_URL}console\"}"

post-failure:
	@echo ":::finishing..."
	curl "https://api.GitHub.com/repos/Tribunes/tribune-doc-viewer/statuses/$(GIT_COMMIT)?access_token=$(GITHUB_TOKEN)" \
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
	docker build --rm -t $(NAME):$(BUILD_NUMBER) .

stop-container:
	docker stop $(NAME)
	docker rmi $(NAME):$(BUILD_NUMBER)

run:
	@echo ":::running dev environment.."
	make stop-container --ignore-errors
	docker run --rm -d --name $(NAME)$(BUILD_NUMBER) $(NAME):$(BUILD_NUMBER)

node-build:
	@echo ":::testing npm build.."
	docker exec -it $(NAME)$(BUILD_NUMBER) npm run build

electron-build:
	@echo ":::testing electron release build.."