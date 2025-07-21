const FLIPPED_HORIZONTALLY_FLAG = 0x80000000
const FLIPPED_VERTICALLY_FLAG   = 0x40000000
const FLIPPED_DIAGONALLY_FLAG   = 0x20000000

// todo: check this, its not working well!
const tiledFlagsToPixiRotate = (gid: number) => {
  const h = (gid & FLIPPED_HORIZONTALLY_FLAG) !== 0
  const v = (gid & FLIPPED_VERTICALLY_FLAG) !== 0
  const d = (gid & FLIPPED_DIAGONALLY_FLAG) !== 0

  // See: https://github.com/pixijs/pixijs/blob/dev/packages/spritesheet/src/Spritesheet.ts#L101
  if (!d) {
    if (!h && !v) return 0
    if (h && !v) return 4 // horizontal flip
    if (!h && v) return 2 // 180°
    if (h && v) return 6 // 180° + horizontal flip
  } else {
    if (!h && !v) return 1 // 90°
    if (h && !v) return 5 // 90° + horizontal flip
    if (!h && v) return 3 // 270°
    if (h && v) return 7 // 270° + horizontal flip
  }
  return 0
}

export default tiledFlagsToPixiRotate

