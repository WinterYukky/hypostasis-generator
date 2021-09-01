type ColorType = 'hex' | 'hexa' | 'rgba' | 'hsla' | 'hsva'
export interface Color {
  types: ColorType[]
  type: ColorType
  alpha: 0
  hex: string
  hexa: string
  hsla: { h: number; s: number; l: number; a: number }
  hsva: { h: number; s: number; v: number; a: number }
  hue: 0
  rgba: { r: number; g: number; b: number; a: number }
}
