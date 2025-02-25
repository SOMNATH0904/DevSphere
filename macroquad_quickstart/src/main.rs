#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use macroquad::prelude::*;
use miniquad::conf::Icon;
use yourgame::consts::*;
use yourgame::context::Context;
use yourgame::scene::gameplay::Gameplay;
use yourgame::scene::EScene;
use yourgame::scene::{main_menu::MainMenu, Scene};

fn window_conf() -> Conf {
    Conf {
        fullscreen: false,
        high_dpi: true,
        icon: Some(Icon {
            small: include_bytes!("../icons/16x16.rgba").to_owned(),
            medium: include_bytes!("../icons/32x32.rgba").to_owned(),
            big: include_bytes!("../icons/64x64.rgba").to_owned(),
        }),
        platform: miniquad::conf::Platform {
            linux_backend: miniquad::conf::LinuxBackend::WaylandWithX11Fallback,
            ..Default::default()
        },
        window_height: 720,
        window_resizable: true,
        window_title: String::from(PKG_NAME),
        window_width: 1280,
        ..Default::default()
    }
}

#[macroquad::main(window_conf)]
async fn main() {
    let mut ctx = Context {
        ..Context::default().await
    };

    let mut current_scene: Box<dyn Scene> = Box::new(MainMenu::new(&mut ctx).await);

    loop {
        ///////// UPDATE
        #[cfg(debug_assertions)]
        if (is_key_down(KeyCode::LeftShift) || is_key_down(KeyCode::RightShift))
            && is_key_down(KeyCode::Escape)
        {
            ctx.request_quit = true;
        }

        ctx.gamepads.poll();
        current_scene.update(&mut ctx);

        ///////// DRAW

        // render target drawing
        set_camera(&ctx.render_target_cam);
        clear_background(yourgame::color::DARKGRAY);
        current_scene.draw(&mut ctx);

        // regular drawing
        set_default_camera();
        clear_background(yourgame::color::DARKGRAY); // Will be the letterbox color

        // draw the render target properly scaled and letterboxed
        let scale: f32 = f32::min(
            screen_width() / VIRTUAL_WIDTH,
            screen_height() / VIRTUAL_HEIGHT,
        );
        draw_texture_ex(
            &ctx.render_target.texture,
            (screen_width() - (VIRTUAL_WIDTH * scale)) * 0.5,
            (screen_height() - (VIRTUAL_HEIGHT * scale)) * 0.5,
            WHITE,
            DrawTextureParams {
                dest_size: Some(vec2(VIRTUAL_WIDTH * scale, VIRTUAL_HEIGHT * scale)),
                flip_y: true, // Must flip y otherwise 'render_target' will be upside down
                ..Default::default()
            },
        );

        if ctx.request_quit {
            break;
        }

        if let Some(escene) = ctx.switch_scene_to.take() {
            current_scene = match escene {
                EScene::MainMenu => Box::new(MainMenu::new(&mut ctx).await),
                EScene::Gameplay => Box::new(Gameplay::new(&mut ctx).await),
            };
        }

        next_frame().await
    }
}
