import { reactive } from "vue";
import data from './data'
import initRectCoords from './initRectCoords'

const store = reactive({
    displayDepth: 3,
    scale: 1,
    data,
    linkCoordinates: initRectCoords(data, 3, 1),
    displayDepthChanged(displayDepth) {
        this.displayDepth = displayDepth
        this.linkCoordinates = initRectCoords(data, displayDepth, this.scale)
    },
    scaleChanged(scale) {
        this.scale = scale
        this.linkCoordinates = initRectCoords(data, this.displayDepth, scale)
    }
})

export default store