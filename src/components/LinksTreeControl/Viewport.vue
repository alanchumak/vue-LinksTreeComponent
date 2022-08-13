<template>
    <div class="viewport" :style="style">
        <Link v-for="item in rects" :key="item.id" :link="item" />
    </div>
</template>


<script>
import store from './store'
import Link, { nodeSize } from './Link.vue'
import LeaderLine from 'leader-line-vue'
import { watch } from 'vue'

let arrows 

export default {
    components:{Link},
    computed: {
        rects() {
            return initRects(store.data)
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
        arrows = initArrows(store.data)
    },
    updated(){
        // at depth change
        // arrows.forEach(line => line.remove())
        // arrows = initArrows(store.data)

        // at scale change
        // let newLineSize = Math.round(4 * store.scale)
        // arrows.forEach(line => {
        //     line.size = newLineSize
        //     // line.position()
        // })

    },


setup(){
    watch(
        () => store.scale,
        (scale) => {
            let newLineSize = Math.round(4 * scale)
            arrows.forEach(line => {
                line.size = newLineSize
                line.position()
            })
        },
        {flush: 'post'}
    )

    watch(
        () => store.displayDepth,
        () => {
            arrows.forEach(line => line.remove())
            arrows = initArrows(store.data)

            let newLineSize = Math.round(4 * store.scale)
            arrows.forEach(line => {
                line.size = newLineSize
                // line.position()
            })
        },
        { flush: 'post' }
    )

}

}

function initRects(node, graphHeight = 0, rects=[]){ // при монтировании?
    // console.log(store.displayDepth)
    rects.push(node)
    if (graphHeight + 1 > store.displayDepth)
        return rects
    for (let child of node.children) {
        initRects(child, graphHeight + 1, rects)
    }
    return rects

}

function initArrows(node, graphHeight = 0, arrows=[]){ // при монтировании?
    // links.push(<Link link={node} />)
    if (graphHeight + 1 > store.displayDepth)
        // return arrows
        return arrows
    for (let child of node.children) {
        arrows.push(createLine(node.id, child.id))
        initArrows(child, graphHeight + 1, arrows)
    }
    return arrows
}

const lineOptions = {
    color: '#6895e5',
    path: 'straight',
    startSocket: 'bottom',
    endSocket: 'top'
}

function createLine(startId, endId){
    let startEl = document.getElementById(startId)
    let endEl = document.getElementById(endId)
    return LeaderLine.setLine(startEl, endEl, lineOptions)
}
    
</script>


<style scoped>
.viewport {
    position: relative;
}
</style>