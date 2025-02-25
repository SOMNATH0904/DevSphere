set -e

# generate license index for all project dependencies
cargo install --locked cargo-about
cargo about generate about.hbs > licenses.html
cargo about generate about-md.hbs > licenses.md
