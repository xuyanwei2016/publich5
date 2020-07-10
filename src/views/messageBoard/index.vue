<template>
  <!--留言板-->
  <div class="messageBoard">
    <ul class="tab">
      <li :class="curTab==index&&'active'" v-for="(item,index) in ['全部留言','我的留言']" @click="curTab=index">{{item}}</li>
    </ul>
    <ul class="dataList">
      <van-list v-model="loading"
                :immediate-check="false"
                :finished="finished"
                :finished-text="noHave"
                @load="onLoad">
        <li v-for="(itD,inD) in dataList" :key="inD">
          <div class="createName"><h1>{{itD.realName}}</h1>（{{timeE(itD.releaseTime)}}）</div>
          <p>{{itD.content}}</p>
          <div class="replyName" v-if="itD.replyContent"><h2>管理员回复</h2>（{{timeE(itD.replyTime)}}）</div>
          <p>{{itD.replyContent}}</p>
        </li>
      </van-list>
    </ul>
    <div class="want" @click="isShow=true,message=''">
      <img src="../../assets/img/list/message.png" alt="">
    </div>
    <Foot></Foot>

    <!--留言弹出框-->
    <div class="pop" v-if="isShow">
      <div class="popClose"><img src="../../assets/img/list/ft_icon_guanbi.png" alt="" @click="isShow=false"></div>
      <div class="popText">
        <textarea cols="30" rows="10" v-model="message" placeholder="请输入留言内容..."></textarea>
        <!--<h1>{{message.length}}/300</h1>-->
        <button @click="sendTo">提交</button>
      </div>
    </div>
  </div>
</template>

<script>
  import {Icon, NavBar, List, Toast,Field} from 'vant';
  import Foot from "../../components/Foot";
  import {getMessageListAPI,sendMessageAPI} from '../../api/xywApi';

  export default {
    name: 'HelloWorld',
    data() {
      return {
        curTab:0,
        message:'',
        isShow:false,
        loading: false,
        finished: false,
        dataList:[],
        listQuery:{
          pageNum: 1,
          pageSize: 20,
          queryCondition:1
        },
        pageCount:0,
        total:0,
        noHave:'',
      }
    },
    components: {
      "van-icon": Icon,
      "van-nav-bar": NavBar,
      "van-list": List,
      "van-field": Field,
      Foot:Foot,
    },
    created() {
      this.getList();
    },

    watch: {
      curTab(n,o){
        this.listQuery.pageNum=1;
        this.listQuery.queryCondition=n==0?1:0;
        this.dataList=[];
        this.getList();
      },
    },
    methods: {
      onLoad(){
        if (this.listQuery.pageNum*20 < this.total) {
          this.listQuery.pageNum++;
          this.getList();
        }else{
          this.finished = true;
          this.noHave='——这是我的底线——';
        }
      },
      getList(){
        this.noHave='';
          /*this.loading = true;*/
          getMessageListAPI(this.listQuery).then(res => {
            if (res.data.status) {
              this.dataList = [...this.dataList, ...res.data.data.list];
              this.total=res.data.data.total||0;
              /*this.pageCount = res.data.data.pages;*/
              if(res.data.data.total==0){
                this.finished = true;
                this.noHave='暂无数据';
              }else if(res.data.data.pages==1){
                this.finished = true;
                this.noHave='——这是我的底线——';
              }
            }
            this.loading = false;
          })

      },
      /*发留言*/
      sendTo(){
        if(this.message.trim()==''){
          Toast.fail('请输入留言内容');
          return
        }
        var regStr = /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/ig;
        if(regStr.test(this.message)){
          Toast.fail('暂不支持表情输入');
          return
        }
        sendMessageAPI({
          'content':this.message,
        }).then(res=>{
          if(res.data.status){
            Toast.success('留言发送成功');
            this.isShow=false;
            this.listQuery.pageNum=1;
            /*this.getList();*/
          }else{
            Toast.fail('留言发送失败');
          }
        })
      },
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .messageBoard {
    width: 100%;
    height: 100%;
    background: #f2f2f2;
    overflow: auto;
    .tab{
      width: 100%;
      height: .44rem;
      color: #fff;
      background: #02A8AB;
      font-size: .15rem;font-weight: bold;
      display: flex;
      align-items: center;
      justify-content: center;
      .active{font-size: .18rem;}
      li{
        padding: 0 .25rem;
      }
    }

    .dataList{
      li{
        padding: .12rem .15rem;
        border-bottom: .1rem solid #f2f2f2;
        background: #fff;
        .createName{
          color: #212020;
          font-size: .13rem;
          display: flex;
          align-items: center;
          line-height: .36rem;
          h1{font-size: .15rem;height: .36rem;}
        }
        p{
          color: #818389;font-size: .14rem;line-height: .22rem;/*padding-bottom: .1rem;*/
        }
        .replyName{
          border-top: 1px solid #eee;
          color: #FB6E53;
          font-size: .13rem;
          line-height: .36rem;
          display: flex;
          align-items: center;
          margin-top: .1rem;
          padding-top: .05rem;
          h2{
            height: .36rem;
            font-size: .15rem;height: .36rem;line-height: .36rem
          }
        }
      }
    }
    .want{
      width: .6rem;
      height: .6rem;
      position: fixed;
      right: .1rem;
      bottom: 1rem;
      img{
        width: .6rem;
        height: .6rem;
      }
    }

    .pop{
      position: fixed;
      z-index: 1111;
      bottom: 0;
      left:0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.3);
      display: flex;
      justify-content: flex-end;
      flex-direction: column;
      .popClose{width:100%;height: .182rem;padding-bottom: .155rem;
        display: flex;
        justify-content: flex-end;
      img{
        width: .185rem;height: .182rem;
        padding-right: .125rem;

      }}
      .popText{
        height:30%;
        width: 3.45rem;
        padding: .15rem .15rem .02rem .15rem;
        background: #fff;
        textarea{width: 100%;height:calc(100% - .85rem);font-size: .15rem;border:none;resize: none}
        ::-webkit-input-placeholder { /* WebKit browsers */
          color: #B9BDC6;
        }

        ::-moz-placeholder { /* Mozilla Firefox 19+ */
          color: #B9BDC6;
        }

        :-ms-input-placeholder { /* Internet Explorer 10+ */
          color: #B9BDC6;
        }
        h1{ color: #999999;font-size: .12rem; font-weight: normal;text-align: right}
        button{
          background: url("../../assets/img/list/ft_but_fabu.png") no-repeat;
          width:.52rem;
          height: .315rem;
          text-align: center;
          line-height: .315rem;
          color: #FDFDFD;
          font-size: .14rem;
          border: none;
          margin-top: .2rem;
          float: right;display: block;
        }
      }

    }

  }
</style>
