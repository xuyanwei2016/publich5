<template>
  <div class="home">
    <div class="banner">
      <div class="upload" @click="$router.push('/uploadFile')">
        <h1>下载资料</h1>
      </div>
    </div>
    <div class="cont1 homePublic" @click="$router.push('/lineStudy')">
      <h1><img src="../../assets/img/home/icon_xuexi.png" alt=""></h1>
      <div class="other">
        <h2>在线学习</h2>
        <h3>GO<img src="../../assets/img/home/triangle.png" alt=""></h3>
      </div>
    </div>


    <ul class="cont2 homePublic">
      <li  @click="toWeek"><h1><img src="../../assets/img/home/icon_dati.png" alt=""></h1>
        <div class="other">
          <h2>在线答题</h2>
          <h3>GO<img src="../../assets/img/home/triangle.png" alt=""></h3>
        </div>
      </li>
      <li @click="toMoon"><h1><img src="../../assets/img/home/icon_kaoshi.png" alt=""></h1>
        <div class="other">
          <h2>在线考试</h2>
          <h3>GO<img src="../../assets/img/home/triangle.png" alt=""></h3>
        </div>
      </li>
    </ul>
    <ul class="cont3">
      <li @click="$router.push('/answerRecord')"><img src="../../assets/img/home/icon_jilu.png" alt="">
        <p>答题记录</p></li>
      <li @click="$router.push('/myWrongbook')"><img src="../../assets/img/home/icon_cuotiben.png" alt="">
        <p>错题本</p></li>
      <li @click="$router.push('/myCollection')"><img src="../../assets/img/home/icon_shoucang.png" alt="">
        <p>收藏试题</p></li>
    </ul>
    <Foot></Foot>
  </div>
</template>

<script>
  import Foot from '../../components/Foot';
  import {Toast} from "vant";
  export default {
    name: 'HelloWorld',
    data() {
      return {}
    },
    components:{Foot},
    created() {
    },
    watch: {},
    methods: {
      toWeek(){
        // Toast.fail('正在开发中');
        this.$router.push({name:'weekPractice'})
      },
      toMoon(){
        // Toast.fail('正在开发中');
        this.$router.push({name:'moonMatch'})
      }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .home {
    width: 100%;
    height:100%;
    /*max-height: 100%;*/
    background: #03BCBE;
    position: relative;
    .banner {
      width: 100%;
      height: 2.4rem;
      background: url("../../assets/img/home/banner.jpg") no-repeat;
      background-size: cover;
      .upload{
        position: absolute;
        top:.2rem;
        right: .1rem;
        width: 1.1rem; height: .34rem; background: rgba(0,0,0,.4);
        border-radius: .05rem;
        display: flex;
        align-items: center;
        justify-content: center;
        h1{
          font-size: .14rem;
          font-weight: normal;
          color: #fff;
        }
        h1:before{
          content: '';
          background: url("../../../static/file/upload.png") no-repeat;
          background-size: contain;
          width: .17rem;
          height: .16rem;
          display: block;
          float: left;
          margin-right: .02rem;
          margin-top:.01rem;
        }
      }
    }

    .homePublic {
      h1 {
        display: block;
        padding-bottom: .17rem;

        img {
          width: .18rem;
          height: .2rem;
          object-fit: contain
        }
      }

      .other {
        display: flex;
        justify-content: space-between;

        h2 {
          font-size: .22rem;
          color: #fff;
          text-shadow: .03rem .02rem .03rem rgba(0, 0, 0, .4);
          height: .28rem;
          line-height: .28rem;
          /*font-family: my-font;*/
        }

        h2:after {
          content: ' ';
          height: .04rem;
          width: .44rem;
          background: #fff;
          border-radius: .02rem;
          display: block;
          margin-top: .1rem;
        }

        h3 {
          font-size: .11rem;
          color: #fff;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          height: .2rem;
          margin-top: .22rem;
          /*font-family: my-font;*/
          img {
            width: .05rem;
            height: .06rem;
            margin-left: .04rem
          }
        }
      }
    }

    .cont1 {
      width: 3.08rem;
      height: .91rem;
      background: url("../../assets/img/home/xuexi-bg.png") no-repeat;
      background-size: cover;
      margin: -.46rem auto 0;
      padding: .24rem .1rem 0 .17rem;
      z-index: 11;

    }

    .cont2 {
      width: 3.35rem;
      margin: .15rem auto .23rem;
      display: flex;
      justify-content: space-between;

      li {
        width: 1.33rem;
        height: .96rem;
        padding: .24rem .1rem 0 .17rem;
      }

      li:nth-child(1) {
        background: url("../../assets/img/home/dati-bg.png") no-repeat;
        background-size: cover;
      }

      li:nth-child(2) {
        background: url("../../assets/img/home/kaoshi-bg.png") no-repeat;
        background-size: cover;
      }
    }

    .cont3{
      width: 3.35rem;
      margin: 0 auto;
      padding-bottom: .6rem;
      display: flex;
      justify-content: space-between;
      li{
        width: 1.05rem;
        height: .74rem;
        background: rgba(255,255,255,.2);
        border-radius: .15rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        img{
          height: .25rem;
          object-fit: contain;
        }
        p{
          font-size: .13rem;
          color: #fff;
          font-weight: bold;height: .16rem; line-height: .16rem;
          padding-top: .08rem;
        }

      }
    }


  }
</style>
