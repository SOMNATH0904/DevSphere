set -e

cargo build --target wasm32-unknown-unknown
cp target/wasm32-unknown-unknown/debug/sokoworld.wasm web
mkdir -p web/assets
cp -r assets/* web/assets
