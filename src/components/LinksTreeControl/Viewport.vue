<template>
    <div class="viewport" :style="style">
        <Link v-for="item in links" :key="item.id" :link="item" />
    </div>
</template>

<style scoped>
.viewport {
    position: relative;
}

</style>

<script>
import store from './store'
import Link, { nodeSize } from './Link.vue'
import LeaderLine from 'leader-line-vue'



export default {
    components:{Link},
    computed: {
        links(){
            let links = []
            
            const init = (node, graphHeight = 0) => { // при монтировании?
                links.push(node)
                if (graphHeight + 1 > store.displayDepth)
                    return
                for (let child of node.children) {
                    // arrows.push(<Arrow parentId={node.id} childId={child.id} />)
                    init(child, graphHeight + 1)
                }
                // initArrows()
            }

            init(store.data)
            // initArrows(store.data)
            return links
        },
        size(){
            let points = Object.values(store.linkCoordinates);
            let y_coords = points.map(p=>p.y)
            let x_coords = points.map(p => p.x)
            let height = Math.max(...y_coords) + nodeSize.height + 3 
            let width = Math.max(...x_coords) + nodeSize.width + 3
            return {width, height } 
        },
        style(){
            return {
                    width: this.size.width + 'px',
                    height: this.size.height + 'px',
                }
        },
    },
    mounted() {
        this.initArrows(store.data)
    },
    updated(){
        // initArrows(store.data)
        this.arrows.forEach(line => line.position())
    },
    data(){
        return {
            arrows: []
        }
    },
    methods: {
         initArrows(node, graphHeight = 0){ // при монтировании?
    // links.push(<Link link={node} />)
    if (graphHeight + 1 > store.displayDepth)
        return this.arrows
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
        this.arrows.push(line)
        this.initArrows(child, graphHeight + 1)
    }

    }
    }
}

// function initArrows (node, graphHeight = 0){ // при монтировании?
//     // links.push(<Link link={node} />)
//     if (graphHeight + 1 > store.displayDepth)
//         return arrows
//     for (let child of node.children) {
//         let startElement = document.getElementById(node.id)
//         let endElement = document.getElementById(child.id)
//         let options = {
//             color: '#6895e5',
//             path: 'straight',
//             startSocket: 'bottom',
//             endSocket: 'top'
//         }
//         let line = LeaderLine.setLine(startElement, endElement, options)
//         // LeaderLine.positionByWindowResize = false
//         arrows.push(line)
//         initArrows(child, graphHeight + 1)
//     }

    

</script>