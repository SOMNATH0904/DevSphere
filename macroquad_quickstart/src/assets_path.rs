#[cfg(not(target_family = "wasm"))]
use std::env::current_exe;
use std::path::PathBuf;

pub const ASSETS_DIR: &str = "assets";

/// Returns the PathBuf to the assets folder root
///
/// "intelligently" determines which path the assets dir is located at based on a few different
/// aspects, in this order:
/// 1. are we running from Cargo where the assets are in the CARGO_MANIFEST_DIR?
/// 2. are we running from a build where assets are next to the binary?
/// 3. are we in a MacOS .app bundle where the assets are in `../Resources/assets`?
///
/// For Windows and Linux releases, it'll be #2. For macOS releases it'll be #3.
///
/// WASM does not do anything special.
///
/// Panics if it cannot determine a valid assets dir
#[cfg(not(target_family = "wasm"))]
pub fn determine_asset_path() -> PathBuf {
    // try to find assets dir in cargo project root
    match std::env::var("CARGO_MANIFEST_DIR") {
        Ok(cargo_manifest_dir) => {
            let mut cargo_path = PathBuf::new();
            cargo_path.push(cargo_manifest_dir);
            cargo_path.push(ASSETS_DIR);
            return cargo_path;
        }
        Err(_e) => (), // proceed to attempt next way
    }

    match current_exe() {
        Ok(exe_path) => {
            // try to find assets dir located next to the executable
            let mut sibling_path = exe_path.clone();
            sibling_path.pop();
            sibling_path.push(ASSETS_DIR);
            if sibling_path.is_dir() {
                return sibling_path;
            } else {
                // try to find assets dir in MacOS bundle (Some.app/Contents/Resources/assets)
                let mut macos_app_path = exe_path.clone();
                macos_app_path.pop();
                macos_app_path.pop();
                macos_app_path.push("Resources");
                macos_app_path.push(ASSETS_DIR);
                if macos_app_path.is_dir() {
                    return macos_app_path;
                }
            }
        }
        Err(_e) => (),
    }
    panic!("asset path cannot be determined")
}

#[cfg(target_family = "wasm")]
pub fn determine_asset_path() -> PathBuf {
    PathBuf::from(r"assets")
}
