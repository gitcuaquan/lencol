<template>
    <div ref="container" class="fabricWapper">
        <canvas ref="canvasFabric"></canvas>
        <div style="display:none">
            <canvas ref="canvasFabricExport"></canvas>
        </div>
    </div>
</template>

<script setup lang="ts">
import Fabric, { MyCustomEvent } from '~~/model/Fabric/Fabric';


const container = ref()
const canvasFabric = ref()
const canvasFabricExport = ref()

onMounted(() => {
    const F = new Fabric(canvasFabric.value, container.value, canvasFabricExport.value)
    F.LoadImageByUrl('/img/anh.jpeg')
    F.LoadMask('/mask/font.png')
    F.SetOverlayImage('/overlay/front.png')
})
</script>

<style scoped>
.fabricWapper {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>