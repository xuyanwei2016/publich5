<template>
  <div class="type-answer">
    <div class="right-answer">
      <div class="answer-result false" v-if="showAns&&!ansStatus">
        <img src="@/assets/img/practice/false-result.png" alt="">回答错误
      </div>
      <div class="answer-result right" v-if="showAns&&ansStatus">
        <img src="@/assets/img/practice/right-result.png" alt="">回答正确
      </div>
      正确答案：{{answer.replace(/,/g,'')}}
    </div>
    <div class="answer-analysis">
      <span class="analysis-t">解析:</span>
      <span v-html="analysis"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: "pButton",
  props: {
    analysis: {
      type: String,
      default: ""
    },
    answer: {
      type: String,
      default: ""
    },
    showAns:{
      type:Boolean,
      default:false
    },
    ansStatus:{
      type:Boolean,
      default:false
    }
  },
  data() {
    return {};
  },
  created() {},
  mounted() {},
  watch: {},
  methods: {
    click() {
      this.$emit("click");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.type-answer {
  margin: 0 .15rem .2rem;
  background: #F7F7F7;
  padding: .15rem .12rem;
  border-radius: .02rem;
  .right-answer{
    display: flex;
    color: #333333;
    font-weight: Bold;
    font-size: .15rem;
    .answer-result{
      margin-right: .2rem;
      font-weight: Bold;
      display: flex;
      align-items: center;
      img{
        margin-right: .07rem;
      }
    }
    .right{
      color: #24C17D;
      img{
        height: .13rem;
        width: .13rem;
      }
    }
    .false{
      color: #FA6E51;
      img{
        height: .12rem;
        width: .12rem;
      }
    }
  }
  .answer-analysis{
    margin-top: .1rem;
    font-size: .14rem;
    color: #333333;
    line-height: .24rem;
    .analysis-t{
      color: #4C7AF3;
    }
  }
}
</style>
