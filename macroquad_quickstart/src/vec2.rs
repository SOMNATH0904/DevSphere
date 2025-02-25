#[derive(Debug, Clone, Copy)]
pub struct Vec2 {
    pub x: i32,
    pub y: i32,
}

impl PartialEq for Vec2 {
    fn eq(&self, other: &Self) -> bool {
        self.x == other.x && self.y == other.y
    }
}

impl Vec2 {
    pub fn add(&mut self, vec: Vec2) -> &mut Vec2 {
        self.x += vec.x;
        self.y += vec.y;
        self
    }

    pub fn is_zero(&self) -> bool {
        self.x == 0 && self.y == 0
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_is_zero() {
        assert!(Vec2 { x: 0, y: 0 }.is_zero());
        assert!(!Vec2 { x: 1, y: 0 }.is_zero());
    }
}
