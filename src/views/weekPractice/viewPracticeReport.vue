<template>
  <!--答题报告-->
  <div class="view-report">
    <div class="banner"></div>
    <div class="report-top">
      <img src="@/assets/img/public/left.png" alt="" @click="backTo">
      <div class="report-title">答题报告</div>
    </div>
    <div class="report-bg">
      <div class="report-detail">
        <div class="detail-num">{{detail.rightCount | defaultCount}}</div>
        <div class="detail-tip">本次答对题目数</div>
      </div>
    </div>
    <div class="report-statistics">
      <div class="statistics-detail">
        <div class="time-wrap-top">
          <span class="item-top">{{detail.begintime | filterYear}}</span>
          <span class="item-top">{{detail.updateTime | filterYear}}</span>
          <span class="item-top"></span>
        </div>
        <div class="time-wrap">
          <div class="time-item">
            <span class="item-cnt">{{detail.begintime | filterTime}}</span>
            <span class="item-bot">开始时间</span>
          </div>
          <div class="time-item">
            <span class="item-cnt">{{detail.updateTime | filterTime}}</span>
            <span class="item-bot">交卷时间</span>
          </div>
          <div class="time-item">
            <span class="item-cnt">{{detail.readtime}}</span>
            <span class="item-bot">测试时间</span>
          </div>
        </div>
        <div class="info-item">
          <img src="@/assets/img/practice/info-tip.png" alt="">
          <span class="item-right">正确率:</span>
          <span class="item-per">{{detail.correct}}</span>
          <span class="item-false item-point">答错</span>
          <span class="item-num">{{detail.errorCount | defaultCount}}</span>
          <span class="item-false">题</span>
        </div>
      </div>
    </div>
    <div class="footer-but">
      <span class="footer-back" @click="backTo">返回</span>
      <span class="footer-again" @click="doAgain">再练一次</span>
    </div>
  </div>
</template>

<script>
import { getDetailPaperAPI } from '@/api/week'
export default {
  name: "weekPractice",
  data() {
    return {
      paperId:null,
      title:null,
      id:null,
      detail:{
        begintime:'',
        updateTime:'',
        errorCount:null,
        correct:'100%',
        readtime:'',
      }
    };
  },
  filters:{
    defaultCount:function(value){
      return value||0
    },
    filterYear:function(value){
      return value&&value.substring(2,10).replace(/-/g,'.')
    },
    filterTime:function(value){
      return value&&value.substring(10)
    }
  },
  created() {
    let query = this.$route.query
    this.paperId = query.paperId
    this.title = query.title
    this.id = query.id
    this.getDetail(this.paperId)
  },
  watch: {},
  methods: {
    getDetail(id) {
      let data = {
        paperId:id
      }
      getDetailPaperAPI(data).then(res=>{
        if(res.data.code == 0){
          this.detail = res.data.data
        }else{
          this.$message.error(res.data.msg)
        }
        
      })
    },
    backTo() {
      this.$router.push({name:'weekPractice'})
    },
    doAgain() {
      this.$router.push({name:'practice',query:{
        title:this.title,
        id:this.id
      }})
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.view-report {
  width: 100%;
  height: 100%;
  position: relative;
  background: #fff;
  .banner {
    width: 100%;
    height: 3.18rem;
    background: url("~@/assets/img/practice/view-bg.png") no-repeat;
    background-size: cover;
  }
  .report-top {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    img {
      position: absolute;
      left: 0.125rem;
      top: 0.2rem;
      width: 0.09rem;
      height: 0.155rem;
    }
    .report-title {
      position: absolute;
      top: 0.2rem;
      left: 50%;
      transform: translateX(-50%);
      color: #fff;
      font-size: 0.18rem;
      font-weight: Bold;
      line-height: 0.17rem;
    }
  }
  .report-bg {
    position: absolute;
    top: 0.6rem;
    left: 0;
    right: 0;
    height: 1.93rem;
    text-align: center;

    .report-detail {
      margin: 0 auto;
      height: 100%;
      width: 1.99rem;
      background: url("~@/assets/img/practice/view-top-bg.png") no-repeat;
      background-size: cover;
      .detail-num {
        padding-top: 0.56rem;
        font-size: 0.45rem;
        color: #ed3326;
        font-weight: Bold;
      }
      .detail-tip {
        font-size: 0.11rem;
        color: #ed3326;
      }
    }
  }
  .report-statistics {
    margin-top: -0.8rem;
    padding: 0 0.1rem;
    height: 1.66rem;
    .statistics-detail {
      position: relative;
      height: 1.66rem;
      width: 100%;
      background: url("~@/assets/img/practice/statistics-bg.png") no-repeat;
      background-size: cover;
    }
  }
}

// 时间
.time-wrap {
  display: flex;
  padding-top: 0.05rem;
  .time-item {
    flex: 1;
    border-right: 0.01rem dashed #ffd52c;
    display: flex;
    flex-direction: column;
    .item-cnt,
    .item-bot {
      display: inline-block;
      height: 0.2rem;
      line-height: 0.2rem;
      text-align: center;
    }
    .item-cnt {
      font-size: 0.16rem;
      color: #000000;
    }
    .item-bot {
      font-size: 0.11rem;
      color: #888888;
    }
    &:last-child {
      border-right: 0;
    }
  }
}
.time-wrap-top {
  display: flex;
  padding-top: 0.3rem;
  line-height: 0.15rem;
  .item-top {
    font-size: .1rem;
    flex: 1;
    text-align: center;
    color: #888888;
  }
}
// 统计信息
.info-item {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 0.5rem;
  display: flex;
  padding-left: 0.27rem;
  padding-bottom: 0.1rem;
  align-items: center;
  line-height: 0.2rem;
  font-size: 0.13rem;
  img {
    width: 0.2rem;
    height: 0.2rem;
  }
  .item-right {
    margin-left: 0.1rem;
    color: #999999;
  }
  .item-per {
    color: #04afaf;
    font-weight: Bold;
  }
  .item-false {
    color: #999;
  }
  .item-num {
    padding: 0 0.05rem;
    color: #f75c3a;
  }
  .item-point {
    padding-left: 0.16rem;
    position: relative;
    &:before {
      content: "";
      position: absolute;
      left: 0.07rem;
      top: 0.08rem;
      height: 0.04rem;
      width: 0.04rem;
      border-radius: 0.04rem;
      background: #ffab18;
    }
  }
}

.footer-but {
  margin-top: 0.5rem;
  padding: 0 0.2rem;
  display: flex;
  justify-content: space-around;
  .footer-back,
  .footer-again {
    height: 0.4rem;
    line-height: 0.4rem;
    font-size: 0.15rem;
    border-radius: 0.4rem;
    width: 1.4rem;
    text-align: center;
  }
  .footer-back {
    background: #e3e3e3;
    color: #333;
  }
  .footer-again {
    background: #05b3b6;
    color: #fff;
  }
}
</style>
