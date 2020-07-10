<template>
  <!--错题本-->
  <div class="wrongBook">
    <noBgHeader></noBgHeader>
    <div class="cont1">
      <div class="wrongNum">
        <h1>{{total}}</h1>
        <h2>错题数</h2>
      </div>
      <div class="allWrong" @click="toView({code:''})">全部错题 <img src="../../assets/img/my/user_icon_jiantou_black.png" alt=""></div>
    </div>

    <div class="cont2">
      <h1>业务类型</h1>
      <van-list
        v-model="loading"
        :immediate-check="false"
        :finished="finished"
        :finished-text="(liList&&liList.length>0)?'':'暂无错题'"
      >
      <ul>
        <li v-for="(item,index) in liList" :key="index">
          <h3 :class="`color-div${index%6+1}`">{{index<9?'0'+(index+1):index+1}}</h3>
          <!--<img :src="`./static/img/icon_0${index+1}.png`" alt="">-->
          <div class="word">
            <p><span>{{item.codeZh}}</span> <span>{{item.num}}道题</span></p>
            <h2 @click="toView(item)">查看</h2><!--code-->
          </div>
        </li>
      </ul>
      </van-list>
    </div>

  </div>
</template>

<script>
  import {getErrorbookAPI} from '@/api/xywApi';
  import {Icon, List, NavBar, Picker,Toast} from "vant";
  export default {
    name: 'HelloWorld',
    data() {
      return {
        liList:[],
        total:0,
        loading: false,
        finished: false,

      }
    },
    created() {
      this.getErrorbook();
    },
    watch: {},
    components: {
      "van-list":List
    },
    methods: {
      getErrorbook(){
        this.loading = true;
        getErrorbookAPI().then(res=>{
          if(res.data.status){
            this.liList=res.data.data.list;
            this.total=res.data.data.sumNum;
            this.loading = false;
            this.finished = true;
          }
        })
      },
      toView(item){
        // Toast.fail('功能开发中')
        this.$router.push({name:'myWrongDetail',query:{id:item.code, type:'wrong'}})

      }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .wrongBook {
    width: 100%;
   /* height:100%;*/
    background: url("../../../static/img/myWrongbook.jpg") no-repeat #f3f3f3;
    background-size: contain;
    min-height: 100%;
    white-space: nowrap;
    .cont1{
      padding-top: .8rem;
      .wrongNum{
        color: #EB5968;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        width: 1.44rem;
        height: 1.44rem;
        background: url("../../assets/img/my/num-bg.png") no-repeat;
        background-size: contain;
        margin: 0 auto;

        h1{
          font-size: .39rem;
          height: .6rem;
          line-height: .6rem;
          padding-top: .16rem;
          font-weight: normal;
          /*font-family: my-font;*/
        }
        h2{
          height: .2rem;
          line-height: .2rem;
          font-size: .11rem;
          font-weight: normal;
        }
      }

      .allWrong{
        width: 1.28rem;
        height: .34rem;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid #FFE8DB;
        border-radius: .17rem;
        color: #FBFDFF;
        font-size: .13rem;
        margin:.29rem auto 0;
        img{width: .07rem;object-fit: cover; margin-left: .11rem;margin-top: .02rem}
      }
    }

    .cont2{
      h1{color: #333333;font-size: .15rem;/*font-family: my-font;*/height: .5rem; line-height: .5rem;padding-top: .3rem;padding-left: .12rem}
    }
    ul{
      width: 3.51rem;
      margin: 0 auto;
      overflow: hidden;
      padding-bottom: .2rem;

      li{
        width: 3.51rem;
        height: .68rem;
        background: #fff;
        border-radius: .05rem;
        margin-bottom: .1rem;
        display: flex;justify-content: space-between;
        align-items: center;
        h3{
          width: .42rem;height: .42rem;
          text-align: center;
          line-height: .38rem;
          margin-left: .15rem;
          color:#fff;
          /*font-family: my-font;*/
        }
        @for $i from 1 through 6 {
          .color-div#{$i}{
            background-image: url('../../../static/img/icon_0#{$i}.png');
            background-size: contain;
          }
        }

        /*img{width: .42rem;height: .42rem;object-fit: cover;margin-left: .15rem;}*/
        .word{
          width: 2.74rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-right: .15rem;
          h2{border:1px solid #DDDDDD;border-radius: .03rem;width: .5rem;height: .24rem; text-align: center;line-height: .24rem;color: #333333;font-weight: normal;font-size: .11rem}
          p{
            display: flex;
            flex-direction: column;
            color: #333333;
            font-size: .13rem;
            line-height: .2rem;
            width: 2.1rem;
            span:nth-child(1){
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            span:nth-child(2){
              color: #999999;
              font-size: .11rem;
              line-height: .18rem;
            }
          }
        }
      }
    }


  }
</style>
