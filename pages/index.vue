<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="10" md="8" xl="6">
      <hypostasis ref="hypostasis" :color="initColor"></hypostasis>
    </v-col>
    <v-col cols="12" md="4">
      <v-color-picker v-model="initColor"></v-color-picker>
      <v-btn @click="share()">シェア</v-btn>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import { Color } from '~/@types/ColorPicker'
import Hypostasis from '~/components/hypostasis/Hypostasis.vue'

declare global {
  interface ShareData {
    files: File[]
  }
}

export default defineComponent({
  components: {
    Hypostasis,
  },
  setup() {
    const initColor = ref<Partial<Color>>({
      rgba: { r: 255, g: 255, b: 255, a: 1 },
    })
    const hypostasis = ref<Vue>()
    const svgToImage = (svg: string) => {
      const image = new Image()
      return new Promise<HTMLImageElement>((resolve) => {
        image.onload = () => resolve(image)
        image.src = 'data:image/svg+xml;charset=utf-8;base64,' + btoa(svg)
      })
    }
    const share = async () => {
      if (!hypostasis.value) return
      const svg = new XMLSerializer().serializeToString(hypostasis.value.$el)
      const image = await svgToImage(svg)
      const canvas = document.createElement('canvas')
      canvas.width = hypostasis.value.$el.clientWidth
      canvas.height = hypostasis.value.$el.clientHeight
      const context = canvas.getContext('2d')
      if (!context) return
      context.drawImage(image, 0, 0)
      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, 'image/png')
      )
      if (!blob) return
      navigator.share({
        text: '無相の〇〇を作ったよ！ #無相ジェネレーター',
        url: 'https://hypostasis-generator.vercel.app',
        files: [new File([blob], 'hypostasis.png', { type: blob.type })],
      })
    }

    return {
      initColor,
      hypostasis,
      share,
    }
  },
})
</script>
