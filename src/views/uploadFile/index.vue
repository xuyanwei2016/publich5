<template>
  <!-- 下载资料-->
    <div class="uploadFile">
      <comHeader></comHeader>
      <ul class="cont2">
        <li v-for="(item,index) in list" :key="index" @click="upload(item)">
          <h1>{{item.name}}</h1>
          <!--<img src="./static/file/竞赛通知附件.docx" alt="">-->
        </li>
      </ul>
    </div>
</template>

<script>
    export default {
        name: 'HelloWorld',
        data() {
            return {
              list:[
                {name:'竞赛通知（含附件）.docx',link:'./static/file/竞赛通知（含附件）.docx'},
                {name:'比武政策目录.docx',link:'./static/file/文件政策/比武政策目录.docx'},
                {name:'国务院关于进一步做好稳就业工作的意见(国发[2019]28号).docx',link:'./static/file/文件政策/10.国务院关于进一步做好稳就业工作的意见(国发[2019]28号).docx'},
                {name:'关于推进全方位公共就业服务的指导意见.doc',link:'./static/file/文件政策/11.关于推进全方位公共就业服务的指导意见.doc'},
                {name:'关于进一步加大创业担保贷款贴息力度全力支持重点群体创业就业的通知(财金[2020]21号).docx',link:'./static/file/文件政策/12.关于进一步加大创业担保贷款贴息力度全力支持重点群体创业就业的通知(财金[2020]21号).docx'},
                {name:'国务院扶贫办关于进一步支持和促进重点群体创业就业有关税收政策的通知(财税[2019]22号).docx',link:'./static/file/文件政策/13.国务院扶贫办关于进一步支持和促进重点群体创业就业有关税收政策的通知(财税[2019]22号).docx'},
                {name:'关于做好当前形势下高校毕业生就业创业工作的通知（人社部发[2019]72号）.doc',link:'./static/file/文件政策/14.关于做好当前形势下高校毕业生就业创业工作的通知（人社部发[2019]72号）.doc'},
                {name:'关于进一步加大就业扶贫力度 提高劳务组织化程度的通知(人社部发（2018）46号).docx',link:'./static/file/文件政策/15.关于进一步加大就业扶贫力度 提高劳务组织化程度的通知(人社部发（2018）46号).docx'},
                {name:'国务院扶贫办关于做好易地扶贫搬迁就业帮扶工作的通知(人社部发[2019]47号).docx',link:'./static/file/文件政策/16.国务院扶贫办关于做好易地扶贫搬迁就业帮扶工作的通知(人社部发[2019]47号).docx'},
                {name:'关于深入推进扶贫劳务协作提升劳务组织化程度的通知（人社厅发[2018]75号）.docx',link:'./static/file/文件政策/17.关于深入推进扶贫劳务协作提升劳务组织化程度的通知（人社厅发[2018]75号）.docx'},
                {name:'国务院办公厅关于应对新冠肺炎疫情影响(国办发[2020]6号).docx',link:'./static/file/文件政策/18.国务院办公厅关于应对新冠肺炎疫情影响(国办发[2020]6号).docx'},
                {name:'竞赛通知.docx',link:'./static/file/竞赛通知.docx'},
                {name:'竞赛通知附件.docx',link:'./static/file/竞赛通知附件.docx'},

              ]
            }
        },
        created() {
        },
        watch: {},
        methods: {
          upload(item){
            window.open(encodeURI(item.link));
          }
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.uploadFile{
  width: 3.75rem;
  height: 100%;
  background: #f3f3f3;
  margin: 0;
  padding: 0;
  .cont2 {
    padding-top: .55rem;
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
}
</style>
