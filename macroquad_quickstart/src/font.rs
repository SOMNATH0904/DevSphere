use std::path::Path;

use macroquad::text::{load_ttf_font, Font};

pub struct FontAtlas {
    pub regular: Font,
}

impl FontAtlas {
    pub async fn new(base_assets_path: &Path) -> Self {
        let mut regular = load_ttf_font(
            base_assets_path
                .join("Atkinson-Hyperlegible-Regular-102.ttf")
                .to_str()
                .unwrap(),
        )
        .await
        .unwrap();
        regular.set_filter(macroquad::miniquad::FilterMode::Linear);
        Self { regular }
    }
}
