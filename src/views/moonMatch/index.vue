<template>
  <!--在线考试-->
  <div class="week-list">
    <topHeader header-title="在线考试" :showCol="false"  @back="$router.push({name:'home'})"></topHeader>
    <div class="list-cnt">
      <div v-for="(item,key) in list" :key="key" class="list-item">
        <div class="item-name"  >{{item.name}}</div>
        <div class="item-detail">
          <div class="item-time">
            <span v-if="item.beginTime">{{item.beginTime}}-{{item.endTime}}</span>
          </div>
          <div class="item-btn">
            <span v-if="item.examStatus === '3'||item.examStatus === '-2'||item.examStatus === '-1'" @click="view(item)">查看解析</span>
            <span :class="statusObj[item.examStatus]&&statusObj[item.examStatus].class" @click="linkTo(item)">{{statusObj[item.examStatus].label}}</span>
          </div>
        </div>
      </div>
      <div>
        <div v-if="list.length == 0">
          <none-data></none-data>
        </div>
        <list-footer title='这是我的底线' v-if="list.length > 5"></list-footer>
      </div>
    </div>
  </div>
</template>

<script>
import topHeader from "@/components/header/topHeader.vue";
import listFooter from '@/components/header/listFooter'
import { getMoonListAPI } from '@/api/moon'
import { Toast } from 'vant';
export default {
  name: "moonMatch",
  components: {
    topHeader,
    listFooter
  },
  data() {
    return {
      list:[],
      listQuery:{
        pageNum:1,
        pageSize:100,
      },
      statusObj:{ //答题状态  0未开始 1开始答题 2继续答题 3重新答题 -1已过期(无答题记录) -2(有答题记录)
        '0':{
          label:'未开始',
          class:'no-begin',
        },
        '1':{
          label:'开始答题',
          class:'has-begin',
        },
        '2':{
          label:'继续答题',
          class:'continue',
        },
        '3':{
          label:'重新答题',
          class:'reset-begin',
        },
        '-1':{
          label:'已过期',
          class:'expired',
        },
        '-2':{
          label:'已过期',
          class:'expired',
        },
      },
      toastPage:null,
    };
  },
  created() {
    this.getList()
  },
  watch: {},
  methods: {
    getList(){
      this.toastPage = Toast.loading({
          message: '加载中...',
          forbidClick: true,
          loadingType: 'spinner',
          duration: 0
        });
      getMoonListAPI(this.listQuery).then(res=>{
        this.toastPage.clear()
        if(res.data.code == 0){
          this.list = res.data.data.list
        }
      })
    },
    view(item){
      this.$router.push({name:'viewMatch',query:{id:item.id, type:'match'}})
    },
    linkTo(item){
      //答题状态  0未开始 1开始答题 2继续答题 3重新答题 -1已过期(无答题记录) -2(有答题记录)
      let begin = ()=>{
        this.$router.push({name:'match',query:{id:item.id, title:item.name}})
      }
      let conti = ()=>{
        this.$router.push({name:'match',query:{id:item.id, title:item.name,type:'continue'}})
      }
      let again = ()=>{
        this.$router.push({name:'match',query:{id:item.id, title:item.name}})
      }
      let status = {
        '0':()=> false,
        '1':begin,
        '2':conti,
        '3':again,
        '-1':()=> false,
        '-2':()=> false,
      }
      status[item.examStatus]()
      // Toast.fail('功能开发中')
      // this.$router.push({name:'match',query:{id:item.id, title:item.name}})
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .week-list{
    height: 100vh;
    background: #F2F2F2;
  }
  .list-cnt{
    padding-top: .49rem;
    background: #F2F2F2;
    .list-item{
      margin: .1rem .15rem;
      padding: .15rem .12rem;
      box-sizing: border-box;
      height: 1rem;
      background: #fff;
      border-radius: .05rem;
      .item-name{
        color: #000000;
        font-size: .14rem;
        height: .4rem;
        line-height: .2rem;
        font-weight: Medium;
      }
      .item-detail{
        margin-top: .05rem;
        line-height: .25rem;
        display: flex;
        justify-content: space-between;
      }
    }
  }

  .item-time{
    color: #999999;
    font-size: .11rem;
  }
  .item-btn{
    span{
      padding: .06rem .08rem;
      color: #4F79F2;
      border: .005rem solid #DDDDDD;
      margin-left: .08rem;
      border-radius: .03rem;
      font-size: .11rem;
    }
    .no-begin, .expired{
      color: #999999;
    }
    .has-begin{
      color: #F7592E;
      border: .005rem solid #F7592E;
    }
    .continue{
      color: #05ADB0;
      border: .005rem solid #05ADB0;
    }
    .reset-begin{
      color: #FC7A2E;
      border: .005rem solid #FC7A2E;
    }
  }
</style>
