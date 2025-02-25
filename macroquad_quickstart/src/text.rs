/// how large to draw the text
pub enum Size {
    Small,
    Medium,
    Large,
}

use macroquad::color::Color;
use macroquad::text::{draw_text_ex, TextParams};

use crate::context::Context;

/// draw the text to the screen, simpler API than Macroquad's with a default font and enum for size
pub fn draw_text(ctx: &mut Context, text: &str, x: f32, y: f32, size: Size, color: Color) {
    draw_text_ex(
        text,
        x,
        y,
        TextParams {
            font_size: text_size(size),
            font: Some(&ctx.fonts.regular),
            color,
            ..Default::default()
        },
    );
}

fn text_size(size: Size) -> u16 {
    match size {
        Size::Small => 20u16,
        Size::Medium => 32u16,
        Size::Large => 48u16,
    }
}
