<template>
  <!--收藏课件-->
  <div class="Courseware">
    <div class="cont1">
      <noBgHeader></noBgHeader>
      <div class="typeCss">
        <ul>

          <li v-for="(itemT,indexT) in typeData" :key="indexT" :class="curType==indexT&&'active'"
              @click="changType(indexT,itemT)">{{itemT.showName}}
          </li>

        </ul>
      </div>
    </div>

    <ul class="content">
      <van-list  v-model="loading"
                 :immediate-check="false"
                 :finished="finished"
                 :finished-text="noHave"
                 @load="onLoad">
      <li v-for="(item,index) in list" :key="index" @click="linkDetails(item)">
        <div class="title"><img :src="`./static/img/${item.type==6?'video':'pdf'}.png`" alt="">
          <h1>{{item.name}}</h1></div>
        <p v-if="item.test">{{item.test}}</p>
      </li>
      </van-list>
    </ul>

  </div>
</template>

<script>
  import {getClassifyListAPI,getCollectionListAPI} from '@/api/xywApi';
  import {Icon, List, NavBar, Picker,Toast} from "vant";

  export default {
    name: 'HelloWorld',
    data() {
      return {
        typeData: [],
        curType: 0,
        list: [
          {id: 1, name: '失业待遇王航办理流程', type: 'pdf', test: '练习题（共8题）'},
          {id: 2, name: '事业保险经办业务', type: 'video', test: '练习题（共8题）'},
          {id: 3, name: '失业待遇王航办理流程', type: 'pdf', test: '练习题（共8题）'},
          {id: 4, name: '失业待遇王航办理流程失业待遇王航办理流程失业待遇王航办理流程失业待遇王航办理流程', type: 'pdf'},
          {id: 5, name: '失业待遇王', type: 'video'},
        ],
        loading: false,
        finished: false,
        listQuery:{
          pageNum:1,
          pageSize:20,
          code:null
        },
        pageCount:0,
        isFirstEnter:false,
        noHave:'',//
      }
    },
    created() {
      this.isFirstEnter=true;
      this.getClassify();
      this.getList(1);
    },
    components: {
      "van-list": List
    },
    watch: {},
    methods: {
      onLoad(){
        let self=this;
        setTimeout(()=>{
          self.getList();
        },500)
      },
      changType(index,itemT) {
        this.curType = index;
        this.listQuery.pageNum=1;
        this.listQuery.code=itemT.code;
        this.list=[];
        this.getList(1);
      },
      getClassify() {
        this.typeData = [{showName: '全部', id: null}];
        getClassifyListAPI().then(res => {
          if (res.data.code == 0) {
            if (res.data.data.length > 0 && res.data.data) {
              this.typeData = [...this.typeData, ...res.data.data];
            }
          } else {
            Toast.fail('获取数据失败');
          }
        })
      },
      getList(n){
        this.loading = true;
        this.noHave='';
        if(n==1){//页面进来
          this.list=[];
          this.dataFn(this.listQuery);
          return
        }
        if (this.listQuery.pageNum < this.pageCount) {
          this.listQuery.pageNum++;
          this.dataFn(this.listQuery);
        } else {//数据加载完成
          this.finished = true;
          this.noHave='——这是我的底线——';
        }
      },
      dataFn(data){
        getCollectionListAPI(this.listQuery).then(res=>{
          if(res.data.status){
            this.list=res.data.data.list;
            this.total = res.data.data.total || 0;
            this.pageCount = res.data.data.pages;
            if(this.total==0){
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
      linkDetails(item){
        if(item.type==6){
          this.$router.push({path:'/play',query:{videoAndPdf:item.logo,id:item.videoId}});
        }else if(item.type==5){
          this.$router.push({path:'/pdf',query:{videoAndPdf:item.logo,id:item.pdfId}});
        }

      }
    },
    activated() {
      if(!this.$route.meta.isBack|| this.isFirstEnter){
        this.list=[];// 把数据清空，可以稍微避免让用户看到之前缓存的数据
        // 如果isBack是false，表明需要获取新数据，否则就不再请求，直接使用缓存的数据
        this.loading=false;
        this.finished=false;
        this.listQuery={
          pageNum: 1,
          pageSize: 20,
          code:null
        },
        this.getList (1);
        // console.log(this.$route.meta.isBack,this.isFirstEnter,'this')
      }
      // 恢复成默认的false，避免isBack一直是true，导致下次无法获取数据
      this.$route.meta.isBack=false
      this.isFirstEnter=false;
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .Courseware {
    width: 100%;
    height: 100%;

    .cont1 {
      width: 100%;
      height: 1rem;
      overflow-y: hidden;
      position: fixed;
      z-index: 111;
      top: 0;
      left: 0;
      background: linear-gradient(left, #297bfb, #3092fd);
      background: -ms-linear-gradient(left, #297bfb, #3092fd);
      background: -webkit-linear-gradient(left, #297bfb, #3092fd);
      background: -moz-linear-gradient(left, #297bfb, #3092fd);
      box-shadow: 0 0 .1rem rgba(0, 0, 0, 0.2);

      .typeCss {
        width: 3.51rem;
        padding-top: .6rem;
        height: .5rem;
        overflow-x: scroll;
        margin: 0 auto;

        ul {
          width: 100%;
          display: flex;
          align-items: center;
          height: .3rem;

          li {
            margin: 0 .1rem;
            float: left;
            display: inline-block;
            white-space: nowrap;
            color: #DFEDFE;
            font-size: .15rem;
            height: .42rem;
            line-height: .42rem;
          }

          .active {
            font-weight: bold;
            color: #fff;
          }

          .active:after {
            content: '';
            height: .03rem;
            background: #fff;
            width: 100%;
            display: block;
            border-radius: .015rem;
          }
        }
      }
    }

    .content {
      padding-top: 1.2rem;

      li {
        margin: 0 .15rem;
        padding: .1rem 0;
        border-bottom: 1px solid #EEEEEE;

        .title {
          display: flex;
          justify-content: flex-start;

          img {
            width: .3rem;
            height: .165rem;
            margin-top: .03rem;
          }

          h1 {
            padding-left: .05rem;
            font-size: .16rem;
            font-weight: normal;
            color: #000;
            line-height: .24rem;
          }
        }

        p {
          color: #999999;
          font-size: .12rem;
          height: .12rem;
          line-height: .12rem;
          padding-left: .36rem;
          padding-top: .07rem;
          font-weight: normal;
        }
      }
    }
  }
</style>
