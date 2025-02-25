set -e

# makes a release zip of the game for distribution

rm web-release.zip || true
rm -rf web-release
mkdir -p web-release
cargo build --release --target wasm32-unknown-unknown
cp target/wasm32-unknown-unknown/release/sokoworld.wasm web-release
cp web/*js web-release
cp web/index.html web-release
mkdir -p web-release/assets
cp -r assets/* web-release/assets
rm -rf web-release/**/.DS_Store
rm -rf web-release/**/*/.DS_Store
zip -r web-release.zip web-release
echo "web release zipped into web-release.zip"
butler push web-release.zip brettchalupa/sokoworld-staging:html
