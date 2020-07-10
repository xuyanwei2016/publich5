<template>
  <!--个人中心-->
    <div class="my">
      <div class="info">
        <img :src="userMssage.reserve4?imgLink(userMssage.reserve4):defoultHead" alt="">
        <div class="name">
          <h1>{{userMssage.realName}}</h1>
          <p>{{userMssage.unitName}}</p>
        </div>
      </div>
      <ul class="cont1">
        <li v-for="(item,index) in liList" :key="index" class="publicMY">
          <img :src="`./static/img/${item.icon}.png`" alt="" class="icon">
          <div class="word"  @click="$router.push(item.link)">
            <h1>{{item.name}}</h1>
            <img src="../../assets/img/my/icon_jiantou.png" alt="">
          </div>
        </li>
      </ul>

      <div class="cont2">
        <div class="publicMY">
          <img :src="`./static/img/icon5.png`" alt="" class="icon">
          <div class="word" @click="$router.push({path:'/myCompletion',query:{type:'edit'}})">
            <h1>修改个人信息</h1>
            <img src="../../assets/img/my/icon_jiantou.png" alt="">
          </div>
        </div>
      </div>

      <div class="cont3" @click="isShow=true">
        退出登录
      </div>
      <comFoot></comFoot>

      <!--退出登录弹出框-->
      <div class="cont4" v-if="isShow">
        <div class="signOut">
          <p>确定要退出登录吗？</p>
          <ul>
            <li @click="isShow=false">取消</li>
            <li @click="outFn">确定</li>
          </ul>
        </div>
      </div>
    </div>
</template>

<script>
  import {getUserMessageAPI} from '@/api/xywApi.js';
  import defoultHead from '../../assets/img/my/head.png';
    export default {
        name: 'HelloWorld',
        data() {
            return {
              isShow:false,
              defoultHead:defoultHead,
              liList:[{
                name:'错题本',
                icon:'icon_cuotiben',
                link:'/myWrongbook',
              },{
                name:'收藏的试题',
                icon:'icon_soucang',
                link:'/myCollection',
              },{
                name:'收藏的课件',
                icon:'icon_kejian',
                link:'/myCourseware',
              },{
                name:'答题记录',
                icon:'icon_ceshijilu',
                link:'/answerRecord',
              }],
              userMssage:{
                reserve4:'头像'
              },
            }
        },
        created() {
          this.getUserMessage();
        },
        watch: {},
        methods: {
          /*获取用户补全信息*/
          getUserMessage(){
            getUserMessageAPI().then(res=>{
              if(res.data.status){
                this.userMssage=res.data.data;
              }
            })
          },
          outFn(){
            this.$store.commit('signOUT');
          },
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.my{
  width: 100%;
  height: 100%;
  background: #f2f2f2;
  overflow: auto;
  .info{
    width: 100%;
    height: 1.35rem;
    background: url("../../assets/img/my/user_bg_top.png") no-repeat;
    background-size: cover;
    display: flex;
    padding-top: .55rem;
    img{
      width: .45rem;
      height: .45rem;
      margin-right: .11rem;
      margin-left: .27rem;
      box-shadow: .01rem .01rem .08rem rgba(0,0,0,0.2);
      border-radius: 50%;
    }
    .name{
      h1{
        /*font-family: my-font;*/
        color:#fff;
        font-weight: bold;
        font-size: .17rem;
        height: .18rem;
        line-height: .18rem;
        padding-bottom: .1rem;
      }
      p{
        color: #fff;
        font-weight: normal;
        height:.18rem;
        line-height: .18rem;
        font-size: .11rem;
        padding: 0 .06rem;
        display: inline-block;
        width: auto;
        max-width: 2rem;
        border: 1px solid rgba(255,255,255,.5);
        border-radius: .04rem;
        background: rgba(255,255,255,.1);
        margin: 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
  .publicMY{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: .535rem;
    padding-left: .14rem;
    .icon{
      width: .2rem;
      object-fit: contain;
    }
    .word{
      width: 3.03rem;
      height: .535rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #EBEBEB;
      h1{color: #333333; font-size: .15rem;font-weight: normal}
      img{width: .07rem;object-fit: contain; padding-right: .14rem}
    }
  }
  .cont1{
    width: 3.51rem;
    background: #fff;
    border-radius: .1rem;
    height: 2.16rem;
    margin: -.35rem auto 0;
    li{
list-style: none;
    }
    li:last-child .word{
      border-bottom: none;
    }
  }
  .cont2{
    width: 3.51rem;
    background: #fff;
    border-radius: .1rem;
    height: .54rem;
    margin:.1rem auto 0;
    .publicMY{
      .word{
        border-bottom: none;
      }
    }
  }
  .cont3{
    width: 3.45rem;
    height: .39rem;
    margin: .8rem auto 1.1rem;
    background: #E3E3E3;
    color: #333;
    border-radius: .19rem;
    text-align: center;
    line-height: .39rem;
    font-size:.14rem;
  }
  .cont4 {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1111;
    display: flex;
    justify-content: center;
    align-items: center;
    .signOut{
      width: 2.7rem;
      height: 1.5rem;
      background: #fff;
      border-radius: .08rem;
      p{
        height: 1rem;
        line-height: 1rem;
        text-align: center;
        color: #333333;
        font-size: .17rem;
      }
      ul {
        width: 100%;
        display: flex;
        border-top: 1px solid #f3f3f3;
        justify-content: center;
        height: .48rem;
        line-height: .48rem;
        li {
          flex: 1;
          text-align: center;
          color: #205FC6;
          font-size: .17rem;
        }

        li:first-child {
          border-right: 1px solid #f3f3f3;
        }
      }
    }
  }
}
</style>
