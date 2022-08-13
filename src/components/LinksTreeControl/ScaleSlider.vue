<template>
    <div class="bar">
        <button @click="onDecreaseClicked" class="minusBtn">-</button>
        <div class="slider">
            <Slider 
                :value="value" 
                @update="onChanged" 
                :lazy="false" 
                :min="40" 
                :max="100" 
                :step="5"
                class="slider-blue"
                
                />
        </div>
        <button @click="onIncreaseClicked">+</button>
    </div>
</template>


<style scopde>

.slider-blue {
    --slider-connect-bg: #6895e5;
    --slider-tooltip-bg: #6895e5;
    --slider-handle-ring-color: #6895e530;
}


.slider {
    width: 200px;
    margin: 30px 10px;
}
.bar{
    display: flex; 
    /* justify-content: space-between; */
    align-items: center;
}

button {
    border-radius: 50%;
    border: 1px gray solid;
    padding: 0;
    width: 22px;
    height: 22px;

}

button:active {
    background-color: darkgray;
}

.minusBtn{
    padding-bottom: 2px;
}
</style>


<script>
import Slider from '@vueform/slider'
import store from './store'

const minValue = 40
const maxValue = 100
const step = 5

export default {
    components: { Slider },
    data() {
        return { value: 100 }
    },
    methods: {
        onChanged(value){
            this.value = value
            store.scaleChanged(value/100)
        },
        onDecreaseClicked(){
            let newValue = (this.value - step < minValue) ? minValue : this.value - step 
            this.value = newValue
            store.scaleChanged(newValue / 100)
        },
        onIncreaseClicked(){
            let newValue = (this.value + step > maxValue) ? maxValue : this.value + step
            this.value = newValue
            store.scaleChanged(newValue / 100)
        } 
    }
}
</script>

<style src="@vueform/slider/themes/default.css">


</style>