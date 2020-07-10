<template>
  <div class="pdf_wrap">
    <!-- <iframe :src="`${this.domain}${requestPath.file}?fileName=${this.videoAndPdf}&isOnLine=true`" frameborder="0" class="iframe"> </iframe> -->
    <div v-if="pdfAndPath" v-html="iframeHtml" style="width:100%;height:100%" >
		</div>
    <ul class="back_btn">
      <li @click="collection"><img :src="`./static/img/icon_soucang_${isColl?'sel':'nor'}.png`" alt=""></li>
      <li @click="goBack"><img src="../../assets/img/public/fanhui.png" alt=""></li>
    </ul>
    <!-- <iframe id='previewPdf' :src="'/static/pdf/web/viewer.html?file=' + `${this.domain}/${this.pdfAndPath}`" height="100%"
            width="100%" frameborder="0">
    </iframe> -->
  </div>
</template>
<script>
import { Toast,Icon } from 'vant';
import { uploadUrl, uploadPath, requestPath } from "@/utils/global.js";
import { getPathAPI,getCollectioncheckAPI,addCollectionAPI,delCollectionAPI} from '@/api/xywApi';
export default {
  name: 'pdf',
  components: {
  "van-icon":Icon
  },
  data () {
    return {
      domain: process.env.BASE_API,
      requestPath: requestPath,
      videoAndPdf:"",
      pdfAndPath:'' ,
      iframeHtml:'',
      isColl:false,
    }
  },
  created () {
    this.getCollectioncheck();
  },
  mounted () {
     this.videoAndPdf=this.$route.query.videoAndPdf;
     this.getPath();
  },
  methods: {
    getCollectioncheck(){
      getCollectioncheckAPI({
        goodsId:this.$route.query.id,
        goodsType:5,
      }).then(res=>{
        if(res.data.status){
          this.isColl=res.data.data;
        }
      })
    },
    getPath(){
      let toastPage = Toast.loading({
        message: '加载中...',
        forbidClick: true,
        loadingType: 'spinner',
        duration: 0
      });
      getPathAPI({fileName:this.videoAndPdf}).then(res => {
          if (res.data.status) {
            this.pdfAndPath=res.data.data;
            this.iframeHtml= `<iframe src='/static/pdf/web/viewer.html?file=${this.domain}/file/${this.pdfAndPath}' frameborder='0' width='100%' height='100%'></iframe>`
            toastPage.clear();
          }
        })

    },
    goBack(){
      this.$router.go(-1)
    },
    /*收藏*/
    collection(){
      let api=null,data=null;
      if(this.isColl){
        api=delCollectionAPI;
        data={
          goodsId:this.$route.query.id,
          objectType:5,
        };
      }else{
        api=addCollectionAPI;
        data={
          objectId:this.$route.query.id,
          objectType: 'PDF',
        };
      }
      api(data).then(res=>{
        if(res.data.status){
          this.isColl=!this.isColl;
          Toast.success(`${!this.isColl?'取消收藏':'收藏成功'}`);
        }else{
          Toast.fail('收藏失败');
        }
      })
    },
  }
}
</script>

<style lang="less" scoped>
.pdf_wrap{
  width: 100%;
  height: 100%;
  position: relative;
  .iframe{
    width: 100%;
    height: 100%;
  }
  .back_btn{
    position: absolute;
    bottom:.8rem;
    right: .15rem;
    li{
      width: .3rem;
      height: .3rem;
      display: flex;
      align-items: center;
      justify-content: center;
      background:#f18a23;
      border-radius: .1rem;
      box-shadow: .03rem .03rem .05rem rgba(0,0,0,0.2);
      margin-bottom: .1rem;
      img{
        width: .17rem;
        object-fit: contain;
      }

    }
    /*.van-icon {
      // vertical-align: middle;
      margin-right: 2px
    }*/
  }
}
</style>
