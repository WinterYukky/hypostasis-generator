<template>
  <svg width="100%" fill="black" viewBox="0 0 550 550">
    <back-left-bottom-cube
      :x="50"
      :y="backLeftY + 225"
      :width="200"
      :height="200"
      :base-color="baseColor"
      :accent-color="accentColor"
    ></back-left-bottom-cube>
    <back-left-top-cube
      :x="50"
      :y="backLeftY"
      :width="200"
      :height="200"
      :base-color="baseColor"
      :accent-color="accentColor"
    ></back-left-top-cube>
    <back-right-bottom-cube
      :x="275"
      :y="backRightY + 225"
      :width="200"
      :height="200"
      :base-color="baseColor"
      :accent-color="accentColor"
    ></back-right-bottom-cube>
    <back-right-top-cube
      :x="275"
      :y="backRightY"
      :width="200"
      :height="200"
      :base-color="baseColor"
      :accent-color="accentColor"
    ></back-right-top-cube>
    <core-cube :x="160" :y="200" :base-color="coreColor"></core-cube>
    <front-left-bottom-cube
      :x="0"
      :y="frontLeftY + 225"
      :width="200"
      :height="200"
      :base-color="baseColor"
      :accent-color="accentColor"
    ></front-left-bottom-cube>
    <front-left-top-cube
      :x="0"
      :y="frontLeftY"
      :width="200"
      :height="200"
      :base-color="baseColor"
      :accent-color="accentColor"
    ></front-left-top-cube>
    <front-right-bottom-cube
      :x="250"
      :y="frontRightY + 225"
      :width="200"
      :height="200"
      :base-color="baseColor"
      :accent-color="accentColor"
    ></front-right-bottom-cube>
    <front-right-top-cube
      :x="250"
      :y="frontRightY"
      :width="200"
      :height="200"
      :base-color="baseColor"
      :accent-color="accentColor"
    ></front-right-top-cube>
  </svg>
</template>

<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api'
import { useInterval } from '@vueuse/core'
import BackLeftBottomCube from './BackLeftBottomCube.vue'
import BackLeftTopCube from './BackLeftTopCube.vue'
import BackRightBottomCube from './BackRightBottomCube.vue'
import BackRightTopCube from './BackRightTopCube.vue'
import FrontLeftBottomCube from './FrontLeftBottomCube.vue'
import FrontLeftTopCube from './FrontLeftTopCube.vue'
import FrontRightBottomCube from './FrontRightBottomCube.vue'
import FrontRightTopCube from './FrontRightTopCube.vue'
import CoreCube from './CoreCube.vue'
import { Color } from '@/@types/ColorPicker'

interface FloatingOption {
  max: number
  interval: number
}

export default defineComponent({
  components: {
    FrontRightTopCube,
    FrontLeftBottomCube,
    FrontRightBottomCube,
    FrontLeftTopCube,
    BackRightTopCube,
    BackRightBottomCube,
    BackLeftBottomCube,
    BackLeftTopCube,
    CoreCube,
  },
  props: {
    color: {
      type: Object as () => Color,
      required: true,
    },
  },
  setup(props) {
    const useFloating = (value: number, option: Partial<FloatingOption>) => {
      const parameter: FloatingOption = {
        max: option.max || 100,
        interval: option.interval || 10,
      }
      const rawCounter = useInterval(parameter.interval)
      const counter = computed(() => rawCounter.value / 10)
      return computed(() =>
        counter.value % parameter.max < parameter.max / 2
          ? value + (counter.value % parameter.max)
          : value + (parameter.max - (counter.value % parameter.max))
      )
    }
    const frontRightY = useFloating(100, { max: 35 })
    const frontLeftY = useFloating(100, { max: 35 })
    const backRightY = useFloating(0, { max: 35 })
    const backLeftY = useFloating(0, { max: 35 })
    return {
      frontRightY,
      frontLeftY,
      backRightY,
      backLeftY,
      baseColor: computed(() => {
        const rgba = {
          r: props.color.rgba.r / 4,
          g: props.color.rgba.g / 4,
          b: props.color.rgba.b / 4,
          a: props.color.rgba.a,
        }
        return `rgba(${rgba.r},${rgba.g},${rgba.b},${rgba.a})`
      }),
      coreColor: computed(() => {
        const rgba = {
          r: props.color.rgba.r + (255 - props.color.rgba.r) / 4,
          g: props.color.rgba.g + (255 - props.color.rgba.g) / 4,
          b: props.color.rgba.b + (255 - props.color.rgba.b) / 4,
          a: props.color.rgba.a,
        }
        return `rgba(${rgba.r},${rgba.g},${rgba.b},${rgba.a})`
      }),
      accentColor: computed(() => {
        return `rgba(${props.color.rgba.r},${props.color.rgba.g},${props.color.rgba.b},${props.color.rgba.a})`
      }),
    }
  },
})
</script>
