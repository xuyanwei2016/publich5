<template>
  <!--答题记录-->
  <div class="answer-record">
    <div class="banner"></div>
    <div class="record-top">
      <img src="@/assets/img/public/left.png" alt="" @click="backTo">
      <div class="record-title">答题记录</div>
    </div>
    <div class="record-stic">
      <div class="item-wrap">
        <div class="record-item">
          <div class="item-title">正确率</div>
          <div class="item-percent">{{detail.synthesisCorrect}}</div>
          <div class="item-num">
            <span>答题数量</span>
            <span class="num">{{detail.synthesisCount}}道</span>
          </div>
          <img class="item-img" src="@/assets/img/record/zonghe.png" alt="">
        </div>
        <div class="record-item">
          <div class="item-title">平均分</div>
          <div class="item-percent one">{{detail.average}}</div>
          <div class="item-num">
            <span>答题次数</span>
            <span class="num">{{detail.num}}次</span>
          </div>
          <img class="item-img" src="@/assets/img/record/kaoshi.png" alt="">
        </div>
      </div>
      <div class="item-wrap">
        <div class="record-item">
          <div class="item-title">正确率</div>
          <div class="item-percent two">{{detail.practiceCorrect}}</div>
          <div class="item-num">
            <span>答题数量</span>
            <span class="num">{{detail.practiceCount}}道</span>
          </div>
          <img class="item-img" src="@/assets/img/record/lianxi.png" alt="">
        </div>
        <div class="record-item">
          <div class="item-title">正确率</div>
          <div class="item-percent three">{{detail.testCorrect}}</div>
          <div class="item-num">
            <span>答题数量</span>
            <span class="num">{{detail.testCount}}道</span>
          </div>
          <img class="item-img" src="@/assets/img/record/kaoshi.png" alt="">
        </div>
      </div>
    </div>
    <div class="record-list">
      <div v-for="(item,index) in list" :key="index" class="list-item">
        <p>{{item.name}}</p>
        <div class="item-detail">
          <div style="font-size:0">
            <span class="item-right-num">{{item.rightNum}}</span>
            <span class="item-num">/{{item.sumNum}}道</span>
            <span class="item-time">{{item.submit}}</span>
          </div>
          <div v-if="item.score !== null">
            <span class="">成绩:</span>
            <span class="item-mark">{{item.score}}分</span>
          </div>
        </div>
      </div>
    </div>
    <list-footer title="展示最近30天的答题记录"></list-footer>
  </div>
</template>

<script>
import listFooter from "@/components/header/listFooter";
import {getDetailAPI,getRecordList} from '@/api/answer'
export default {
  name: "weekPractice",
  components: {
    listFooter
  },
  data() {
    return {
      list: [],
      detail:{}
    };
  },
  created() {
    this.getDetail()
    this.getList()
  },
  watch: {},
  methods: {
    getDetail(){
      getDetailAPI().then(res=>{
        if(res.data.code == 0){
          this.detail = res.data.data
        }
      })
    },
    getList(){
      getRecordList().then(res=>{
        if(res.data.code == 0){
          this.list = res.data.data
        }
      })
    },
    backTo() {
      this.$router.back(-1)
        // this.$router.push({name:'my'})
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.answer-record {
  width: 100%;
  height: 100%;
  position: relative;
  background: #f2f2f2;
  .banner {
    width: 100%;
    height: 2rem;
    background: url("~@/assets/img/record/answer-bg.png") no-repeat;
    background-size: cover;
  }
  .record-top {
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
    .record-title {
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
  // 统计记录
  .record-stic {
    margin-top: -1rem;

    .item-wrap {
      display: flex;
      height: 1rem;
      margin-left: 0.11rem;
      margin-bottom: 0.11rem;
      .record-item {
        flex: 1;
        display: flex;
        flex-direction: column;
        text-align: center;
        margin-right: 0.11rem;
        height: 1rem;
        background: #fff;
        border-radius: 0.05rem;
      }
    }
  }
}
.record-item {
  position: relative;
  box-shadow: 0 0 0.15rem rgba(0, 0, 0, 0.05);
  .item-title {
    font-size: 0.15rem;
    line-height: 0.3rem;
    margin-top: 0.1rem;
    font-weight: Medium;
  }
  .item-percent {
    font-size: 0.23rem;
    line-height: 0.3rem;
    color: #2a7efb;
  }
  .one {
    color: #e9493e;
  }
  .two {
    color: #4faf6e;
  }
  .three {
    color: #f28d2a;
  }
  .item-num {
    margin-top: 0.04rem;
    font-size: 0.09rem;
    line-height: 0.15rem;
    color: #999999;
    .num {
      color: #5189f8;
    }
  }
  .item-img {
    position: absolute;
    top: 0;
    right: 0;
    height: 0.18rem;
    width: 0.34rem;
  }
}

.record-list {
  .list-item {
    margin: 0.1rem 0.14rem;
    background: #fff;
    border-radius: 0.05rem;
    padding: 0.15rem 0.12rem;
    box-shadow: 0 0 0.15rem rgba(0, 0, 0, 0.05);
    p {
      font-size: 0.14rem;
      line-height: 0.2rem;
      color: #000;
      font-weight: Medium;
    }
    .item-detail {
      display: flex;
      margin-top: 0.1rem;
      justify-content: space-between;
      font-size: 0.11rem;
    }
  }
}
.item-detail {
  .item-right-num {
    font-size: .11rem;
    color: #000;
  }
  .item-num {
    font-size: .11rem;
    color: #999;
  }
  .item-time {
    margin-left: .1rem;
    font-size: .11rem;
    color: #999;
  }
  .item-mark {
    color: #e9493e;
    font-weight: Bold;
    font-family: PingFang-SC-Bold;
  }
}
</style>
