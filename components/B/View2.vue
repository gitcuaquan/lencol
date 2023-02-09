<template>
    <div class="center">
        <canvas ref="canvasBabylon"></canvas>
    </div>
</template>

<script lang="ts" setup>
import BabylonJs from '~~/model/Babylon/Babylon2';
const canvasBabylon = ref()

onMounted(() => {
    const B = new BabylonJs(canvasBabylon.value)
    B.LoadModel(['/model-font/front_base.png','/model-font/front_cap_rope.png','DAYNAMICTEXTURE','/model-font/front_texture.png'])
    window.addEventListener("export-image", (event) => {
        B.ChangeTexture(event.detail.image)
    });
})
</script>

<style scoped>
canvas {
    width: 80vw;
    height: 80vh;
}

.center {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}
</style>