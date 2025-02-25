set -e

rm linux-release.zip || true
rm -rf linux-release
mkdir -p linux-release
cargo build --release
cp target/release/sokoworld linux-release
mkdir -p linux-release/assets
cp -r assets/* linux-release/assets
rm -rf linux-release/**/.DS_Store
rm -rf linux-release/**/*/.DS_Store
zip -r linux-release.zip linux-release
echo "linux release zipped into linux-release.zip"
butler push linux-release.zip brettchalupa/sokoworld-staging:linux
