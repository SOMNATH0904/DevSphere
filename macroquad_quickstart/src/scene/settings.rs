use macroquad::color::{RED, WHITE};

use super::Scene;
use crate::audio::play_sfx;
use crate::consts::X_INSET;
use crate::input::action_pressed;
use crate::input::Action;
use crate::text::Size;
use crate::{context::Context, text::draw_text};

/// sub-scene for setting user preferences, at times a subscene
pub struct Settings {
    pub active: bool,
    menu_options: Vec<MenuOption>,
    menu_index: usize,
}

enum MenuOption {
    Fullscreen,
    Mute,
    Back,
}

impl Settings {
    pub fn new(_ctx: &Context, active: bool) -> Self {
        let menu_options = vec![MenuOption::Fullscreen, MenuOption::Mute, MenuOption::Back];

        Self {
            menu_options,
            menu_index: 0,
            active,
        }
    }

    fn text_for_menu_option(
        &self,
        settings: &crate::settings::Settings,
        menu_option: &MenuOption,
    ) -> String {
        match menu_option {
            MenuOption::Back => "Back".to_string(),
            MenuOption::Fullscreen => {
                format!("Fullscreen: {}", settings.is_fullscreen())
            }
            MenuOption::Mute => format!("Mute: {}", settings.is_muted()),
        }
    }
}

impl Scene for Settings {
    fn update(&mut self, ctx: &mut Context) {
        if action_pressed(Action::Cancel, &ctx.gamepads) {
            self.active = false;
            play_sfx(ctx, &ctx.audio.sfx.menu_cancel);
            return;
        }

        if action_pressed(Action::Up, &ctx.gamepads) {
            play_sfx(ctx, &ctx.audio.sfx.menu_move);

            if self.menu_index == 0 {
                self.menu_index = self.menu_options.len() - 1;
            } else {
                self.menu_index -= 1;
            }
        }
        if action_pressed(Action::Down, &ctx.gamepads) {
            play_sfx(ctx, &ctx.audio.sfx.menu_move);

            if self.menu_index == self.menu_options.len() - 1 {
                self.menu_index = 0;
            } else {
                self.menu_index += 1;
            }
        }

        if action_pressed(Action::Confirm, &ctx.gamepads) {
            play_sfx(ctx, &ctx.audio.sfx.menu_select);

            let menu_option = self
                .menu_options
                .get(self.menu_index)
                .expect("pause menu index out of bounds");
            match menu_option {
                MenuOption::Back => {
                    self.active = false;
                }
                MenuOption::Fullscreen => {
                    ctx.settings.toggle_fullscreen();
                }
                MenuOption::Mute => {
                    ctx.settings.toggle_mute();
                }
            }
        }
    }

    fn draw(&mut self, ctx: &mut Context) {
        draw_text(ctx, "Settings", X_INSET, 128., Size::Large, WHITE);

        for (i, menu_option) in self.menu_options.iter().enumerate() {
            let color = if self.menu_index == i { RED } else { WHITE };

            let text = self.text_for_menu_option(&ctx.settings, menu_option);
            draw_text(
                ctx,
                text.as_str(),
                X_INSET,
                200. + (i as f32 * 40.),
                Size::Medium,
                color,
            );
        }
    }
}
