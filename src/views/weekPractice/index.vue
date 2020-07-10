<template>
  <!--在线练习-->
  <div class="week-list">
    <topHeader header-title="在线答题" :showCol="false" @back="$router.push({name:'home'})"></topHeader>
    <div class="list-cnt">
        <div v-for="(item,key) in list" :key="key" class="list-item">
          <div class="item-time">{{key}}</div>
          <div class="item-el-child">
              <div v-for="(el,ind) in item" :key="ind" class="item-child" @click="linkTo(el)">
                <div class="item-child-cnt">
                  <div class="item-child-title">{{el.name}}</div>
                  <div class="item-child-has" v-if="el.isJoin === '1'">已参加</div>
                  <div v-else class="item-child-no">未参加</div>
                </div>
                <img src="@/assets/img/list/list-right.png" alt="">
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
import { Toast } from 'vant';
import { getWeekListAPI } from '@/api/week'
export default {
  name: "weekPractice",
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
      getWeekListAPI(this.listQuery).then(res=>{
        this.toastPage.clear()
        if(res.data.code == 0){
          this.list = res.data.data.map
        }
      })
    },
    linkTo(item){
      this.$router.push({name:'practice',query:{id:item.id, title:item.name}})
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
  padding-top: .44rem;
  background: #F2F2F2;
  .list-item{
    .item-time{
      font-size: .15rem;
      font-weight: Bold;
      padding-left:.15rem; 
      line-height: .445rem;
      height: .445rem;
    }
    .item-el-child{
      padding: 0 .15rem;
      background: #fff;
    }
  }
}
.item-child{
  display: flex;
  padding: .06rem 0 ;
  line-height: .25rem;
  justify-content: space-between;
  align-items: center;
  border-bottom: .005rem solid #EBEBEB;
  img{
    height: .115rem;
    width: .075rem;
  }
  &:last-child{
    border-bottom: 0;
  }
  .item-child-cnt{
    font-size: .12rem;
  }
  .item-child-title{
    font-weight: medium;
    color: #000000;
    font-size: .15rem;
  }
  .item-child-no{
    color: #FC7B2D
  }
  .item-child-has{
    color: #999999;
  }
}
</style>
