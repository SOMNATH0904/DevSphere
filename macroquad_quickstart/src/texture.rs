use std::path::Path;

use macroquad::texture::{load_texture, Texture2D};

pub struct TextureAtlas {
    pub example: Texture2D,
}

impl TextureAtlas {
    pub async fn new(base_assets_path: &Path) -> Self {
        let example = load_texture(
            base_assets_path
                .join("sprites/example.png")
                .to_str()
                .unwrap(),
        )
        .await
        .unwrap();
        example.set_filter(macroquad::miniquad::FilterMode::Nearest);
        Self { example }
    }
}
