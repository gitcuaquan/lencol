<template>
    <div class="container-fluid px-0">
        <div class="row g-0">
            <div class="col-lg-4 bg-success d-flex justify-content-center align-items-center" style="height: 100vh;">
                <BView2/>
            </div>
            <div class="col-lg-8 bg-white" style="height: 100vh;">
                <ClientOnly>
                    <FEdit />
                </ClientOnly>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>


</script>

<style scoped>

</style>