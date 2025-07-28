export type Rapier = typeof import('@dimforge/rapier2d')

export function getRapier() {
  return import('@dimforge/rapier2d')
}