set -e

rustup target add x86_64-apple-darwin
rustup target add aarch64-apple-darwin
export MACOSX_DEPLOYMENT_TARGET=11.0
cargo bundle --release
cargo build --release --target x86_64-apple-darwin
cargo build --release --target aarch64-apple-darwin
lipo "target/x86_64-apple-darwin/release/sokoworld" \
     "target/aarch64-apple-darwin/release/sokoworld" \
     -create -output "target/release/bundle/osx/SokoWorld.app/Contents/MacOS/sokoworld"
cd target/release/bundle/osx
butler push SokoWorld.app brettchalupa/sokoworld-staging:mac
