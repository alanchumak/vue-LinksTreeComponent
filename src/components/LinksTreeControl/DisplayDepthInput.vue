<template>
    <label>Глубина дерева:
        <input 
            type="number" 
            min=1 
            :value="value" 
            @change="onChange"
        >
    </label>
</template>


<script>
import Viewport from './Viewport.vue'
import ScaleSlider from './ScaleSlider.vue'
import store from './store'

export default {
    components: { Viewport, ScaleSlider },
    data() {
        return { value: store.displayDepth } // limit max
    },
    methods: {
        onChange(e){
            store.displayDepthChanged(e.target.value)
        }
    }
}
</script>

<style scoped>
input {
    width: 40px;
}

label {
    margin-left: 30px;
}
</style>