<template>
  <!--在线学习-->
  <div class="lineStudy">
    <comHeader></comHeader>
    <div class="cont1">
      <p>
        导语：为贯彻《国务院关于进一步做好稳就业工作的意见》（国发〔2019〕28号）提出“实施基层公共就业服务经办能力提升计划”，根据人力资源和社会保障部针对新型冠状病毒感染的肺炎疫情防控工作需要，在疫情防控以及今后一段时间内，以基层公共就业服务业务工作为基础，对工作中所涉及的业务经办、就业服务、通用能力、重点工作和企业复工指导等进行在线培训，以提升基层就业服务工作人员标准化专业化服务水平。</p>
    </div>
    <ul class="cont2">
      <li :class="`active-${curIndex==index}`" v-for="(item,index) in list" :key="index"  @click="linkDetails(item,index)">{{item.showName}}</li>
    </ul>
  </div>
</template>

<script>
  import { getClassifyListAPI } from '@/api/xywApi';
  export default {
    name: 'HelloWorld',
    data() {
      return {
        list: [],
        curIndex:0,
      }
    },
    created() {
      this.getClassify();
    },
    watch: {},
    methods: {
      getClassify(){
        getClassifyListAPI().then(res=>{
          if (res.data.code==0) {
            if (res.data.data.length > 0 && res.data.data) {
              this.list = res.data.data;
            }
          }/* else {
            Toast.fail('检索信息获取失败');
          }*/
        })
      },
      linkDetails(item,index){
        this.curIndex=index;
        this.$router.push({path:'/business',query:{code:item.code,showName:item.showName}});
      }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  $index: 0;
  .lineStudy {
    width: 100%;

    .cont1 {
      width: 100%;
      height: 3.37rem;
      background: url("../../assets/img/column/top-bg.png") no-repeat;
      background-size: cover;

      p {
        padding-top: .62rem;
        line-height: .26rem;
        font-size: .14rem;
        color: #fff;
        font-weight: normal;
        width: 3.44rem;
        margin: 0 auto;
        text-indent: 2em;
        letter-spacing: -.003rem
      }
    }

    .cont2 {
      background: #fff;
      border-radius:.15rem .15rem 0 0;
      margin-top: -.4rem;
      padding-top: .35rem;
      li {
        width: 2.74rem;
        height: .4rem;
        background: #fff;
        border-radius: .2rem;
        border: 1px solid #02BCBE;
        text-align: center;
        line-height: .4rem;
        color: #02B0B2;
        font-size: .16rem;
        margin: 0 auto .28rem;
        box-shadow: .03rem .03rem .08rem rgba(0, 0, 0, 0.17);
      }

      .active-true{
        background: #02BCBE;
        color: #fff;
      }
    }
  }
</style>
