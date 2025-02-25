set -e
cargo fmt --check
cargo clippy --all --all-features --tests -- -D warnings
cargo test
cargo check
cargo check --release
cargo check --target wasm32-unknown-unknown
