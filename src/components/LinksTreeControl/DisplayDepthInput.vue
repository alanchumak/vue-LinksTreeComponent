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
    data() {
        return { value: store.displayDepth } // limit max
    },
    methods: {
        onChange(e){
            // store.arrows.forEach(line=>line.remove())
            store.displayDepthChanged(e.target.value)
            // this.initArrows(store.data)
            // for (let line of store.arrows)
            //     console.log(line)
        },
        initArrows(node, graphHeight = 0) { // при монтировании?
            // links.push(<Link link={node} />)
            if (graphHeight + 1 > store.displayDepth)
                return store.arrows
            for (let child of node.children) {
                let startElement = document.getElementById(node.id)
                let endElement = document.getElementById(child.id)
                let options = {
                    color: '#6895e5',
                    path: 'straight',
                    startSocket: 'bottom',
                    endSocket: 'top'
                }
                let line = LeaderLine.setLine(startElement, endElement, options)
                // LeaderLine.positionByWindowResize = false
                store.arrows.push(line)
                this.initArrows(child, graphHeight + 1)
            }

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