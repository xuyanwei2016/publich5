<template>
  <!--在线练习-->
  <div class="practice">
    <topHeader :header-title="topTitle" @back="backTo">
      <template>
        <div v-if="iconType === 'col'">
          <img src="@/assets/img/practice/has-collection.png" alt="" v-if="collectionStatus" @click="changeCol(false)">
          <img src="@/assets/img/practice/no-collection.png" alt="" v-if="!collectionStatus" @click="changeCol(true)">
        </div>
        <div v-if="iconType === 'delCol'||iconType === 'delWrong'">
          <img src="@/assets/img/practice/delete-icon.png" alt="" @click="changeDel">
        </div>
      </template>
    </topHeader>
    <!-- 试题 单选 多选 填空 判断 -->
    <div class="practice-item" v-if="list.length > 0">
      <p-title :title='typeObj[currentObj.questionType]' :current-index="currentIndex+1" :all-num="list.length"></p-title>
      <div v-if="qusType([1,2,3,4],currentObj.questionType)">
        <component :ref="refObj[currentObj.questionType]" :is="componentName" :data-obj="currentObj" :current-Status="currentStatus" @changeSelect="changeSelect" :show-button="showButton" @input="completionChange"></component>
      </div>
      <div v-if="qusType([5,6],currentObj.questionType)">
        <text-case :data-obj="currentObj"  ref="textCase">
          <!-- 试题 文字案例  视频案例 -->
          <div v-if="qusType([5,6],currentObj.questionType)">
            <child-title :title='typeObj[currentChildrenObj.questionType]' :current-index="currentChildrenIndex+1" :all-num="childrenList.length"></child-title>
            <component :ref="refChildrenObj[currentChildrenObj.questionType]" :is="componentName" :data-obj="currentChildrenObj" :current-Status="currentStatus" @changeSelect="changeSelect" :show-button="showButton" @input="completionChange"></component>
              <div style="minHeight:.05rem;">
                <div style="display:flex">
                  <p-button name="上一题" @click="childrenPrevQuestion" class-type="prev"></p-button>
                  <p-button name="下一题" @click="childrenNextQuestion" v-if="!(currentIndex === list.length -1&&currentChildrenIndex === childrenList.length - 1)"></p-button>
                </div>
              </div>
              <right-answer :analysis='currentChildrenObj.analysis' :answer="currentChildrenObj.rightanswer" :show-ans="true"  :ans-status="ansStatus"></right-answer>
              <div>
            </div>
          </div>
        </text-case>
      </div>
    </div>
    <div v-if="list.length == 0">
      <none-data></none-data>
    </div>
    <!-- 切换题目 -->
    <div v-if="qusType([1,2,3,4],currentObj.questionType)"  style="minHeight:.05rem;">
      <div style="display:flex">
        <p-button name="上一题" @click="preQuestion" v-if="currentIndex>0" class-type="prev"></p-button>
        <p-button name="下一题" @click="nextQuestion" v-if="currentIndex+1 != list.length"></p-button>
      </div>
    </div>
    
    <!-- 答案 -->
    <div v-if="(qusType([1,2,3,4],currentObj.questionType))">
      <right-answer :analysis='currentObj.analysis' :answer="currentObj.rightanswer"  :show-ans="true" :ans-status="ansStatus"></right-answer>
    </div>

  </div>
</template>

<script>
import topHeader from "@/components/header/topHeader.vue";
import pButton from "@/components/practice/button.vue";   // 按钮
import rightAnswer from "@/components/practice/answer.vue";  // 正确答案
import pTitle from "@/components/practice/title.vue";  // 头部选择
import childTitle from "@/components/practice/childTitle.vue";  // 子试题头部选择
import single from "@/components/practice/single.vue";  // 单选
import pMultiple from "@/components/practice/pMultiple.vue";  // 多选
import completion from "@/components/practice/completion.vue";  // 填空
import textCase from "@/components/practice/textCase.vue";  // 视频案例 文字案例
import { getMatchViewAPI, getColStatusAPI,addCollectionAPI,delCollectionAPI } from '@/api/moon'
import {getWeekDetailAPI, getCollDetailAPI,delColAPI,delWrongAPI} from '@/api/detail';
import { Toast } from 'vant';
export default {
  name: "viewMatch",
  components: {
    topHeader,
    pButton,
    rightAnswer,
    pTitle,
    childTitle,
    single,
    pMultiple,
    completion,
    textCase
  },
  data() {
    return {
      typeObj:{
        '1':'单选',
        '2':'多选',
        '3':'判断',
        '4':'填空',
        '5':'文字案例题',
        '6':'视频案例题',
      },
      refObj:{
        '1':'single',
        '2':'multiple',
        '3':'single',
        '4':'completion',
        '5':'文字案例题',
        '6':'视频案例题',
      },
      list:[],
      listQuery:{coverId:1,
      },
      wrongQuery:{
        code:null,
      },
      collQuery:{
        code:null,
      },
      id:0,
      currentObj:{},
      currentIndex:0,
      showButton:'curent', // curent 当前显示确认   next  显示下一题
      answerRecordList:[],
      userAns:'',   // 用户答案
      currentStatus:{
        answer1:0,
        answer2:0,
        answer3:0,
        answer4:0,
        answer5:0,
        answer6:0,
      },

      /* 子试题相关 */
      refChildrenObj:{
        '1':'childrenSingle',
        '2':'childrenMultiple',
        '3':'childrenSingle',
        '4':'childrenCompletion',
      },
      childrenList:[],
      currentChildrenObj:{},
      currentChildrenIndex:1,

      ansStatus:false,
      type:null,
      viewType: {
        'match':{  // 月月赛
          routerName:'moonMatch',
          'API':getMatchViewAPI,
          query:'listQuery',
          title:'',
          iconType:'col'
        },
        'wrong':{  //  错题
          routerName:'myWrongbook',
          'API':getWeekDetailAPI,
          query:'wrongQuery',
          title:'我的错题',
          iconType:'delWrong'
        },
        'coll':{ // 收藏
          routerName:'myCollection',
          'API':getCollDetailAPI,
          query:'collQuery',
          title:'我的收藏',
          iconType:'delCol'
        },
      },
      scoreObj: [ // 优化计算答案权重
        {
          name:'answer1',
          value:'A'
        },
        {
          name:'answer2',
          value:'B'
        },
        {
          name:'answer3',
          value:'C'
        },
        {
          name:'answer4',
          value:'D'
        },
        {
          name:'answer5',
          value:'E'
        },
        {
          name:'answer6',
          value:'F'
        }
      ],
      componentType:{
        '1':single,
        '2':pMultiple,
        '3':single,
        '4':completion
      },
      componentName:'',
      toastPage:null,
      topTitle:'', // 头部标题
      iconType:'',  // 头部图标类型
      colQuery:{
        goodsId:null,
        goodsType:4,
      },
      collectionStatus:false,
    };
  },
  created() {
    let query = this.$route.query
    if(query&&query.type){
      this.id = query.id
      this.listQuery.coverId = this.id
      this.wrongQuery.code = this.id
      this.collQuery.code = this.id
      this.type = query.type
      this.getDetail(query.type)
    }
    
  },
  watch: {},
  methods: {
    backTo(){
      this.$router.go(-1)
      // this.$router.push({name:this.viewType[this.type].routerName})
    },
    qusType(list,objType){  // 判断类型是否在数组中
      let status = false
      list.forEach(item=>{
        if(item === objType){
          status = true
        }
      })
      return status
    },
    // 获取题目详情
    getDetail(type){
      this.toastPage = Toast.loading({
          message: '加载中...',
          forbidClick: true,
          loadingType: 'spinner',
          duration: 0
        });
      this.topTitle = this.viewType[type].title
      this.iconType = this.viewType[type].iconType
      let API = this.viewType[type]['API'](this[this.viewType[type].query])
      API.then(res=>{
        if(res.data.code == 0){
          this.toastPage.clear()
          if(res.data.data.length  === 0) return 
          this.list = res.data.data
          this.currentIndex = 0         // 当前选中索引值
          this.currentObj = this.list[0]  // 当前选中题目
          this._showDetail(0)
          
        }else{
          this.toastPage.clear()
        }
      })
    },
    // 根据题目类型来确定渲染内容
    _showDetail(startIndex){ 
      let currentObj = this.currentObj
      if(currentObj.questionType === 5||currentObj.questionType === 6){
        let list = this.childrenList = this.currentObj.children
        let index = startIndex === 0 ? 0 : list.length - 1
        this.currentChildrenIndex = index
        this.currentChildrenObj = this.childrenList[index]

        this._showCom(this.currentChildrenObj)
        this.changeScore(this.currentChildrenObj,this.refChildrenObj)
      }else{
        this._showCom(currentObj)
        this.changeScore(currentObj,this.refObj)
      }
      this.colQuery.goodsId =  this.currentObj.questionid
      this.getColStatus()
    },
    // 动态渲染组件
    _showCom(currentObj){
      this.componentName = this.componentType[currentObj.questionType]
    },

    // 修改答案状态
    changeScore(obj,ref){
      this.$nextTick(()=>{
        let type = obj.questionType
        this.userAns = obj.stuanswer||''
        this.rightAns = obj.rightanswer||''
        if(type =='1'||type =='2'||type =='3'){ // 单选 多选判断
          this.currentStatus={
            answer1:0,
            answer2:0,
            answer3:0,
            answer4:0,
            answer5:0,
            answer6:0,
          }
          
          this.scoreObj.forEach(item=>{
            obj[item.name]&&this._changeScore(item.name,item.value)
          })

          this.showButton = 'next'

          this.$refs[ref[obj.questionType]].currentStatus = this.currentStatus
          this.$refs.textCase&&this.$refs.textCase.scrollTop() // 修改定位
          this.ansStatus = this._filterAnswer(this.userAns,this.rightAns)
        }else if(type == '4'){                 // 填空
          let curentRef = this.$refs[ref[obj.questionType]]
          curentRef.value = this.userAns
          if(this.rightAns != this.userAns){
            this.ansStatus = false
            curentRef.showAnswer = 2
          }else{
            this.ansStatus = true
            curentRef.showAnswer = 1
          }
        }
      })
    },
    _changeScore(answer,type){
      let num = 0
      this.rightAns.indexOf(type) != -1 && (num += 1)
      this.userAns.indexOf(type) != -1 && (num += 2)
      this.currentStatus[answer] = num
    },

    // 过滤答案
    _filterAnswer(userAns,rightAns){
      let status = true
      rightAns = rightAns.replace(/,/g,'').split('')
      rightAns.forEach(ans => {
        if(userAns.indexOf(ans) === -1){
          status = false
          return 
        }
      })
      return status
    },

    // 单选选中 多选  填空
    changeSelect(value){
      this.userAns = value
    },
    // 填空
    completionChange(value){
      this.userAns = value
    },
    // 获取用户填写答案
    _getUserAnswer(index){
      let obj = this.answerRecordList[index]
      return (obj&&obj.answer)||''
    },
    
    preQuestion(){
      this.currentIndex -= 1 
      // this.currentChildrenIndex = 0
      this.currentObj = this.list[this.currentIndex]  // 当前题目
      // let key = this.currentObj.questionType == '4' ? 'value':'activeName'   // 填空题
      this._showDetail(0)
    },

    // 添加下一题信息
    nextQues(){
      this.currentIndex += 1                          // 当前索引
      this.currentObj = this.list[this.currentIndex]  // 当前题目
      // this.$nextTick(()=>{
        this._showDetail(0)
      // })
    },
    // 下一题
    async nextQuestion(){
      this.nextQues()
    },

    childrenPrevQuestion(){
      if(this.currentChildrenIndex > 0){
        this.currentChildrenIndex -= 1 
        this.currentChildrenObj = this.childrenList[this.currentChildrenIndex]  // 当前题目
        this._showCom(this.currentChildrenObj)
        this.changeScore(this.currentChildrenObj,this.refChildrenObj)
      }else{
        this.currentIndex -= 1 
        this.currentObj = this.list[this.currentIndex]  // 当前题目
        this._showDetail(1)
      }
    },

    _getUserChildAnswer(index,childrenIndex){
      let obj = this.answerRecordList[index] ? this.answerRecordList[index] : { children:[] }
      let childObj = obj.children[childrenIndex]
      return ( childObj && childObj.answer ) || ''
    },
    // 下一题
    async childrenNextQuestion(){
      if(this.currentChildrenIndex + 1 < this.childrenList.length){
        this.currentChildrenIndex += 1  
        this.currentChildrenObj = this.childrenList[this.currentChildrenIndex]  // 当前题目
        this._showCom(this.currentChildrenObj)
        this.changeScore(this.currentChildrenObj,this.refChildrenObj)
      }else{
        this.nextQues()
      }
    },
    changeDel(){
      let API
      if(this.iconType === 'delCol'){
        let data = {
            goodsId:this.currentObj.id,
            goodsType:4
          }
        API = delColAPI(data)
      }
      if(this.iconType === 'delWrong'){
        let data = {
          'ids':[this.currentObj.id]
        }
        API = delWrongAPI(data)
      }
      API.then(res=>{
        if(res.data.code == 0){
          if(res.data.data == 1){
            if(this.list.length > 1&&this.currentIndex + 1 < this.list.length){ // 当索引值比数组长
              this.delData()
              this.currentObj = this.list[this.currentIndex]
              this._showDetail(0)
            }else if(this.list.length == 1){ // 数组长度为1
              this.delData()
              this.backTo()
            }else{   // 当索引值超过数组长度
              this.delData()
              this.currentIndex -= 1
              this.currentObj = this.list[this.currentIndex]
              this._showDetail(0)
            }
          }
        }
      })
      console.log(this.currentIndex,this.currentObj,'当前对象');
    },
    delData(){
      this.list.splice(this.currentIndex,1)
    },
    changeCol(status){
      let addData = {
        objectId:this.currentObj.questionid,
        objectType:'试题'
      }
      let delData={
        goodsId:this.currentObj.questionid,
        objectType:'4'
      }
      let API = status ? addCollectionAPI(addData) : delCollectionAPI(delData)
      API.then(res=>{
        if(res.data.code == 0){
          Toast.success(`${!status?'取消收藏':'收藏成功'}`);
          this.getColStatus()
        }
      })
    },
    getColStatus(){
      getColStatusAPI(this.colQuery).then(res=>{
        if(res.data.code == 0){
          this.collectionStatus = res.data.data
        }
      })
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.header-center{
  display: flex;
  align-items: center;
  img{
    width: .18rem;
    height: .17rem;
    margin-right: .06rem;
  }
  div{
    font-size: .16rem;
    font-weight: Bold;
  }
}
.header-right{
  display: flex;
  .right-item{
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    padding: 0 .04rem 0 .16rem;
    span{
      font-size: .11rem;
      color: #fff;
    }
    img{
      height: .13rem;
      margin-bottom: .03rem;
    }
  }
}
.practice{
  height: 100%;
  // background: #F2F2F2;
  .practice-item{
    overflow:scroll;
    background: #f2f2f2;
    // padding-top: .44rem;
    padding-top: .89rem;
  }
}
.dialog-cnt{
  padding: .32rem .3rem;
  text-align: center;
  span{
    display: inline-block;
    color: #333333;
    font-size: .17rem;
    line-height: .3rem;
    font-weight: Medium;
  }
  h1{
    color: #333333;
    font-size: .18rem;
    padding-bottom: .1rem;
  }
  .post-span{
    font-size: .14rem;
  }
}

</style>
