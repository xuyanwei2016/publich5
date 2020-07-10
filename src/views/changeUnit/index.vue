<template>
  <!--更改单位-->
    <div class="changeUnit">
      <comHeader></comHeader>
      <ul class="cont1">
        <li>
          <h1>单位级别</h1>
          <div class="unit">
            <h2 :class="curUnit==1&&'activeH2'"  @click="unitType(1)">部署单位</h2>
            <h2 :class="curUnit==2&&'activeH2'"  @click="unitType(2)">地方</h2>
          </div>
        </li>

        <li class="required" v-show="curUnit==2">
          <h1>所在地区</h1>
          <!--<div class="behind" @click="isShow=true,curShow=1">
            <h2>北京 北京市 朝阳区</h2>
          </div>-->
          <div class='behind'  @click="cityChecked">
            <x-address title="" v-model="value" :list="addressData" placeholder="请选择地址" :show.sync="showAddress" @on-shadow-change='changeAdd' @on-hide="saveAddress"></x-address>
          </div>
        </li>
        <li class="required">
          <h1>单位名称</h1>
          <div class="behind" @click="isShow=true,curShow=(Number(curUnit)+1)">
            <h2>{{curUnit==1?unit1Name:unit2Name}}</h2>
          </div>
        </li>
      </ul>

      <div class="cont2" v-if="isShow" :class="`contUnit${curShow}`">
        <!--所在地区弹出框-->
        <!--<div class="region"  v-if="curShow==1">
          &lt;!&ndash;<van-area title="" :area-list="addressData" :columns-placeholder="['请选择', '请选择', '请选择']"/>&ndash;&gt;
          &lt;!&ndash;:default-index="curChangUnit"&ndash;&gt;
          &lt;!&ndash;<van-picker :show-toolbar="true" :columns="addressData" value-key="name"  @confirm="onConfirm" @cancel="onCancel"/>&ndash;&gt;
          &lt;!&ndash;<van-area
            title="标题"
            :area-list="addressData"
            :columns-placeholder="['请选择', '请选择', '请选择']"
          />&ndash;&gt;
          &lt;!&ndash;{{addressData}}&ndash;&gt;
          &lt;!&ndash;<x-address title="" v-model="value" :list="this.addressData " placeholder="请选择地址" @on-shadow-change='changeAdd' ></x-address>&ndash;&gt;
          <x-address style="display:none;" title="title" v-model="value" :list="addressData" placeholder="请选择地址" :show.sync="showAddress"></x-address>
        </div>-->

        <!--单位弹出框-->
        <div class="unit" v-if="curShow==2"  >
          <!--<div class="button">
            <h3 @click="isShow=false,curShow=null">取消</h3>
            <h3>确认</h3>
          </div>-->
          <ul class="ageMain">
            <!--<li v-for="(item,index) in unitName" :key="index" :class="index==curUnit?'active':''">{{item.name}}</li>-->
            <van-picker :show-toolbar="true" :columns="unitList" value-key="name" :default-index="curChangUnit"  @confirm="onConfirmUnit" @cancel="onCancel"/>
          </ul>
        </div>

        <!--用户名弹出框-->
        <div class="unitName" v-if="curShow==3">
          <input type="text" placeholder="在此输入单位名称" v-model="unit.unit2Name"  maxlength="200">
          <i v-if="isRealname">请输入单位名称</i>
          <ul>
            <li @click="isShow=false,curShow=null">取消</li>
            <li @click="changeUnit">确定</li>
          </ul>
        </div>
      </div>
    </div>
</template>

<script>
  import '../../css/xyw.css';
  import {Area, Icon, List, NavBar, Picker, Toast} from 'vant';
  import {getAreaTreeAPI,getDepartListAPI,getUserMessageAPI,saveUsermessageAPI} from '@/api/xywApi.js';
    export default {
        name: 'HelloWorld',
        data() {
            return {
              isRealname:false,
              isShow:false,
              unitList:[],
              curShow:1,
              addressData:[],
              value:[],
              showAddress:false,
              curUnit:1,
              curChangUnit:3,
              unit:{
                name:'',
                unit2Name:'',
              },
              userMssage:{
                unitLevel:1,
              },
              unit1Name:'',
              unit2Name:'',
            }
        },
      components: {
        "van-picker":Picker,
        "van-area":Area,
        "van-icon":Icon,
        "van-nav-bar":NavBar,
        "van-list":List
      },
        created() {
          this.getAreaTreeList();
          this.getDepartList();
          this.getUserMessage();
        },
        watch: {
          'unit.unit2Name'(n,o){
            if(this.unit.unit2Name==''){
              this.isRealname=true;
            }else{
              this.isRealname=false;
            }
          },
        },
        methods: {
          /*获取部门列表*/
          getDepartList(){
            getDepartListAPI().then(res=>{
              if(res.data.status){
                this.unitList=res.data.data;
              }
            })
          },
          /*获取用户补全信息*/
          getUserMessage(){
            getUserMessageAPI().then(res=>{
              if(res.data.status){
                this.userMssage=res.data.data;
                this.curUnit=this.userMssage.unitLevel||1;
                if(this.userMssage.unitLevel==2){
                  this.unit2Name=this.userMssage.unitName;
                }else{
                  this.unit1Name=this.userMssage.unitName;
                }
                if(this.userMssage.province!=''&&this.userMssage.province!=null&&this.userMssage.reserve10){
                  this.value=JSON.parse(res.data.data.reserve10);
                }

              }
            })
          },

          getAreaTreeList(){//省市区
            getAreaTreeAPI().then(res=>{
              if( res.data.status ){
              this.addressData=res.data.data;
              }
            })
          },
          onConfirmUnit(value, index){
            console.log('单位名称',value);
            this.unit.name=value.name;
            this.saveFn(1);
          },
          onCancel(){
            this.isShow=false;
            this.curShow=null;
          },
          changeUnit(){
            if(this.unit.unit2Name==''||this.unit.unit2Name==null){
              this.isRealname=true;
              return
            }
            this.saveFn(2);
          },
          saveFn(n){
            let data={...this.userMssage};
            data.unitLevel=this.curUnit;
            if(n==1){
              data.unitName=this.unit.name;
            }
            if(n==2){
              data.unitName=this.unit.unit2Name;
            }

            if(n==3){
              data.province=this.unit.province;
              data.city=this.unit.city;
              data.area=this.unit.area;
              data.reserve10=this.unit.reserve10;
            }
            if(data.reserve3!=''&&data.reserve3){
              data.reserve3=new Date().getFullYear()-Number(this.userMssage.reserve3)+1;
            }
            console.log(data)
            saveUsermessageAPI(data).then(res=>{
              if(res.data.status){
                this.curShow=null;
                this.isShow=false;
                if(n==1||n==2){
                  this.userMssage.unitName=this.curUnit==1?this.unit.name:this.unit.unit2Name;
                  this.curUnit==1?this.unit1Name=this.unit.name:this.unit2Name=this.unit.unit2Name;
                }

              }
            })
          },
          changeAdd(i,n){
            /*debugger*/
            console.log('所在地区',i,n)
            if(n.length>0){
              this.unit.province=n[0];
              this.unit.city=n[1];
              this.unit.area=n[2]||null;
              this.unit.reserve10=i;
            }

          },
          saveAddress(i,n){
            console.log('点击完成',this.value)
            this.saveFn(3);
          },
          cityChecked(){},

          changUnit($event){
          },
          unitType(n){
            this.curUnit=n;
            /*this.userMssage.unitLevel=n;*/
          },
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.changeUnit{
  width: 100%;
  height: 100%;
  background: #f3f3f3;
  .cont1{
    padding-top: .44rem;
    li{
      padding: .12rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #fff;
      margin-bottom: .05rem;
      h1{
        color: #666666;
        font-size: .15rem;
        font-weight: normal;
      }
      .unit{
        width: 2.5rem;
        line-height: .24rem;
        height: .24rem;
        display: flex;
        justify-content: flex-start;

        h2{
          font-size: .13rem;
          font-weight: normal;
          margin-right: .11rem;
          width: .6rem;
          background: #E3E3E3;
          text-align: center;
          border-radius: .02rem;
        }
        .activeH2{
          background: #F96E51;
          color: #fff;
        }
      }
      .behind {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        min-width: .8rem;
        min-height: .2rem;
        img {
          width: .45rem;
          object-fit: cover;
        }

        h2 {
          max-width: 2.3rem;
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
        width: .07rem;
        height: .12rem;
        display: block;
        content: '';
        background: url("../../assets/img/my/icon_jiantou.png") no-repeat;
        background-size: 100%;
        margin-left: .12rem;
      }
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
    .region{
      height: 4.12rem;
      width: 100%;
      background: #fff;
      border-radius: .1rem .1rem 0 0;
    }
    .unitName{
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
  .contUnit3{
    display: flex;
    justify-content: center;
    align-items: center;

  }
  .contUnit2,.contUnit1{
    display: flex;
    flex-direction: column-reverse;
  }

}
</style>
