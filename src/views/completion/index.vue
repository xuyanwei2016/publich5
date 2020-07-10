<template>
  <!--补全个人信息-->
  <div class="completion">
    <comHeader></comHeader>

    <ul class="cont1">
      <li class="height1">
        <h1>头像</h1>
        <input id="upload_file" type="file" accept='image/*' name="file" @change="fileChange($event)" style="display: none"/>
        <div class="behind"  @click="fileClick()"><!--reserve4 -->
          <img :src="img?img:(imgId?imgLink(imgId):defoultHead)" alt="">

        </div>
      </li>
      <li class="height2 required">
        <h1>真实姓名</h1>
        <div class="behind" @click="curShow=1,isShow=true">
          <h2>{{userMssage.realName}}</h2>
        </div>
      </li>
      <li class="height2 required">
        <h1>年龄</h1>
        <div class="behind" @click="curShow=2,isShow=true">
          <h2 v-if="userMssage.reserve3">{{userMssage.reserve3}}岁</h2>
        </div>
      </li>
      <li class="height2 required">
        <h1>单位名称</h1>
        <div class="behind" @click="$router.push('/mychangeUnit')">
          <h2 style="text-align: right;">{{userMssage.unitName}}</h2>
        </div>
      </li>
      <li class="heightAuto required">
        <h1>工作分类</h1>
        <div class="behind" @click="curShow=3,isShow=true">
          <h2>{{userMssage.reserve2==1?'职业指导人员（市、县级公共就业服务人员）':userMssage.reserve2==null?'':'基层公共就业服务人员（劳动保障协理员）'}}</h2>
        </div>
      </li>
      <li class="height2">
        <h1>手机号</h1>
        <div class="behind">
          <h2 style="padding-right:.12rem">{{userMssage.reserve1}}</h2>
        </div>
      </li>
    </ul>

    <div class="cont2" :class="`contUser${curShow}`" v-if="isShow">
      <!--用户名弹出框-->
      <div class="userName" v-if="curShow==1">
        <input type="text" placeholder="在此输入您的真实姓名" v-model="user.realName" maxlength="10">
        <i v-if="isRealname">请输入真实姓名</i>
        <ul>
          <li @click="isShow=false,curShow=null">取消</li>
          <li @click="saveFn(1)">确定</li>
        </ul>
      </div>

      <!--年龄弹出框-->
      <div class="age" v-if="curShow==2">
        <!--<div class="button">
          <h3 @click="isShow=false,curShow=null">取消</h3>
          <h3 @click="saveFn">确认</h3>
        </div>-->
        <!--<ul class="ageMain">
          <li v-for="(item) in (curYear+100)" :key="item" v-if="item>=curYear" :class="item==curChangYear?'active':''">{{item}}年</li>
        </ul>-->
        <!--<van-picker :show-toolbar="false" :columns="columns" :default-index="curChangYear" @change="onChange"/>-->
        <van-picker :show-toolbar="true" :columns="columns" :default-index="curChangYear"  @confirm="onConfirmAge" @cancel="onCancel"/>
      </div>


      <!--单位弹出框-->
      <div class="unit" v-if="curShow==3">
        <!--<div class="button">
          <h3 @click="isShow=false,curShow=null">取消</h3>
          <h3 @click="saveFn">确认</h3>
        </div>-->
        <!--<ul class="ageMain">
          <li v-for="(item,index) in unitName" :key="index" :class="index==curUnit?'active':''">{{item}}</li>
        </ul>-->
        <van-picker :show-toolbar="true" :columns="columnsUnit" :default-index="curChangUnit"  @confirm="onConfirmUnit" @cancel="onCancel"/>
      </div>

    </div>

  </div>
</template>

<script>
  import '../../css/xyw.css';
  import {saveUsermessageAPI,getJobAPI,getUserMessageAPI,saveImgAPI} from '@/api/xywApi.js';
  import {Icon, List, NavBar,Picker,Toast} from "vant";
  import $ from 'jquery';
  import defoultHead from '../../assets/img/my/head.png';
  import Cookies from 'js-cookie';

  export default {
    name: 'HelloWorld',
    data() {
      return {
        defoultHead:defoultHead,
        value:'',
        curYear:null,
        isShow:false,
        isRealname:false,
        curShow:3,
        curChangYear:null,
        unitName:['职业指导人员（市、县级公共就业服务人员）','基层公共就业服务人员','劳动保障协理员','职业指导人员'],
        curUnit:1,
        user:{
          realName:'',
          reserve3:'',
        },
        userMssage:{
          realName:'',
          reserve3:'',
        },
        columns: [],
        curChangUnit:0,
        columnsUnit:[],
        realName:'',
        addressData:[],
        img:'',
        imgId:'头像',
      }
    },
    components: {
      "van-picker":Picker,
      "van-icon":Icon,
      "van-nav-bar":NavBar,
      "van-list":List
    },
    created() {
      if(this.$route.query.type=='edit'){
        console.log(this.$route.meta);
        this.$route.meta.title = '修改个人信息';
      }
      this.curYear=new Date().getFullYear()-100;
      this.curChangYear=new Date().getFullYear()-this.curYear-15;
      for(let i=this.curYear;i<=new Date().getFullYear();i++){
        this.columns=[...this.columns,i+'年'];
      }
      this.user.age=this.columns[this.curChangYear];
      this.user.id=this.$store.state.userId;
      this.getUserMessage();
    },
    mounted() {
      this.getJob();
    },
    watch: {
      'user.realName'(n,o){
        if(this.user.realName==''){
          console.log('监听年龄');
          this.isRealname=true;
        }else{
          this.isRealname=false;
        }
      },
    },
    methods: {
      /*调用相册&相机*/
      fileClick() {
        $('#upload_file').click();
      },
      fileChange(el) {
        let self=this;

        if(el.target.files[0].type.indexOf('image'>=0)){

          let len='data:image/jpeg;base64,'.length;
          lrz(el.target.files[0],{width: 400})
            .then(function (rst) {
              self.img=rst.base64;
              let suffixName=rst.origin.name.slice(rst.origin.name.indexOf('.'));
              let imgStr=rst.base64.substring(len);
              // 处理成功会执行
              /*self.imgList.push(rst.base64);*/
              let data={code: imgStr,
                contentType: rst.origin.type,
                originalFileName:rst.origin.name,
                size:rst.fileLen,
                suffixName: suffixName};
              /*var formFile = new FormData();

              formFile.append("file", fileObj);
              var data = formFile;*/

              var bytes = window.atob(self.img.split(',')[1]);
              var array = [];
              for(var i = 0; i < bytes.length; i++){
                array.push(bytes.charCodeAt(i));
              }
              var blob = new Blob([new Uint8Array(array)], {type: 'image/jpeg'});
              var fd = new FormData();
              fd.append('file',blob, Date.now() + '.jpg');



              saveImgAPI(fd).then(res=>{
                self.imgId=res.data;
                self.saveFn(4);
              })
            })
            .catch(function (err){
              // 处理失败会执行
            })
            .always(function () {
              // 不管是成功失败，都会执行
            });

        }else{
          Toast.fail('请选择图片');
        }
      },



      /*获取用户补全信息*/
      getUserMessage(){
        getUserMessageAPI().then(res=>{
          if(res.data.status){
            this.userMssage=res.data.data;
            this.imgId=this.userMssage.reserve4;
            this.$store.state.isFirstLogin=res.data.data.reserve5;
            Cookies.set('isFirstLogin', res.data.data.reserve5);
          }
        })
      },
      getJob(){
        this.columnsUnit=[];
        getJobAPI().then(res=>{
          if(res.data.status){
            Object.keys(res.data.data).forEach((item)=>{
              let obj={code:item,text:res.data.data[item]};
              this.columnsUnit=[...this.columnsUnit,obj];

            })
          }
        })
      },

      /*改变年龄*/
      onConfirmAge(value, index){
        this.user.age=value.slice(0,4);
        this.saveFn(2);

      },
      /*改变单位*/
      onConfirmUnit(value, index){
        this.user.reserve2=value.code;
        this.saveFn(3);
      },
      onCancel(){
        this.isShow=false;
        this.curShow=null;
      },
      saveFn(n){
        let data={...this.userMssage};
        if(n==1){
          if(this.user.realName==''||this.user.realName==null){
            this.isRealname=true;
            return
          }
          data.realName=this.user.realName;
        }
        if(n==2){
          this.user.reserve3=Number(this.user.age);
          data.reserve3=this.user.age;
        }else if(this.userMssage.reserve3&&this.userMssage.reserve3!=null&&this.userMssage.reserve3!=''){
          data.reserve3=new Date().getFullYear()-Number(this.userMssage.reserve3)+1;
        }
        if(n==3){
          data.reserve2=this.user.reserve2;
        }
        if(n==4){
          data.reserve4=this.imgId;
        }


        saveUsermessageAPI(data).then(res=>{
          if(res.data.status){
            this.curShow=null;
            this.isShow=false;
            if(n==1){
              this.userMssage.realName=this.user.realName;
            }
            if(n==2){
              this.userMssage.reserve3=new Date().getFullYear()-Number(this.user.age)+1;
            }
            this.userMssage.reserve2=data.reserve2;
          }
        })
      },

    },
    beforeDestroy() {
      this.getUserMessage();
      /*this.$store.state.isFirstLogin=res.data.data.reserve5;
        Cookies.set('isFirstLogin', res.data.data.reserve5);*/
    },
    /*reserve5==0 Cookies.set('isFirstLogin', '');*/
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .completion {
    background: #f2f2f2;
    width: 100%;
    height: 100%;

    .cont1 {
      padding-top: .44rem;

      li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 0rem 0 .14rem;
        background: #fff;
        margin-bottom: .05rem;

        h1 {
          font-size: .15rem;
          color: #666666;
          font-weight: normal
        }

        .behind {
          display: flex;
          justify-content: space-between;
          align-items: center;
          min-width: .24rem;
          min-height: .2rem;
          img {
            width: .45rem;
            height: .45rem;
            object-fit: cover;
            border-radius: 50%;
            object-position: top;
          }

          h2 {
            max-width: 2.24rem;
            display: inline-block;
            color: #000000;
            font-size: .15rem;
            font-weight: normal;

            /*overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;*/
            line-height: .2rem;
          }
        }

        .behind:after {
          width: .31rem;
          height: .12rem;
          display: block;
          content: '';
          background: url("../../assets/img/my/icon_jiantou.png") no-repeat center center;
          background-size: contain;
          margin: .04rem 0;

        }

        &:last-child .behind:after {
          background: none;
          width: 0;
          margin-left: 0;
        }
      }

      .height1 {
        height: .7rem;
      }

      .height2 {
        height: .5rem;
      }

      .heightAuto {
        padding: .12rem 0rem .12rem .14rem;
      }
      .required h1{
        position: relative;

      }
      .required h1:before{
        content: '*';
        position: absolute;
        left: -.07rem;
        top:.03rem;
        color: #f56c6c;
      }
    }

    .cont2 {
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.3);
      position: fixed;
      top: 0;
      left: 0;
      z-index: 1111;

      .userName {
        width: 3.01rem;
        height: 1.34rem;
        border-radius: .08rem;
        background: #fff;
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        input {
          width: 2.45rem;
          height: .4rem;
          background: #f6f6f6;
          border: none;
          font-size: .14rem;
          padding: 0 .12rem;
          margin: .23rem 0 .22rem 0;
        }

        input::-webkit-input-placeholder {
          color: #D1D1D1;
        }
        input:-moz-placeholder {
          color: #D1D1D1;
        }
        input:-ms-input-placeholder {
          color: #D1D1D1;
        }
        i{
          position: absolute;
          width: 2.69rem;
          font-style: normal;
          color: #f56c6c;
          font-size: .11rem;
          top: .65rem;
          left:.21rem;
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
    .contUser1{
      display: flex;
      justify-content: center;
      align-items: center;

    }
    .contUser2,.contUser3{
      display: flex;
      flex-direction: column-reverse;
    }
    .age{
      height: 2.59rem;
      width: 100%;
      background: #fff;

      .button{
        width: 100%;
        display: flex;
        justify-content: space-between;
        height: .44rem;
        background: #f6f6f6;
        h3{
          color: #4C7AF3;
          font-size: .15rem;
          font-weight: normal;
          padding: 0 .12rem;
          line-height: .44rem;
        }
      }

      ul{
        width: 100%;height: 2.15rem;overflow-y: scroll;
        li{
          width: 100%;
          height: .5rem;
          border-bottom: 1px solid #E3E3E3;
          text-align: center;
          line-height: .5rem;
          color: #555555;
          font-size: .17rem;
        }
        .active{
          height:.65rem;
          line-height: .65rem;
          font-size: .2rem;
          color: #000000;
        }
        li:last-child{border-bottom: none}
      }
    }
    .unit{
      height: 2.62rem;
      width: 100%;
      background: #fff;
      .button{
        width: 100%;
        display: flex;
        justify-content: space-between;
        height: .44rem;
        background: #f6f6f6;
        h3{
          color: #4C7AF3;
          font-size: .15rem;
          font-weight: normal;
          padding: 0 .12rem;
          line-height: .44rem;
        }
      }
      ul{
        width: 100%;height: 2.18rem;overflow-y: scroll;
        li{
          width: 100%;
          height: .5rem;
          border-bottom: 1px solid #E3E3E3;
          text-align: center;
          line-height: .5rem;
          color: #555555;
          font-size: .17rem;
        }
        .active{
          height:.65rem;
          line-height: .65rem;
          font-size: .2rem;
          color: #000000;
        }
        li:last-child{border-bottom: none}
      }
    }
  }
</style>
