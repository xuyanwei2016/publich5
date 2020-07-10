<template>
  <!--答题记录-->
  <div class="answerLogs">
    <noBgHeader></noBgHeader>
    <ul class="cont1">
      <li>
        <h1>正确率</h1>
        <h2>90%</h2>
        <p>答题数量 <span>120道</span></p>
      </li>

      <li>
        <h1>平均分</h1>
        <h2>90</h2>
        <p>答题次数 <span>10次</span></p>
      </li>

      <li>
        <h1>正确率</h1>
        <h2>90%</h2>
        <p>答题数量 <span>80道</span></p>
      </li>

      <li>
        <h1>正确率</h1>
        <h2>60%</h2>
        <p>答题数量 <span>60道</span></p>
      </li>
    </ul>

    <ul class="cont2">
      <li v-for="(item,index) in list" :key="index">
        <h1>{{item.name}}</h1>
        <div class="other">
          <div class="indexCSS">
            <h2><span>{{index}}</span>/5道</h2>
            <h3>{{item.time}}</h3>
          </div>
          <h4>成绩：<span>80分</span></h4>
        </div>
      </li>
    </ul>
    <div class="lastCss">
      ———<span>展示最近30天的答题记录</span>———
    </div>
  </div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    data() {
      return {
        list:[
          {name:'2020年06月公共就业服务公共就业服务岗位业务竞赛月月赛答题',
            fraction:80,
            time:'2020.06.01 12:50'
          },
          {name:'2020年06月公共就业服务公共就业服务岗位业务竞赛月月赛答题',
            fraction:80,
            time:'2020.06.01 12:50'
          },
        ],
      }
    },
    created() {
    },
    watch: {},
    methods: {},
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .answerLogs {
    width: 3.75rem;
    height: 100%;
    // background: url("./static/img/myAnswerlogs.jpg") no-repeat #f3f3f3;
    background-size: contain;
    margin: 0;
    padding: 0;

    .cont1 {
      display: flex;
      flex-wrap: wrap;
      padding: .9rem .12rem 0;
      justify-content: space-between;

      li {
        width: 1.7rem;
        height: 1rem;
        background-color: #fff;
        border-radius: .05rem;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        background-repeat: no-repeat;
        background-size: .34rem .18rem;
        background-position: top right;
        margin-bottom: .11rem;
        box-shadow: .02rem .01rem .08rem rgba(0,0,0,0.1);
        h1 {
          color: #333333;
          font-size: .15rem;
          font-weight: normal;
          height: .32rem;
          line-height: .32rem;
        }

        h2 {
          color: #2A7EFB;
          font-size: .23rem;
          height: .29rem;
          line-height: .29rem;
        }

        p {
          height: .2rem;
          line-height: .2rem;
          color: #999999;

          span {
            color: #2A7EFB;
          }
        }
      }

      li:nth-child(1) {
        background-image: url("../../assets/img/my/icon3.png");
      }

      li:nth-child(2) {
        background-image: url("../../assets/img/my/icon1.png");

        h2 {
          color: #E9493E
        }
      }

      li:nth-child(3) {
        background-image: url("../../assets/img/my/icon2.png");

        h2 {
          color: #4FAF6E
        }
      }

      li:nth-child(4) {
        background-image: url("../../assets/img/my/icon1.png");

        h2 {
          color: #F28D2A
        }
      }
    }

    .cont2 {
      padding-top: .15rem;
      li {
        width: 3.27rem;
        background: #fff;
        border-radius: .05rem;
        padding: .12rem;
        margin: 0 auto .1rem;
        box-shadow: .02rem .01rem .08rem rgba(0,0,0,0.1);
        h1{
          font-size: .14rem;
          color: #000000;
          font-weight: normal;
          line-height: .2rem;
        }
        .other{
          display: flex;
          justify-content: space-between;
          padding-top: .1rem;
          .indexCSS{
            display: flex;
            justify-content: flex-start;
            h2{
              font-size: .11rem;
              font-weight: normal;
              color: #999999;
              span{
                color: #000000;
              }
            }
            h3{
              color: #999999;
              font-size: .11rem;
              font-weight: normal;
              padding-left: .1rem;
            }
          }
          h4{
            color: #999999;
            font-size: .11rem;
            font-weight: normal;
            padding-left: .1rem;
            span{
              font-weight: bold;
              color: #E9493E;
            }
          }
        }
      }
    }

    .lastCss{
      height: .3rem;
      line-height: .3rem;
      font-size: .12rem;
      color: #CCCCCC;
      text-align: center;
      span{padding: 0 .1rem}
    }

  }
</style>
