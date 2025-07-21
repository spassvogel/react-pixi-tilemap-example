/**
 * In Tiled, the highest 3 bits of the 32-bit gid are used for tile flipping flags (horizontal, vertical, diagonal).
 * The lower 29 bits represent the actual tile ID.
 * 
 * @param gid 
*/
const normalizeGid = (gid: number) => {
  // gid & 0x1FFFFFFF masks out (removes) the flipping flags, leaving only the actual tile ID.
  return gid & 0x1FFFFFFF
}

export default normalizeGid