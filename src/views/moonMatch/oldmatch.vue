<template>
  <!--在线练习-->
  <div class="practice">
    <topHeader :header-title="topTitle"  @back="$router.push({name:'moonMatch'})">
      <template v-slot:title>
        <div class="header-center">
          <img src="@/assets/img/practice/load-time.png" alt="">
          <div>倒计时{{lastTime}}</div>
        </div>  
      </template>
      <!-- load-time.png -->
      <div class="header-right">
        <div class="right-item" @click="preQuestion" v-if="currentIndex>0">
          <img src="@/assets/img/practice/prev-ques.png" alt="">
          <span>上一题</span>
        </div>
        <div class="right-item" @click="openPost">
          <img src="@/assets/img/practice/post-paper.png" alt="">
          <span>交卷</span>
        </div>
      </div>
    </topHeader>
    <div class="practice-item">
      <p-title :title='typeObj[currentObj.questionType]' :current-index="currentIndex+1" :all-num="list.length"></p-title>
      <!-- <component :ref="refObj[currentObj.questionType]" :is="componentName" :data-obj="currentObj" :current-Status="currentStatus" @changeSelect="changeSelect" :show-button="showButton" @input="completionChange"></component> -->

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
        <text-case :data-obj="currentObj"></text-case>
      </div>
    </div>
    <div v-if="currentObj.questionType === 1||currentObj.questionType ===2|| currentObj.questionType===3||currentObj.questionType ===4">
      <div style="display:flex">
        <!-- <p-button name="下一题" @click="nextQuestion" v-if="currentIndex != list.length"></p-button> -->
        <p-button name="下一题" @click="nextQuestion" v-if="currentIndex+1 != list.length"></p-button>
      </div>
      

    </div>
    <div v-if="currentObj.questionType === 5||currentObj.questionType === 6">
      <child-title :title='typeObj[currentChildrenObj.questionType]' :current-index="currentChildrenIndex+1" :all-num="childrenList.length"></child-title>
      <!-- <component :ref="refChildrenObj[currentChildrenObj.questionType]" :is="componentName" :data-obj="currentChildrenObj" :current-Status="currentStatus" @changeSelect="changeSelect" :show-button="showButton" @input="completionChange"></component> -->

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
        <div>
          <div style="display:flex">
            <p-button name="上一题" @click="childrenPrevQuestion" class-type="prev" v-if="currentChildrenIndex != 0"></p-button>
            <p-button name="下一题" @click="childrenNextQuestion" v-if="!(currentIndex === list.length -1&&currentChildrenIndex === childrenList.length - 1)"></p-button>
          </div>
        </div>
        <div>
      </div>
    </div>

    <p-dialog :isShow="isShow">
      <template>
        <div class="dialog-cnt">
          <span>确定要退出考试吗？</span>
          <!-- <span>退出后将不会保存答题记录</span> -->
        </div>
      </template>
      <template v-slot:left>
        <div class="dialog-footer" @click="closeConfirm">
          确定退出
        </div>
      </template>
      <template v-slot:right>
        <div  class="dialog-footer" @click="isShow = false">
          继续考试
        </div>
      </template>
    </p-dialog>

    <p-dialog :isShow="postShow">
      <template>
        <div class="dialog-cnt">
          <h1>交卷提示</h1>
          <span class="post-span">你还有{{totalNum - hasAnswer}}道题未答，确定现在交卷吗？</span>
          <!-- <span>退出后将不会保存答题记录</span> -->
        </div>
      </template>
      <template v-slot:left>
        <div class="dialog-footer" @click="postShow = false">
          取消
        </div>
      </template>
      <template v-slot:right>
        <div  class="dialog-footer" @click="hasDown">
          确定
        </div>
      </template>
    </p-dialog>
  </div>
</template>

<script>
import topHeader from "@/components/header/topHeader.vue";
import pButton from "@/components/practice/button.vue";   // 按钮
import pDialog from "@/components/dialog.vue";   // 弹窗
import pTitle from "@/components/practice/title.vue";  // 头部选择
import childTitle from "@/components/practice/childTitle.vue";  // 子试题头部选择
import single from "@/components/practice/single.vue";  // 单选
import pMultiple from "@/components/practice/pMultiple.vue";  // 多选
import completion from "@/components/practice/completion.vue";  // 填空
import textCase from "@/components/practice/textCase.vue";  // 填空
import { getTimer } from "@/utils/function.js"
import { getMatchDetailAPI, createPaperAPI,createRecordAPI,getMatchConDetailAPI } from '@/api/moon'

export default {
  beforeRouteLeave (to, from, next) {
    if (this.backStatus) {
      next()
    } else {
      this.isShow= true
      next(false)
    }
  },
  name: "moonMatch",
  components: {
    topHeader,
    pDialog,
    pButton,
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
        type:0,    //1 周周练   2 月月赛
      },
      conQuery:{
        coverId:null
      },
      id:0,
      currentObj:{},
      currentIndex:0,
      showButton:'curent', // curent 当前显示确认   next  显示下一题

      createPaper:{ // 第一次答题需要
        begintime:'',/// 答题开始时间 
        updateTime:'', // 
        coverId:null, //  成套试题id 
        type:1,          // 试卷类型 1考试 2练习 
      },
      createPaperId:null,
      createRecord:{  // 做题保存记录
        coverId:null,           //  试卷id
        parentQuestionsId:null, //  父级试题id
        questionType: null,     //  试题类型
        questionsId:null,       //  试题id
        stuanswer:null,         //  考生答案
        testPaperId:null,      // 试卷记录id
      },
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

      isShow:false,      // 是否显示弹窗
      backStatus:false,  // 退出答题
      postShow:false,   // 交卷状态
      hasAnswer:0, // 剩下答题数
      lastTime:'',   // 倒计时
      paperObj:{},     // 创建试卷详情
      setInter:null,  // 设置定时
      totalNum:null,  // 试题总数

      componentType:{
        '1':single,
        '2':pMultiple,
        '3':single,
        '4':completion
      },
      componentName:'',
    };
  },
  created() {
    let query = this.$route.query
    if(query.id){
      this.id = query.id
      this.topTitle = query.title
      this.listQuery.id = this.id
      this.conQuery.coverId = this.id
      this.createPaper.coverId = this.id
      this.createPaper.begintime = getTimer()
      this.createRecord.coverId = this.id
      this.getDetail(query.type||'')
    }
  },
  mounted(){
    
  },
  destroyed(){
    this.setInter = null
  },
  watch: {},
  methods: {
    leftTimer(year, month, day, hour, minute, second){
      let leftTime = (new Date(year, month-1, day, hour, minute, second)) - (new Date());//计算剩余毫秒数
      let minutes = parseInt(leftTime / 1000 / 60 , 10);//计算剩分钟数
      let seconds = parseInt(leftTime / 1000 % 60, 10);//计算剩余秒数
      seconds = seconds< 10 ?'0'+seconds :seconds
      return minutes + ' : ' + seconds
    },
    closeConfirm(){
      this.backStatus = true
      this.isShow = false
      this.$router.push({name:'moonMatch'})
    },
    getDetail(type){
      let API
      if(type == 'continue'){
        API = getMatchConDetailAPI(this.conQuery)
      }else{
        API = getMatchDetailAPI(this.listQuery)
      }
      API.then(res=>{
        if(res.data.code == 0){
          if(res.data.data.length  === 0) return 
          this.list = res.data.data
          this.currentIndex = 0         // 当前选中索引值
          this.currentObj = this.list[0]  // 当前选中题目
          this.answerRecordList = new Array(this.list.length)
          this._showDetail(0)
          // if(this.currentObj.questionType === 5||this.currentObj.questionType === 6){
          //   this.childrenList = this.currentObj.children
          //   this.currentChildrenIndex = 0
          //   this.currentChildrenObj = this.childrenList[0]
          // }
          // if(type == 'continue'){
          //   this.resetList(this.list)
          //   this.currentIndex = -1
          //   this.nextQues()
          // }else{
            // this._createPaper('0')
          // }
          this.totalNum = this._filterNum(this.list)
        }else{
          
        }
      })
    },
    // 继续答题初始化用户答案数据
    resetList(list){
      // this.answerRecordList
      list.forEach((item,index)=>{
        if(item.questionType == '5'||item.questionType == '6'){
          item.children.forEach((el,ind)=>{
            this._saveAnswer('answer',el.stuanswer||'',index,this.answerRecordList,ind)
          })
        }else{
          this._saveAnswer('answer',item.stuanswer||'',index,this.answerRecordList)
        }
      })
      console.log(this.answerRecordList,'this.answerRecordList');
    },

    _filterNum(list){
      let num = 0
      let computed = function(data){
        data.forEach((item)=>{
          num +=1
          if(item.children&&item.children.length > 0){
            computed(item.children)
          }
        })
      }
      computed(list)
      return num 
    },
    // 根据题目类型来确定渲染内容
    _showDetail(startIndex){  // startIndex 0  代表大题，1代表小题
      let currentObj = this.currentObj
      console.log(this,'thisthisthis');
      
      if(currentObj.questionType === 5||currentObj.questionType === 6){
        let list = this.childrenList = this.currentObj.children
        let index = startIndex === 0 ? 0 : list.length - 1
        this.currentChildrenIndex = index
        this.currentChildrenObj = this.childrenList[index]

        this._showCom(this.currentChildrenObj)
        this.changeAns('refChildrenObj',this.currentChildrenObj,'_getUserChildAnswer')
      }else{
        this._showCom(currentObj)
        this.changeAns('refObj',this.currentObj,'_getUserAnswer')
      }
    },
    changeAns(refName,currentObj,getAnsMethod){
      this.$nextTick(()=>{
        let key = currentObj.questionType == '4' ? 'value':'activeName'   // 填空题
        this.userAns = this.$refs[this[refName][currentObj.questionType]][key] = this[getAnsMethod](this.currentIndex,this.currentChildrenIndex)
      })
      // let childkey = this.currentChildrenObj.questionType == '4' ? 'value':'activeName'   // 填空题
      // this.userAns = this.$refs[this.refChildrenObj[this.currentChildrenObj.questionType]][childkey] = this._getUserChildAnswer(this.currentIndex,this.currentChildrenIndex)
      // let key = this.currentObj.questionType == '4' ? 'value':'activeName'   // 填空题
      // this.userAns = this.$refs[this.refObj[this.currentObj.questionType]][key] = this._getUserAnswer(this.currentIndex)
    },

    // 动态渲染组件
    _showCom(currentObj){
      // this.componentName = this.componentType[currentObj.questionType]
    },

    // 单选选中 多选  填空
    changeSelect(value){
      this.userAns = value
    },
    // 填空
    completionChange(value){
      this.userAns = value
    },

    _getUserAnswer(index){
      let obj = this.answerRecordList[index]
      return (obj&&obj.answer)||''
    },
    preQuestion(){
      this.currentIndex -= 1 
      this.currentChildrenIndex = 0
      this.currentObj = this.list[this.currentIndex]  // 当前题目
        this._showDetail(0)
        // let key = this.currentObj.questionType == '4' ? 'value':'activeName'   // 填空题
        // if(this.currentObj.questionType === 5||this.currentObj.questionType === 6){  // 如果下一题是文字和视频
        //   this.childrenList = this.currentObj.children
        //   this.currentChildrenIndex = 0
        //   this.currentChildrenObj = this.childrenList[0]
        //   this.$nextTick(()=>{
        //     let childkey = this.currentChildrenObj.questionType == '4' ? 'value':'activeName'   // 填空题
        //     this.userAns = this.$refs[this.refChildrenObj[this.currentChildrenObj.questionType]][childkey] = this._getUserChildAnswer(this.currentIndex,this.currentChildrenIndex)
        //   })
        // }else{
        //   this.userAns = this.$refs[this.refObj[this.currentObj.questionType]][key] = this._getUserAnswer(this.currentIndex)
        // }
    },
    // 保存用户答案
    _saveAnswer(key,value,index,list,childrenIndex){
      if(!list[index]){
          list[index] = {}
        }
      if(childrenIndex > -1){
        if(!list[index]){
          list[index] = {}
        }
        if(!list[index].children){
          list[index].children = []
        }
        list[index].children[childrenIndex] ={
            [key]:value
        }
      }else{
        list[index] = {
          [key]:value
          // children:[]
        }
      }
    },
    // 创建试卷
    async _createPaper(status){
      if(status === '1'){
        this.createPaper.updateTime = getTimer()
        this.createPaper.begintime = ''
      }
      return new Promise((resolve,reject)=>{
        createPaperAPI(this.createPaper).then(res=>{
          console.log(res.data,'创建试卷');
          let data = res.data.data
          if(res.data.code == 0){
            this.paperObj = data
            if(status === '1'){
            //   this.backStatus = true
            //   this.$router.push({name:'viewMatchReport',query:{id:this.id,paperId:this.createPaperId}})
            } else{
              this.createPaperId = data.id
              let time = data.endtime
              let setInter = setInterval(()=> {
                this.lastTime = this.leftTimer(time.slice(0,4),time.slice(5,7),time.slice(8,10),time.slice(11,13),time.slice(14,16),time.slice(17,19))
                if(this.lastTime == '00:00'){
                  console.log('交卷');
                }
              }, 1000)
            } 
            resolve(data)
          }else{
            reject(res.data.msg)
            // (res.data.msg)
          }
        })
      })
    },
    // 创建答题记录
    async _createRecord(){
      return new Promise((resolve,reject)=>{
        createRecordAPI(this.createRecord).then(res=>{
          console.log(res.data,'创建答题记录');
            if(res.data.code == 0){
              resolve(res.data.data)
            }else{
              reject(res.data.msg)
            }
        })
      })
    },
    // 保存答题记录
    async _saveRecord(obj,parentObj){
      // return new Promise((resolve,reject)=>{
        this.createPaper.id = this.createPaperId
        this.createRecord.parentQuestionsId = parentObj?parentObj.questionid:''
        this.createRecord.testPaperId = this.createPaperId // 试卷id
        this.createRecord.questionType = obj.questionType // 试题类型
        this.createRecord.questionsId = parentObj?obj.id:obj.questionid // 试题id
        this.createRecord.stuanswer = this.userAns // 考生答案
        try{
          // let res = await this._createRecord()
          // resolve(res)
        }catch(error){
            console.log('保存答题记录接口错误',error); 
            // reject(error)
        }
      // })
    },
    // 添加下一题信息
    nextQues(){
      this.currentIndex += 1                          // 当前索引
      this.currentObj = this.list[this.currentIndex]  // 当前题目
      this._showDetail(0)
        // if(this.currentObj.questionType === 5||this.currentObj.questionType === 6){  // 如果下一题是文字和视频
        //   this.childrenList = this.currentObj.children
        //   this.currentChildrenIndex = 0
        //   this.currentChildrenObj = this.childrenList[0]
        //   this.$nextTick(()=>{
        //     let childkey = this.currentChildrenObj.questionType == '4' ? 'value':'activeName'   // 填空题
        //     this.userAns = this.$refs[this.refChildrenObj[this.currentChildrenObj.questionType]][childkey] = this._getUserChildAnswer(this.currentIndex,this.currentChildrenIndex)
        //   })
        // }else{
        //   let key = this.currentObj.questionType == '4' ? 'value':'activeName'   // 填空题
        //   this.userAns = this.$refs[this.refObj[this.currentObj.questionType]][key] = this._getUserAnswer(this.currentIndex)
        // }
    },
    // 下一题
    async nextQuestion(){
      try{
        await this._saveRecord(this.currentObj)
        this._saveAnswer('answer',this.userAns,this.currentIndex,this.answerRecordList)  // 本地保存记录
      }catch(error){
        console.log(error,'错误');
      }
      this.nextQues()
      console.log(this.answerRecordList,'保存所有得答案');
    },

    childrenPrevQuestion(){
      this.currentChildrenIndex -= 1 
      this.currentChildrenObj = this.childrenList[this.currentChildrenIndex]  // 当前题目
      this.changeAns('refChildrenObj',this.currentChildrenObj,'_getUserChildAnswer')
    },

    _getUserChildAnswer(index,childrenIndex){
      let obj = this.answerRecordList[index]?this.answerRecordList[index]:{children:[]}
      let childObj = obj.children[childrenIndex]
      return (childObj&&childObj.answer)||''
    },
    // 下一题
    async childrenNextQuestion(){
      let key
      try{
        await this._saveRecord(this.currentChildrenObj,this.currentObj) // 调用保存接口
        this._saveAnswer('answer',this.userAns,this.currentIndex,this.answerRecordList,this.currentChildrenIndex)  // 本地保存记录
        if(this.currentChildrenIndex + 1 < this.childrenList.length){
          this.currentChildrenIndex += 1  
          this.currentChildrenObj = this.childrenList[this.currentChildrenIndex]  // 当前题目
          this.changeAns('refChildrenObj',this.currentChildrenObj,'_getUserChildAnswer')
          console.log(this.answerRecordList,'保存所有得答案');
        }else{
          this.nextQues()
        }
      }catch(error){console.log(error,'错误');}
    },

    // 打开交卷
    async openPost(){
      try{
        if(this.currentObj.questionType === 5||this.currentObj.questionType === 6){
          await this._saveRecord(this.currentChildrenObj,this.currentObj) // 调用保存接口
          this._saveAnswer('answer',this.userAns,this.currentIndex,this.answerRecordList,this.currentChildrenIndex)  // 本地保存记录
        }else{
          await this._saveRecord(this.currentObj)
          this._saveAnswer('answer',this.userAns,this.currentIndex,this.answerRecordList)  // 本地保存记录
        }
        this.backStatus = true
      }catch(error){
        console.log(error,'错误');
      }
      this.hasAnswer = this._hasNum(this.answerRecordList)
      this.postShow = true
    },
    _hasNum(list){
      let num = 0
      let computed = function(data){
        data.forEach((item)=>{
          if(!item||item.answer == '') return 
          num +=1
          if(item.children&&item.children.length > 0){
            computed(item.children)
          }
        })
      }
      computed(list)
      return num 
    },
    // 完成
    async hasDown(){
      let result = await this._createPaper('1')
      this.createPaper.updateTime = getTimer()
      this.$router.push({name:'viewMatchReport',query:{id:this.id,paperId:this.createPaperId}})
    }
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
    padding-top: .44rem;
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
