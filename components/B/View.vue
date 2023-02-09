<template>
    <div class="center" >
        <canvas ref="canvasBabylon"></canvas>
    </div>
</template>

<script lang="ts" setup>
import Babylon from '~~/model/Babylon/Babylon'; 
const canvasBabylon = ref()
onMounted(() => {
    const B =  new Babylon(canvasBabylon.value)
    B.loadTexture()
})
</script>

<style scoped>
    canvas{
        width: 80vw;
        height: 80vh;
    }
    .center{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
    }
</style>