#[cfg(not(target_family = "wasm"))]
use directories::ProjectDirs;

#[cfg(not(target_family = "wasm"))]
/// returns the ProjectDirs struct from the directories crate with the proper identifier for the
/// game
pub fn project_dirs() -> ProjectDirs {
    ProjectDirs::from("com", "yourname", "yourgame").unwrap()
}
