<template>
  <!--在线练习-->
  <div class="practice">
    <topHeader :header-title="topTitle" @back="$router.push({name:'weekPractice'})">
      <template v-if="list.length > 0">
        <img src="@/assets/img/practice/has-collection.png" alt="" v-if="collectionStatus" @click="changeCol(false)">
        <img src="@/assets/img/practice/no-collection.png" alt="" v-if="!collectionStatus" @click="changeCol(true)">
      </template>
    </topHeader>
    <div class="practice-item" v-if="list.length > 0">
      <p-title :title='typeObj[currentObj.questionType]' :current-index="currentIndex" :all-num="list.length"></p-title>
      <!-- 单选 -->
      <div v-if="currentObj.questionType === 1">
        <single ref="single" :data-obj="currentObj" :current-Status="currentStatus" @changeSelect="changeSelect" :show-button="showButton"></single>
      </div>
      <!-- 多选 -->
      <div v-if="currentObj.questionType === 2">
        <p-multiple  ref="multiple" :data-obj="currentObj" :current-Status="currentStatus" @changeSelect="changeSelect" :show-button="showButton"></p-multiple>
      </div>
      <!-- 判断 -->
      <div v-if="currentObj.questionType === 3">
         <single  ref="single" :data-obj="currentObj" :current-Status="currentStatus" @changeSelect="changeSelect" :show-button="showButton"></single>
      </div>
      <!-- 填空 -->
      <div  v-if="currentObj.questionType === 4">
        <completion ref="completion" :data-obj="currentObj" @input="completionChange"></completion>
      </div>
      <!-- 文字案例 -->
      <div v-if="currentObj.questionType === 5||currentObj.questionType === 6">
        <text-case :data-obj="currentObj"  ref="textCase">
          <div v-if="currentObj.questionType === 5||currentObj.questionType === 6">
            <child-title :title='typeObj[currentChildrenObj.questionType]' :current-index="currentChildrenIndex" :all-num="childrenList.length"></child-title>
            <!-- 单选 -->
              <div v-if="currentChildrenObj.questionType === 1">
                <single ref="childrenSingle" :data-obj="currentChildrenObj" :current-Status="currentStatus" @changeSelect="changeSelect" :show-button="showButton"></single>
              </div>
              <!-- 多选 -->
              <div v-if="currentChildrenObj.questionType === 2">
                <p-multiple  ref="childrenMultiple" :data-obj="currentChildrenObj" :current-Status="currentStatus" @changeSelect="changeSelect" :show-button="showButton"></p-multiple>
              </div>
              <!-- 判断 -->
              <div v-if="currentChildrenObj.questionType === 3">
                <single  ref="childrenSingle" :data-obj="currentChildrenObj" :current-Status="currentStatus" @changeSelect="changeSelect" :show-button="showButton"></single>
              </div>
              <!-- 填空 -->
              <div  v-if="currentChildrenObj.questionType === 4">
                <completion ref="childrenCompletion" :data-obj="currentChildrenObj" @input="completionChange"></completion>
              </div>
              <div style="display:flex">
                <p-button name="确认" @click="childrenConfirm" v-if="showButton == 'curent'"></p-button>
                <p-button name="完成" @click="hasDown" v-if="showButton == 'next'&&currentChildrenIndex===childrenList.length&&currentIndex == list.length"></p-button>
                <p-button name="下一题" @click="childrenNextQuestion" v-if="showButton == 'next'&&(currentChildrenIndex!=childrenList.length||currentIndex != list.length)"></p-button>
              </div>
              <div v-if="showAnswer">
              <right-answer :analysis='currentChildrenObj.analysis' :answer="currentChildrenObj.rightanswer"></right-answer>
            </div>
          </div>
        </text-case>
      </div>
    </div>
    <div style="display:flex" v-if="currentObj.questionType === 1||currentObj.questionType ===2|| currentObj.questionType===3||currentObj.questionType ===4">
      <p-button name="确认" @click="confirm" v-if="showButton == 'curent'"></p-button>
      <p-button name="完成" @click="hasDown" v-if="showButton == 'next'&&currentIndex == list.length"></p-button>
      <p-button name="下一题" @click="nextQuestion" v-if="showButton == 'next'&&currentIndex != list.length"></p-button>
    </div>
    <div v-if="showAnswer&&(currentObj.questionType === 1||currentObj.questionType ===2|| currentObj.questionType===3||currentObj.questionType ===4)">
      <right-answer :analysis='currentObj.analysis' :answer="currentObj.rightanswer"></right-answer>
    </div>

    <div v-if="list.length == 0">
      <none-data></none-data>
    </div>

    <p-dialog :isShow="isShow">
      <template>
        <div class="dialog-cnt">
          <span>确定要退出答题吗？</span>
          <span>退出后将不会保存答题记录</span>
        </div>
      </template>
      <template v-slot:left>
        <div class="dialog-footer" @click="closeConfirm">
          确定退出
        </div>
      </template>
      <template v-slot:right>
        <div  class="dialog-footer" @click="isShow = false">
          继续答题
        </div>
      </template>
    </p-dialog>
    
  </div>
</template>

<script>
import topHeader from "@/components/header/topHeader.vue";
import pButton from "@/components/practice/button.vue";   // 按钮
import pDialog from "@/components/dialog.vue";   // 弹窗
import rightAnswer from "@/components/practice/answer.vue";  // 正确答案
import pTitle from "@/components/practice/title.vue";  // 头部选择
import childTitle from "@/components/practice/childTitle.vue";  // 子试题头部选择
import single from "@/components/practice/single.vue";  // 单选
import pMultiple from "@/components/practice/pMultiple.vue";  // 多选
import completion from "@/components/practice/completion.vue";  // 填空
import textCase from "@/components/practice/textCase.vue";  // 填空
import { getTimer } from "@/utils/function.js"
import { Toast } from 'vant';
import { getWeekDetailAPI, saveWeekAPI,getColStatusAPI,addCollectionAPI,delCollectionAPI } from '@/api/week'
export default {
  beforeRouteLeave (to, from, next) {
    if (this.backStatus) {
      next()
    } else {
      this.isShow= true
      next(false)
    }
  },
  name: "weekPractice",
  components: {
    topHeader,
    pDialog,
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
      topTitle:'',
      list:[],
      listQuery:{
        id:1,
        type:1,
      },
      id:0,
      currentObj:{},
      currentIndex:1,
      showAnswer:false,
      showButton:'curent', // curent 当前显示确认   next  显示下一题
      rightAns:'',  // 正确答案
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

      /* 保存接口 */
      saveFrom:{
        coverId:null,// 试卷id
        begintime:null,// 开始时间
        type:2,// 1 考试  2 练习
        list:[
          // {
          //   questionType:null,  // 试题类型
          //   questionsId:null,  // 试题id
          //   stuanswer:'',// 考生答案
          // }
        ]
      },
      
      isShow:false,
      backStatus:false,
      collectionStatus:false,
      colQuery:{
        goodsId:null,
        goodsType:4,
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
      toastPage:null,
    };
  },
  created() {
    this.id = this.$route.query.id
    this.topTitle = this.$route.query.title
    this.listQuery.id = this.id
    this.saveFrom.coverId = this.id
    this.saveFrom.begintime = getTimer()
    this.getDetail()
  },
  mounted(){ },
  watch: {},
  methods: {
    closeConfirm(){
      this.backStatus = true
      this.isShow = false
      this.$router.push({name:'weekPractice'})
    },
    getDetail(){
      this.toastPage = Toast.loading({
          message: '加载中...',
          forbidClick: true,
          loadingType: 'spinner',
          duration: 0
        });
      getWeekDetailAPI(this.listQuery).then(res=>{
        this.toastPage.clear()
        if(res.data.code == 0){
          this.list = res.data.data
          if(this.list.length === 0) return 
          this.currentIndex = 1         // 当前选中索引值
          this.currentObj = this.list[0]  // 当前选中题目
          this.rightAns = this.currentObj.rightanswer  // 当前正确答案
          this.colQuery.goodsId =  this.currentObj.questionid
          this.getColStatus()
          if(this.currentObj.questionType === 5||this.currentObj.questionType === 6){
            this.childrenList = this.currentObj.children
            if(this.childrenList.length === 0) return 
            this.currentChildrenIndex = 1
            this.currentChildrenObj = this.childrenList[0]
            this.rightAns = this.currentChildrenObj.rightanswer
            
          }
        }
      })
    },
    // 修改状态
    changeScore(obj){
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
    },
    _changeScore(answer,type){
      let num = 0
      this.rightAns.indexOf(type) != -1 && (num += 1)
      this.userAns.indexOf(type) != -1 && (num += 2)
      this.currentStatus[answer] = num
    },

    // 单选选中 多选  填空
    changeSelect(value){
      this.userAns = value
    },
    // 填空
    completionChange(value){
      this.userAns = value
    },
    // 确认
    confirm(){
      this.$nextTick(()=>{
        let obj = this.currentObj
        if(!this.userAns){
          Toast.fail('请填写答案');
          return
        }
        let type = obj.questionType
        if(type =='1'||type =='2'||type =='3'){ // 单选 多选判断
          this.changeScore(obj)
          this.showButton = 'next'
          this.showAnswer = true
          this.$refs[this.refObj[obj.questionType]].currentStatus = this.currentStatus
        }else if(type == '4'){                 // 填空
          let curentRef = this.$refs[this.refObj[obj.questionType]]
          curentRef.value = this.userAns
          if(this.rightAns != this.userAns){
            curentRef.showAnswer = 2
          }else{
            curentRef.showAnswer = 1
          }
          this.showButton = 'next'
          this.showAnswer = true
        }

        let ans = this.userAns
        if(typeof(this.userAns) == 'object'){
          ans = this.userAns.join(',')
        }
        let data = {
          questionType:obj.questionType,  
          questionsId:obj.questionid,  
          stuanswer:ans,
        }
        this.saveFrom.list.push(data)
      })
    },

    // 下一题
    nextQuestion(){
      this.showButton = 'curent'   // 更改按钮状态
      this.showAnswer = false      // 是否显示答案
      // this.currentStatus={                            // 初始化状态参数
      //   answer1:0,
      //   answer2:0,
      //   answer3:0,
      //   answer4:0,
      //   answer5:0,
      //   answer6:0,
      // }
      // this.$refs[this.refObj[this.currentObj.questionType]].currentStatus = this.currentStatus
      this.$refs[this.refObj[this.currentObj.questionType]].changeStatus()
      this.currentObj = this.list[this.currentIndex]  // 当前题目
      this.currentIndex += 1                          // 当前题目索引值
      this.rightAns = this.currentObj.rightanswer     // 正确答案
      this.userAns = ''
      this.colQuery.goodsId =  this.currentObj.questionid
      this.getColStatus()
      if(this.currentObj.questionType === 5||this.currentObj.questionType === 6){  // 如果下一题是文字和视频
        this.childrenList = this.currentObj.children
        this.currentChildrenIndex = 1
        this.currentChildrenObj = this.childrenList[0]
        this.rightAns = this.currentChildrenObj.rightanswer
      }
    },



    // 确认
    childrenConfirm(){
      this.$nextTick(()=>{
        let obj = this.currentChildrenObj
        if(!this.userAns){
          Toast.fail('请填写答案');
          return
        }
        let type = obj.questionType
        if(type =='1'||type =='2'||type =='3'){ // 单选 多选判断
          this.changeScore(obj)
          this.showButton = 'next'
          this.showAnswer = true
          this.$refs[this.refChildrenObj[obj.questionType]].currentStatus = this.currentStatus
        }else if(type == '4'){                 // 填空
          let curentRef = this.$refs[this.refChildrenObj[obj.questionType]]
          curentRef.value = this.userAns
          if(this.rightAns != this.userAns){
            curentRef.showAnswer = 2
          }else{
            curentRef.showAnswer = 1
          }
          this.showButton = 'next'
          this.showAnswer = true
        }

        let ans = this.userAns
        if(typeof(this.userAns) == 'object'){
          ans = this.userAns.join(',')
        }
        let data = {
          questionType:obj.questionType,  
          questionsId:obj.id,  
          parentQuestionsId:obj.questionId,
          stuanswer:ans,
        }
        this.saveFrom.list.push(data)
      })
    },

    // 下一题
    childrenNextQuestion(){
      let obj = this.currentChildrenObj
      this.showButton = 'curent'   // 更改按钮状态
      this.showAnswer = false      // 是否显示答案
      this.$refs[this.refChildrenObj[obj.questionType]].changeStatus()
      if(this.currentChildrenIndex < this.childrenList.length){
        this.currentChildrenObj = this.childrenList[this.currentChildrenIndex]  // 当前题目
        this.currentChildrenIndex += 1                          // 当前题目索引值
        this.rightAns = this.currentChildrenObj.rightanswer     // 正确答案
        this.userAns = ''
      }else{
        this.currentObj = this.list[this.currentIndex]  // 当前题目
        this.currentIndex += 1                          // 当前题目索引值
        this.rightAns = this.currentObj.rightanswer     // 正确答案
        this.userAns = ''
        this.colQuery.goodsId =  this.currentObj.questionid
        this.getColStatus()
        if(this.currentObj.questionType === 5||this.currentObj.questionType === 6){  // 如果下一题是文字和视频
          this.childrenList = this.currentObj.children
          this.currentChildrenIndex = 1
          this.currentChildrenObj = this.childrenList[0]
          this.rightAns = this.currentChildrenObj.rightanswer
        }
      }

      this.$refs.textCase&&this.$refs.textCase.scrollTop()
    },


    // 完成
    hasDown(){
      this.backStatus = true
      saveWeekAPI(this.saveFrom).then(res=>{
        if(res.data.code == 0){
          this.$router.push({name:'viewPracticeReport',query:{id:this.id,title:this.topTitle,paperId:res.data.data.id}})
        }
      })
    },

    // 获取收藏状态
    getColStatus(){
      getColStatusAPI(this.colQuery).then(res=>{
        if(res.data.code == 0){
          this.collectionStatus = res.data.data
        }
      })
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
    }
  }
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.practice{
  height: 100%;
  // background: #F2F2F2;
  .practice-item{
    background: #f2f2f2;
    // padding-top: .44rem;
    padding-top: .89rem;
  }
}
.dialog-cnt{
  padding: .32rem .34rem;
  text-align: center;
  span{
    display: inline-block;
    color: #333333;
    font-size: .17rem;
    line-height: .3rem;
    font-weight: Medium;
  }
}
.dialog-footer{

}
</style>
