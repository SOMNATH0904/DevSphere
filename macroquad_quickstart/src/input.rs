use gamepads::Gamepads;
use macroquad::input::KeyCode;
use macroquad::input::{is_key_down, is_key_pressed};

pub enum Action {
    /// move up (player, menu, etc.)
    Up,
    /// move down (player, menu, etc.)
    Down,
    /// move left (player, menu, etc.)
    Left,
    /// move  right (player, menu, etc.)
    Right,
    /// select the menu option or prompt to continue
    Confirm,
    /// go back in the menu
    Cancel,
    /// reset the level to the starting positions
    Reset,
    /// go back a move
    Rewind,
    /// the gameplay and bring up a menu
    Pause,
}

/// just pressed, not held down
pub fn action_pressed(action: Action, gamepads: &Gamepads) -> bool {
    keyboard_pressed(&action) || gamepad_pressed(&action, gamepads)
}

/// held down for multiple frames
pub fn action_down(action: Action, gamepads: &Gamepads) -> bool {
    keyboard_down(&action) || gamepad_down(&action, gamepads)
}

fn keyboard_pressed(action: &Action) -> bool {
    match action {
        Action::Up => is_key_pressed(KeyCode::W) || is_key_pressed(KeyCode::Up),
        Action::Down => is_key_pressed(KeyCode::S) || is_key_pressed(KeyCode::Down),
        Action::Left => is_key_pressed(KeyCode::A) || is_key_pressed(KeyCode::Left),
        Action::Right => is_key_pressed(KeyCode::D) || is_key_pressed(KeyCode::Right),
        Action::Rewind => is_key_pressed(KeyCode::K) || is_key_pressed(KeyCode::X),
        Action::Reset => is_key_pressed(KeyCode::L) || is_key_pressed(KeyCode::C),
        Action::Confirm => is_key_pressed(KeyCode::J) || is_key_pressed(KeyCode::Z),
        Action::Cancel => is_key_pressed(KeyCode::K) || is_key_pressed(KeyCode::X),
        Action::Pause => is_key_pressed(KeyCode::Escape) || is_key_pressed(KeyCode::P),
    }
}

fn keyboard_down(action: &Action) -> bool {
    match action {
        Action::Up => is_key_down(KeyCode::W) || is_key_down(KeyCode::Up),
        Action::Down => is_key_down(KeyCode::S) || is_key_down(KeyCode::Down),
        Action::Left => is_key_down(KeyCode::A) || is_key_down(KeyCode::Left),
        Action::Right => is_key_down(KeyCode::D) || is_key_down(KeyCode::Right),
        Action::Reset => is_key_down(KeyCode::L) || is_key_down(KeyCode::C),
        Action::Rewind => is_key_down(KeyCode::K) || is_key_down(KeyCode::X),
        Action::Confirm => is_key_down(KeyCode::J) || is_key_down(KeyCode::Z),
        Action::Cancel => is_key_down(KeyCode::K) || is_key_down(KeyCode::X),
        Action::Pause => is_key_down(KeyCode::Escape) || is_key_down(KeyCode::P),
    }
}

/// checks the action for any of the connected gamepads
fn gamepad_pressed(action: &Action, gamepads: &Gamepads) -> bool {
    match action {
        Action::Up => gamepads
            .all()
            .any(|g| g.is_just_pressed(gamepads::Button::DPadUp)),
        Action::Down => gamepads
            .all()
            .any(|g| g.is_just_pressed(gamepads::Button::DPadDown)),
        Action::Left => gamepads
            .all()
            .any(|g| g.is_just_pressed(gamepads::Button::DPadLeft)),
        Action::Right => gamepads
            .all()
            .any(|g| g.is_just_pressed(gamepads::Button::DPadRight)),
        Action::Confirm => gamepads
            .all()
            .any(|g| g.is_just_pressed(gamepads::Button::ActionDown)),
        Action::Cancel => gamepads
            .all()
            .any(|g| g.is_just_pressed(gamepads::Button::ActionRight)),
        Action::Rewind => gamepads
            .all()
            .any(|g| g.is_just_pressed(gamepads::Button::ActionLeft)),
        Action::Reset => gamepads
            .all()
            .any(|g| g.is_just_pressed(gamepads::Button::ActionUp)),
        Action::Pause => gamepads
            .all()
            .any(|g| g.is_just_pressed(gamepads::Button::RightCenterCluster)),
    }
}

/// checks the action for any of the connected gamepads
fn gamepad_down(action: &Action, gamepads: &Gamepads) -> bool {
    match action {
        Action::Up => gamepads
            .all()
            .any(|g| g.is_currently_pressed(gamepads::Button::DPadUp)),
        Action::Down => gamepads
            .all()
            .any(|g| g.is_currently_pressed(gamepads::Button::DPadDown)),
        Action::Left => gamepads
            .all()
            .any(|g| g.is_currently_pressed(gamepads::Button::DPadLeft)),
        Action::Right => gamepads
            .all()
            .any(|g| g.is_currently_pressed(gamepads::Button::DPadRight)),
        Action::Confirm => gamepads
            .all()
            .any(|g| g.is_currently_pressed(gamepads::Button::ActionDown)),
        Action::Cancel => gamepads
            .all()
            .any(|g| g.is_currently_pressed(gamepads::Button::ActionRight)),
        Action::Rewind => gamepads
            .all()
            .any(|g| g.is_currently_pressed(gamepads::Button::ActionLeft)),
        Action::Reset => gamepads
            .all()
            .any(|g| g.is_currently_pressed(gamepads::Button::ActionUp)),
        Action::Pause => gamepads
            .all()
            .any(|g| g.is_currently_pressed(gamepads::Button::RightCenterCluster)),
    }
}
