<template>
  <div class="type-single">
    <div class="default-font" v-if="dataObj.content" v-html="dataObj.content"></div>
    <div class="default-font" v-else v-html="dataObj.filterContent"></div>
    <div class="answer-single">
      <div v-for="(item,index) in multipleType" :key="index" :class="item.class">
        <div class="option-item" v-if="dataObj[item.name]" :class="{'option-right':(currentStatus[item.name] ==3)||activeName.indexOf(item.value) != -1,
          'option-false':currentStatus[item.name] ==2,'option-no':currentStatus[item.name] ==1}" @click="choiseSelect(item.value)">
          <div class="option-num"></div>
          <span v-html="dataObj[item.name]"></span>
        </div>
      </div>
      <!-- <div class="option-item default-a" v-if="dataObj.answer1" :class="{'option-right':(currentStatus.answer1 ==3)||activeName.indexOf('A') != -1,
          'option-false':currentStatus.answer1 ==2,'option-no':currentStatus.answer1 ==1}"  @click="choiseSelect('A')">
        <div class="option-num"></div>
        <span v-html="dataObj.answer1"></span>
      </div>
      <div class="option-item default-b" v-if="dataObj.answer2" :class="{'option-right':currentStatus.answer2 ==3||activeName.indexOf('B') != -1,
          'option-false':currentStatus.answer2 ==2,'option-no':currentStatus.answer2 ==1}"  @click="choiseSelect('B')">
        <div class="option-num"></div>
        <span v-html="dataObj.answer2"></span>
      </div>
      <div class="option-item default-c" v-if="dataObj.answer3" :class="{'option-right':(currentStatus.answer3 ==3)||activeName.indexOf('C') != -1,
          'option-false':currentStatus.answer3 ==2,'option-no':currentStatus.answer3 ==1}"  @click="choiseSelect('C')">
        <div class="option-num"></div>
        <span v-html="dataObj.answer3"></span>
      </div>
      <div class="option-item default-d" v-if="dataObj.answer4" :class="{'option-right':(currentStatus.answer4 ==3)||activeName.indexOf('D') != -1,
          'option-false':currentStatus.answer4 ==2,'option-no':currentStatus.answer4 ==1}"  @click="choiseSelect('D')">
        <div class="option-num"></div>
        <span v-html="dataObj.answer4"></span>
      </div>
      <div class="option-item default-e" v-if="dataObj.answer5" :class="{'option-right':(currentStatus.answer5 ==3)||activeName.indexOf('E') != -1,
          'option-false':currentStatus.answer5 ==2,'option-no':currentStatus.answer5 ==1}"  @click="choiseSelect('E')">
        <div class="option-num"></div>
        <span v-html="dataObj.answer5"></span>
      </div>
      <div class="option-item default-f" v-if="dataObj.answer6" :class="{'option-right':(currentStatus.answer6 ==3)||activeName.indexOf('F') != -1,
          'option-false':currentStatus.answer6 ==2,'option-no':currentStatus.answer6 ==1}"  @click="choiseSelect('F')">
        <div class="option-num"></div>
        <span v-html="dataObj.answer6"></span>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'single',
  props:{
    dataObj:{
      type:Object,
      default:()=>{}
    },
    showButton:{
      type:String,
      default:'curent'
    }
    // currentStatus:{
    //   type:Object,
    //   default:()=>{
    //     return {
          
    //     }
    //   }
    // },
  },
  data() {
      return {
        multipleType:[
          {
            name:'answer1',
            value:'A',
            class:'default-a'
          },
          {
            name:'answer2',
            value:'B',
            class:'default-b'
          },
          {
            name:'answer3',
            value:'C',
            class:'default-c'
          },
          {
            name:'answer4',
            value:'D',
            class:'default-d'
          },
          {
            name:'answer5',
            value:'E',
            class:'default-e'
          },
          {
            name:'answer6',
            value:'F',
            class:'default-f'
          }
        ],
        currentStatus:{
          answer1:0,
          answer2:0,
          answer3:0,
          answer4:0,
          answer5:0,
          answer6:0,
        },
        activeName:[]
      }
  },
  created() {
    
    
  },
  mounted() {
  },
  watch: {},
  methods: {
    changeStatus(){ // 初始化状态
      this.currentStatus={
          answer1:0,
          answer2:0,
          answer3:0,
          answer4:0,
          answer5:0,
          answer6:0,
        }
      this.activeName = []
    },
    choiseSelect(name){
      console.log(this.activeName,222);
      

      if(!Array.isArray(this.activeName)){
        this.activeName = this.activeName.replace(/,/g,'').split('')
      }
      if(this.showButton !== 'curent') return 
      if(this.activeName.indexOf(name) != -1){
        this.activeName.splice(this.activeName.indexOf(name),1)
      }else{
        this.activeName.push(name)
      }
      let result = this.activeName.join('').replace(/,/g,'')
      this.$emit('changeSelect',result)
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
.type-single{
  border-radius: .1rem .1rem 0 0 ;
  background: #fff;
  padding: .185rem .15rem 0;
  .default-font{
    font-size: .16rem;
    line-height: .24rem;
  }
  .answer-single{
    padding-top: .05rem;
  }
  .option-item{
    padding: .06rem 0 ;
    // height: .45rem;
    line-height: .3rem;
    font-size: .16rem;
    color: #333333;
    font-weight: Medium;
    display: flex;
    .option-num{
      flex: 0 0 .25rem;
      margin-right: .15rem;
      line-height: .25rem;
      display: inline-block;
      width: .25rem;
      height: .25rem;
      border-radius: 50%;
      box-shadow: 0 0 .06rem #d8d8d8;
      img{
        width: .25rem;
        height: .25rem;
      }
    }
  }
}
.default-a{
  .option-num{
    background: url('~@/assets/img/practice/p-A.png');
    background-size:cover;
  }
}
.default-b{
  .option-num{
    background: url('~@/assets/img/practice/p-B.png');
    background-size:cover;
  }
}
.default-c{
  .option-num{
    background: url('~@/assets/img/practice/p-C.png');
    background-size:cover;
  }
}
.default-d{
  .option-num{
    background: url('~@/assets/img/practice/p-D.png');
    background-size:cover;
  }
}
.default-e{
  .option-num{
    background: url('~@/assets/img/practice/p-E.png');
    background-size:cover;
  }
}
.default-f{
  .option-num{
    background: url('~@/assets/img/practice/p-F.png');
    background-size:cover;
  }
}
.option-right{
  color: #24C27D;
  span{
    color: #24C27D;
  }
  .option-num{
    background: url('~@/assets/img/practice/p-RIGHT.png');
    background-size:cover;
  }
} 
.option-no{
  color: #FA6E51;
  span{
     color: #FA6E51;
  }
  .option-num{
    background: url('~@/assets/img/practice/p-NO.png');
    background-size:cover;
  }
}
.option-false{
  color: #FA6E51;
  span{
     color: #FA6E51;
  }
  .option-num{
    background: url('~@/assets/img/practice/p-FALSE.png');
    background-size:cover;
  }
}
</style>
