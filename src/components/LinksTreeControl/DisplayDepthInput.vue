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
import store from './store'

export default {
    data() {
        return { value: store.displayDepth } // limit max
    },
    methods: {
        onChange(e){
            store.displayDepthChanged(e.target.value)
        },
       
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