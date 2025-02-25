#[cfg(not(target_family = "wasm"))]
use crate::dir;
use serde::{Deserialize, Serialize};
#[cfg(not(target_family = "wasm"))]
use std::path::PathBuf;

use crate::consts::VERSION;

/// game completion progress
#[derive(Debug, Deserialize, Serialize)]
pub struct Save {
    game_version: String,
}

#[cfg(not(target_family = "wasm"))]
const SAVE_FILE: &str = "save.ron";

#[cfg(target_family = "wasm")]
const WASM_SAVE_KEY: &str = "save";

impl Default for Save {
    fn default() -> Self {
        Self {
            game_version: VERSION.to_string(),
        }
    }
}

impl Save {
    /// loads the save file from disk; if it doesn't exist, instantiates a new one and saves it
    pub fn load() -> Self {
        #[cfg(target_family = "wasm")]
        let save = Self::load_wasm();

        #[cfg(not(target_family = "wasm"))]
        let save = Self::load_desktop();
        save.save();

        save
    }

    #[cfg(not(target_family = "wasm"))]
    fn load_desktop() -> Self {
        let save_path = Self::determine_save_path();

        if save_path.exists() {
            let toml_str = std::fs::read_to_string(save_path).expect("couldn't read save file");
            let save: Save = ron::from_str(toml_str.as_str()).unwrap();
            save
        } else {
            Self::default()
        }
    }

    #[cfg(not(target_family = "wasm"))]
    fn determine_save_path() -> PathBuf {
        let project_dirs = dir::project_dirs();
        let save_dir = project_dirs.data_local_dir();
        std::fs::create_dir_all(save_dir).unwrap();
        let mut save_path = PathBuf::from(save_dir);
        save_path.push(SAVE_FILE);
        save_path
    }

    #[cfg(target_family = "wasm")]
    fn load_wasm() -> Self {
        let mut save = Self::default();
        let storage = &mut quad_storage::STORAGE.lock().unwrap();
        if let Some(wasm_save) = storage.get(WASM_SAVE_KEY) {
            save = ron::from_str(wasm_save.as_str()).unwrap();
        }
        save
    }

    /// writes the save to local storage
    #[cfg(target_family = "wasm")]
    fn save(&self) {
        let storage = &mut quad_storage::STORAGE.lock().unwrap();
        storage.set(WASM_SAVE_KEY, &self.to_ron_string().as_str());
    }

    #[cfg(not(target_family = "wasm"))]
    /// writes the save to disk
    fn save(&self) {
        std::fs::write(Self::determine_save_path(), self.to_ron_string())
            .expect("unable to write save file");
    }

    /// returns the save data in RON format as a pretty string
    fn to_ron_string(&self) -> String {
        ron::ser::to_string_pretty(self, ron::ser::PrettyConfig::default()).unwrap()
    }
}
