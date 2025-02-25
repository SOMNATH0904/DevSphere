use macroquad::color::{RED, WHITE};

use super::Scene;
use crate::audio::play_sfx;
use crate::consts::TITLE_Y_INSET;
use crate::consts::VIRTUAL_HEIGHT;
use crate::consts::X_INSET;
use crate::input::action_pressed;
use crate::input::Action;
use crate::text::Size;
use crate::{context::Context, text::draw_text};

/// sub-scene for displaying who worked on the game
pub struct Credits {
    pub active: bool,
}
impl Credits {
    pub fn new(_ctx: &Context) -> Self {
        Self { active: false }
    }
}

impl Scene for Credits {
    fn update(&mut self, ctx: &mut Context) {
        if action_pressed(Action::Cancel, &ctx.gamepads)
            || action_pressed(Action::Confirm, &ctx.gamepads)
        {
            play_sfx(ctx, &ctx.audio.sfx.menu_cancel);
            self.active = false;
        }
    }

    fn draw(&mut self, ctx: &mut Context) {
        draw_text(ctx, "Credits", X_INSET, TITLE_Y_INSET, Size::Large, WHITE);

        draw_text(ctx, "Game by Your Name!", X_INSET, 240., Size::Small, WHITE);

        draw_text(
            ctx,
            "Press Z or X to return",
            X_INSET,
            VIRTUAL_HEIGHT - 120.,
            Size::Medium,
            RED,
        );
    }
}
