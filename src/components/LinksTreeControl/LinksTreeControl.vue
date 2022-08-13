<template>
    <div class="treeSettings">
        <ScaleSlider />
        <DisplayDepthInput style="margin-left: 30px;" />
    </div>
    <Viewport style="margin-top: 20px;" />
</template>



<script>
import Viewport from './Viewport.vue'
import ScaleSlider from './ScaleSlider.vue'
import DisplayDepthInput from './DisplayDepthInput.vue'

export default {
    components: { Viewport, ScaleSlider, DisplayDepthInput },
}
</script>

<style scoped>
.treeSettings{
    display: flex;
    align-items: center;
}

</style>




