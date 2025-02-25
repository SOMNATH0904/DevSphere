use super::credits::Credits;
use super::settings::Settings;
use super::{EScene, Scene};
use crate::audio::play_sfx;
use crate::consts::*;
use crate::context::Context;
use crate::input::{action_pressed, Action};
use crate::text::{self, draw_text};
use macroquad::color::{RED, WHITE};

pub struct MainMenu {
    menu_options: Vec<MenuOption>,
    menu_index: usize,
    settings_subscene: Settings,
    credits_subscene: Credits,
}

enum MenuOption {
    Play,
    Settings,
    Credits,
    #[cfg(not(target_family = "wasm"))]
    Quit,
}

impl MainMenu {
    pub async fn new(ctx: &mut Context) -> Self {
        let menu_options = vec![
            MenuOption::Play,
            MenuOption::Settings,
            MenuOption::Credits,
            #[cfg(not(target_family = "wasm"))]
            MenuOption::Quit,
        ];

        Self {
            menu_options,
            menu_index: 0,
            settings_subscene: Settings::new(ctx, false),
            credits_subscene: Credits::new(ctx),
        }
    }

    fn text_for_menu_option(&self, menu_option: &MenuOption) -> &str {
        match menu_option {
            MenuOption::Play => "Play",
            MenuOption::Settings => "Settings",
            MenuOption::Credits => "Credits",
            #[cfg(not(target_family = "wasm"))]
            MenuOption::Quit => "Quit",
        }
    }
}

impl Scene for MainMenu {
    fn update(&mut self, ctx: &mut Context) {
        if self.settings_subscene.active {
            self.settings_subscene.update(ctx);
            return;
        }

        if self.credits_subscene.active {
            self.credits_subscene.update(ctx);
            return;
        }

        let menu_option = self
            .menu_options
            .get(self.menu_index)
            .expect("pause menu index out of bounds");

        if action_pressed(Action::Confirm, &ctx.gamepads) {
            play_sfx(ctx, &ctx.audio.sfx.menu_select);

            match menu_option {
                MenuOption::Play => {
                    ctx.switch_scene_to = Some(EScene::Gameplay);
                }
                MenuOption::Settings => {
                    self.settings_subscene.active = true;
                }
                MenuOption::Credits => {
                    self.credits_subscene.active = true;
                }
                #[cfg(not(target_family = "wasm"))]
                MenuOption::Quit => {
                    ctx.request_quit = true;
                }
            }
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
    }
    fn draw(&mut self, ctx: &mut Context) {
        if self.settings_subscene.active {
            self.settings_subscene.draw(ctx);
            return;
        }

        if self.credits_subscene.active {
            self.credits_subscene.draw(ctx);
            return;
        }

        draw_text(
            ctx,
            crate::consts::PKG_NAME,
            X_INSET,
            TITLE_Y_INSET,
            text::Size::Large,
            WHITE,
        );

        for (i, menu_option) in self.menu_options.iter().enumerate() {
            let color = if self.menu_index == i { RED } else { WHITE };

            draw_text(
                ctx,
                self.text_for_menu_option(menu_option),
                X_INSET,
                400. + (i as f32 * 40.),
                text::Size::Medium,
                color,
            );
        }

        draw_text(
            ctx,
            "Change Select = Arrow Keys | Confirm = Z",
            X_INSET,
            VIRTUAL_HEIGHT - 40.,
            text::Size::Small,
            WHITE,
        );

        draw_text(
            ctx,
            format!("v{}", VERSION).as_str(),
            40.,
            VIRTUAL_HEIGHT - 40.,
            text::Size::Small,
            WHITE,
        );
    }
}
