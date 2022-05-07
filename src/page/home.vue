<template>
    <div>
        <p @click="changeCount">{{ count }}</p>
    </div>
</template>

<script>
//使用reactive, toRefs对state进行转化，避免value的冗余
//或者vue3种的单文件setup
//可以通过引入方法的方式拆分setup，比如props。emit。方法
import { reactive, toRefs } from '@vue/composition-api'

export default {
   setup(){
     const state = reactive({
      count:0
    })
     const changeCount=()=>{
       return state.count++;
     }
     return {
       ...toRefs(state),
       changeCount
     }
   },
}
</script>

<style scoped>

</style>
