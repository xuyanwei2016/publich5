<template>
    <div class="p-input">
      <input 
          class="p-input__inner"
          :class="{'p-input-right':showAnswer ===1,'p-input-fill':showAnswer ===2,}"
          placeholder="填写答案"
          type="text"
          :value="value"
          @input="handleInput"
          @change="handleChange"
          :disabled="disabled"
          >
          <span class="p-input__suffix">
            <img v-if="showAnswer ===1" src="@/assets/img/practice/input-right.png" alt="">
            <img v-if="showAnswer=== 2" src="@/assets/img/practice/input-fill.png" alt="">
          </span>
    </div>
</template>
<script>
export default {
    name:"pInput",
    props:{
      showAnswer:{
        type:Number,
        default:0
      },
      value:{
          type:String,
          default:''
      },
      disabled:{
        type:Boolean,
        default:false
      }
    },
    data(){
        return{
            passwordVisiable:false
        }
    },

    computed:{

    },
    methods:{
        handleInput(e){
            // console.log(e.target.value)
            this.$emit('input',e.target.value)
        },
        handleChange(e){
            // console.log(e.target.value)
            this.$emit('change',e.target.value)
        },
    }
}
</script>
<style lang="scss" scoped>
.p-input{
    // width: 380px;
    width: 100%;
    height: .4rem;
    position: relative;
    font-size: .14rem;
    display: inline-block;
    .p-input__inner{
        -webkit-appearance: none;
        background-color: #fff;
        border: 0;
        border-bottom: 1px solid #E4E4E4;
        box-sizing: border-box;
        color: #606266;
        display: inline-block;
        font-size: inherit;
        height: .4rem;
        line-height: .4rem;
        outline: none;
        padding:  0 .15rem;
        transition: border-color .2s cubic-bezier(.645,.045,.355,1);
        width: 100%;
        &:hover{
            outline:none;
            border-color: #4093ff;
        }
    }
    .p-input-right{
      border-bottom: .01rem solid #24C17D;
      
    }
    .p-input-fill{
      border-bottom: .01rem solid #FA6E51;
    }
}

    .p-input__suffix{
        position: absolute;
        right: .1rem;
        top: .1rem;
        line-height: .35rem;
        text-align: center;
        color: #c0c4cc;
        transition: all .3s;
        z-index: 900;
        &:hover{
          cursor: pointer;
        }
        img{
          width: .22rem;
          height: .22rem;
        }
    }
</style>