use std::path::Path;

use macroquad::audio::Sound;

use crate::context::Context;

pub struct SfxAtlas {
    pub menu_cancel: Sound,
    pub menu_select: Sound,
    pub menu_move: Sound,
}
pub struct AudioAtlas {
    pub sfx: SfxAtlas,
}

impl AudioAtlas {
    pub async fn new(base_assets_path: &Path) -> Self {
        Self {
            sfx: SfxAtlas {
                menu_cancel: macroquad::audio::load_sound(
                    base_assets_path
                        .join("sfx/menuCancel.wav")
                        .to_str()
                        .unwrap(),
                )
                .await
                .unwrap(),
                menu_select: macroquad::audio::load_sound(
                    base_assets_path
                        .join("sfx/menuSelect.wav")
                        .to_str()
                        .unwrap(),
                )
                .await
                .unwrap(),
                menu_move: macroquad::audio::load_sound(
                    base_assets_path.join("sfx/menuMove.wav").to_str().unwrap(),
                )
                .await
                .unwrap(),
            },
        }
    }
}

pub fn play_sfx(ctx: &Context, sfx: &Sound) {
    if ctx.settings.is_muted() {
        return;
    }

    macroquad::audio::play_sound_once(sfx);
}
