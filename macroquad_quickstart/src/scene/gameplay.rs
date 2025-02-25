use super::pause::Pause;
use super::Scene;
use crate::audio::play_sfx;
use crate::context::Context;
use crate::input::action_pressed;
use crate::input::Action;
use crate::text::draw_text;
use macroquad::color::WHITE;
use macroquad::texture::draw_texture;

pub struct Gameplay {
    pause_subscene: Pause,
}

impl Scene for Gameplay {
    fn update(&mut self, ctx: &mut Context) {
        if self.pause_subscene.active {
            self.pause_subscene.update(ctx);
        } else if action_pressed(Action::Pause, &ctx.gamepads) {
            self.pause_subscene.active = true;
            play_sfx(ctx, &ctx.audio.sfx.menu_select);
        }
    }

    fn draw(&mut self, ctx: &mut Context) {
        if self.pause_subscene.active {
            self.pause_subscene.draw(ctx);
        } else {
            draw_texture(&ctx.textures.example, 400., 300., WHITE);
            draw_text(
                ctx,
                "Gameplay!",
                100.,
                100.,
                crate::text::Size::Medium,
                WHITE,
            );
        }
    }
}

impl Gameplay {
    pub async fn new(ctx: &mut Context) -> Self {
        let pause_subscene = Pause::new(ctx);
        Self { pause_subscene }
    }
}
