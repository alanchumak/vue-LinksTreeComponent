<template>
    <div :id="link.id" :style="style">
        {{link.name}}
    </div>
</template>


<script>
import store from './store'
export const nodeSize = {width: 155, height: 85}

export default {
    props: ['link'],
    computed: {
        point(){
            return store.linkCoordinates[this.link.id]
        },
        style(){
            return {
                left: `${this.point.x}px`,
                top: `${this.point.y}px`,
                width: `${155 * store.scale}px`,
                height: `${85 * store.scale}px`,
                'font-size': `${store.scale}em`
            }
        }
    }
}
</script>

<style scoped>
div {
    border: 1px solid black;
    border-radius: 10px;
    background: linear-gradient(#ebecef, white);
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    /* position: relative; */
}
</style>