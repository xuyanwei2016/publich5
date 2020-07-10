<template>
  <div class="type-completion">
    <div class="default-font" v-if="dataObj.content" v-html="dataObj.content"></div>
    <div class="default-font" v-else v-html="dataObj.filterContent"></div>
    <div class="answer-completion">
      <p-input ref="input" :value="value" :show-answer="showAnswer" @change="inputChange" :disabled="disabled"></p-input>
    </div>
  </div>
</template>

<script>
import pInput from './input'
export default {
  name: 'completion',
  components:{
    pInput
  },
  props:{
    dataObj:{
      type:Object,
      default:()=>{}
    }
  },
  data() {
      return {
        value:'',
        showAnswer:0,
        disabled:false
      }
  },
  created() {
    
    
  },
  mounted() {
  },
  watch: {},
  methods: {
    changeStatus(){

    },
    inputChange(value){
      this.$emit('input',value)
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.type-text{
  font-size: .16rem;
  line-height: .24rem;
}
.type-completion{
  border-radius: .1rem .1rem 0 0 ;
  background: #fff;
  padding: .185rem .15rem 0;
  line-height: .2rem;
  .default-font{
    font-size: .16rem;
    line-height: .24rem;
  }
}
</style>
