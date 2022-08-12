<template>
    <div class="treeSettings">
        <ScaleSlider />
        <!-- <DisplayDepthInput style="margin-left: 30px;" /> -->
    </div>
    <Viewport style="margin-top: 20px;" />
</template>



<script>
import Viewport from './Viewport.vue'
import ScaleSlider from './ScaleSlider.vue'
import store from './store'
import DisplayDepthInput from './DisplayDepthInput.vue'

export default {
    components: { Viewport, ScaleSlider, DisplayDepthInput },
    data(){
        return { displayDepth: store.displayDepth }
    }
}
</script>

<style scoped>


.treeSettings{
    display: flex;
}

</style>




