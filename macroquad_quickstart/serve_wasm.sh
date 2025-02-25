set -e

./build_wasm.sh
cd web
simple-http-server --index -p ${PORT:=5577} .
