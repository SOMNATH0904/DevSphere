# Macroquad Quickstart

Opinionated template for buiding games in Rust with Macroquad, specfically focused on targeting the web and PC.

🚨 work in progress, automation shell scripts target on Linux & macOS currently 🚨

## Features / Bugs

- gamepad support for desktop and web
- scripts for generating cross-platform builds
- game settings
- easy save data (supports web too!)
- draws to a 1280x720 render target by default
- generate list of open source licenses for used crates
- helpful utility functions
- shell scripts for doing pretty much everything (they don't work on Windows, sorry)
- easily push your game to itch.io

## Get Started

Use the template feature on GitHub or just [download the zip](https://github.com/brettchalupa/macroquad_quickstart/archive/refs/heads/main.zip).

## Dev Tools

In debug builds, <kbd>Shift</kbd> + <kbd>Esc</kbd> quits quickly.

## Dev Notes

- Run `./serve_wasm.sh` to boot a web server (run `./deps.sh` first) and then `./build_wasm.sh` to update the WASM build
- the JS shims in web are explicitly checked in in case the hosted versions disappear & to have versions match

## Deployment

### Web

WASM builds can be built and pushed by running:

```console
./release_wasm.sh
```

Ideally in the future this would push builds for desktop operating systems, create tags, etc., but this works for development.

### macOS

macOS uses [cargo bundle](https://github.com/burtonageo/cargo-bundle):

1. Install cargo bundle: `cargo install cargo-bundle`
2. Build the bundle: `cargo bundle --release`

There's a `release_macos.sh` script to build and upload a Universal app for macOS (works on both Intel and Apple Silicon Macs).

### Windows

Not ideal but functioning

1. `cargo run --release`
2. `mkdir win`
3. `cp .\target\release\sokoworld.exe .\win\`
4. copy the assets folder into the `win` dir
5. zip it up
6. upload it to itch.io manually

### Linux

Run the script:

```console
./release_linux.sh
```

## License

The Macroquad Quickstart template code and assets are released into the Public Domain.
