<template>
  <!--业务经办-->
  <div class="business">
    <comHeader></comHeader>
    <ul class="content">
      <van-list v-model="loading"
                :immediate-check="false"
                :finished="finished"
                :finished-text="noHave"
                @load="onLoad">
        <li v-for="(item,index) in list" :key="index" @click="linkDetails(item)">
          <div class="title"><img :src="`./static/img/${item.resourceType==5?'video':'pdf'}.png`" alt="">
            <h1>{{item.name}}</h1></div>
          <p v-if="item.test">{{item.test}}</p>
        </li>
      </van-list>

    </ul>
  </div>
</template>

<script>
  import {getResListAPI} from '@/api/xywApi';
  import {Icon, NavBar, List, Toast} from 'vant';

  export default {
    name: 'HelloWorld',
    data() {
      return {
        list: [
          {id: 1, name: '失业待遇王航办理流程', type: 'pdf', test: '练习题（共8题）'},
          {id: 2, name: '事业保险经办业务', type: 'video', test: '练习题（共8题）'},
          {id: 3, name: '失业待遇王航办理流程', type: 'pdf', test: '练习题（共8题）'},
          {id: 4, name: '失业待遇王航办理流程失业待遇王航办理流程失业待遇王航办理流程失业待遇王航办理流程', type: 'pdf'},
          {id: 5, name: '失业待遇王', type: 'video'},
        ],
        loading: false,
        finished: false,
        listQuery: {
          pageNum: 1,
          pageSize: 20,
          diyTypeCode: ''
        },
        pageCount: 0,
        isFirstEnter: false,
        showName: null,
        total: 0,
        toastPage: null,
        noHave: '',
      }
    },
    components: {
      "van-icon": Icon,
      "van-nav-bar": NavBar,
      "van-list": List
    },
    created() {
      this.isFirstEnter = true;
      this.listQuery.diyTypeCode = this.$route.query.code;
      this.showName = this.$route.query.showName;

      /*this.getList ();*/
    },
    watch: {},
    methods: {
      getList() {
        this.noHave='';
        this.toastPage = Toast.loading({
          message: '加载中...',
          forbidClick: true,
          loadingType: 'spinner',
          duration: 0
        });
        getResListAPI({...this.listQuery}).then(res => {
          if (res.data.status) {
            if (res.data.data.list.length > 0 && res.data.data.list) {
              this.list = res.data.data.list;
            }
            this.total = res.data.data.total || 0;
            this.pageCount = res.data.data.pages;
            if (this.total == 0) {
              this.finished = true;
              this.noHave = '暂无数据';
            } else if (this.pageCount == 1) {
              this.finished = true;
              this.noHave = '——这是我的底线——';
            }
            this.toastPage.clear();
          } else {
            Toast.fail('检索信息获取失败');
          }
        })
      },
      onLoad() {
        if(this.total==0||this.pageCount==1)return
        setTimeout(() => {
          this.getMoreList();
        }, 500)
      },
      getMoreList() {
        if (this.listQuery.pageNum < this.pageCount) {
          this.listQuery.pageNum++;
          getResListAPI({...this.listQuery}).then(res => {
            this.loading = true;

            if (res.data.status) {
              if (res.data.data.list.length > 0 && res.data.data.list) {
                this.list = [...this.list, ...res.data.data.list];
                this.total = res.data.data.total || 0;
                // 加载状态结束
                this.loading = false;
              }

            } else {
              Toast.fail('检索信息获取失败');
            }
          })

        } else {//数据加载完成
          this.finished = true;
          this.noHave = '——这是我的底线——';
        }

      },
      linkDetails(item) {
        if (item.resourceType == 5) {
          this.$router.push({path: '/play', query: {videoAndPdf: item.videoAndPdf, id: item.id}});
        } else if (item.resourceType == 10) {
          this.$router.push({path: '/pdf', query: {videoAndPdf: item.videoAndPdf, id: item.id}});
        }

      }
    },

    activated() {
      console.log(121212)
      if (!this.$route.meta.isBack || this.isFirstEnter) {
        this.list = [];// 把数据清空，可以稍微避免让用户看到之前缓存的数据
        // 如果isBack是false，表明需要获取新数据，否则就不再请求，直接使用缓存的数据
        this.loading = false;
        this.finished = false;
        this.listQuery = {
          pageNum: 1,
          pageSize: 20,
          diyTypeCode: ''
        };
        this.listQuery.diyTypeCode = this.$route.query.code;
        this.showName = this.$route.query.showName;
        this.getList();
        // console.log(this.$route.meta.isBack,this.isFirstEnter,'this')
      }
      // 恢复成默认的false，避免isBack一直是true，导致下次无法获取数据
      this.$route.meta.isBack = false
      this.isFirstEnter = false;
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .business {
    width: 100%;
    padding-top: .5rem;

    .content {
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
