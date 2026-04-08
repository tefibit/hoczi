database-init:
	cargo install sqlx-cli --no-default-features --features native-tls,postgres
database-create:
	echo hello
install:
	cargo add actix-web
	cargo add actix-cors
	cargo add async-trait
	cargo add serde_json
	cargo add dotenvy
	cargo add env_logger
	cargo add log
	cargo add str_slug
	cargo add rand
	cargo add futures-util
	cargo add jsonwebtoken
	cargo add lazy_static
	cargo add dotenv
	cargo add actix-web-lab
	cargo add sha256
	cargo add chrono --features serde
	cargo add serde --features derive
	carto add sqlx --features runtime-tokio,postgres,chrono
	
run-payment:
	cargo run -p payment-service
run-trading:
	cargo run -p trading-service

build-payment:
	cargo build --release -p payment-service
build-trading:
	cargo build --release -p trading-service

watch:
	cargo watch -x run

clean:
	@echo "🧹 Deleting .DS_Store and ._* files..."
	@find . -type f \( -name ".DS_Store" -o -name "._*" \) -print -delete