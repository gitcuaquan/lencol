<template>
    <div>
        <canvas ref="threeCanvas"></canvas>
    </div>
</template>

<script setup lang="ts">
import Three from '~~/model/Three';

const threeCanvas = ref()
onMounted(() => {
    new Three(threeCanvas.value)
})
</script>

<style scoped>

</style>