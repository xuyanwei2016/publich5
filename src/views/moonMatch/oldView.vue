<template>
  <!--在线练习-->
  <div class="practice">
    <topHeader  @back="backTo">
      <template v-slot:title></template>
    </topHeader>
    <div class="practice-item">
      <p-title :title='typeObj[currentObj.questionType]' :current-index="currentIndex+1" :all-num="list.length"></p-title>

      <component :ref="refObj[currentObj.questionType]" :is="componentName" :data-obj="currentObj" :current-Status="currentStatus" @changeSelect="changeSelect" :show-button="showButton" @input="completionChange"></component>
      <!-- 单选 -->
      <!-- <div v-if="currentObj.questionType === 1">
        <single ref="single" :data-obj="currentObj" :current-Status="currentStatus" @changeSelect="changeSelect" :show-button="showButton"></single>
      </div> -->
      <!-- 多选 -->
      <!-- <div v-if="currentObj.questionType === 2">
        <p-multiple  ref="multiple" :data-obj="currentObj" :current-Status="currentStatus" @changeSelect="changeSelect" :show-button="showButton"></p-multiple>
      </div> -->
      <!-- 判断 -->
      <!-- <div v-if="currentObj.questionType === 3">
         <single  ref="single" :data-obj="currentObj" :current-Status="currentStatus" @changeSelect="changeSelect" :show-button="showButton"></single>
      </div> -->
      <!-- 填空 -->
      <!-- <div  v-if="currentObj.questionType === 4">
        <completion ref="completion" :data-obj="currentObj" @input="completionChange"></completion>
      </div> -->
      <!-- 文字案例 -->
      <div v-if="currentObj.questionType === 5||currentObj.questionType === 6">
        <text-case :data-obj="currentObj"></text-case>
      </div>
    </div>
    <div v-if="currentObj.questionType === 1||currentObj.questionType ===2|| currentObj.questionType===3||currentObj.questionType ===4">
      <div style="display:flex">
        <p-button name="上一题" @click="preQuestion" v-if="currentIndex>0" class-type="prev"></p-button>
        <p-button name="下一题" @click="nextQuestion" v-if="currentIndex+1 != list.length"></p-button>
      </div>
      

    </div>
    <div v-if="currentObj.questionType === 5||currentObj.questionType === 6">
      <child-title :title='typeObj[currentChildrenObj.questionType]' :current-index="currentChildrenIndex+1" :all-num="childrenList.length"></child-title>
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
            <p-button name="上一题" @click="childrenPrevQuestion" class-type="prev"></p-button>
            <p-button name="下一题" @click="childrenNextQuestion" v-if="!(currentIndex === list.length -1&&currentChildrenIndex === childrenList.length - 1)"></p-button>
          </div>
        </div>
        <right-answer :analysis='currentChildrenObj.analysis' :answer="currentChildrenObj.rightanswer" :show-ans="true"  :ans-status="ansStatus"></right-answer>
        <div>
      </div>
    </div>
    <div v-if="(currentObj.questionType === 1||currentObj.questionType ===2|| currentObj.questionType===3||currentObj.questionType ===4)">
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
import { getMatchViewAPI } from '@/api/moon'
import {getWeekDetailAPI, getCollDetailAPI} from '@/api/detail';
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
          query:'listQuery'
        },
        'wrong':{  //  错题
          routerName:'myWrongbook',
          'API':getWeekDetailAPI,
          query:'wrongQuery'
        },
        'coll':{ // 收藏
          routerName:'myCollection',
          'API':getCollDetailAPI,
          query:'collQuery'
        }
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
    };
  },
  created() {
    let query = this.$route.query
    if(query&&query.id){
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
      this.$router.push({name:this.viewType[this.type].routerName})
    },
    getDetail(type){
      let API = this.viewType[type]['API'](this[this.viewType[type].query])
      API.then(res=>{
        if(res.data.code == 0){
          if(res.data.data.length  === 0) return 
          this.list = res.data.data
          this.currentIndex = 0         // 当前选中索引值
          this.currentObj = this.list[0]  // 当前选中题目
          this._showDetail(0)
        }else{
          
        }
      })
    },
    _showDetail(startIndex){ // 根据题目类型来确定渲染内容
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
    },
    // 动态渲染组件
    _showCom(currentObj){
      console.log(currentObj.questionType);
      
      console.log(this.componentType[currentObj.questionType]);
      
      this.componentName = this.componentType[currentObj.questionType]
    },

    // 修改状态
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
      this.currentStatus[answer] += num
      console.log(this.userAns,this.rightAns,'this.userAns == this.rightAns')
    },

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

    _getUserAnswer(index){
      let obj = this.answerRecordList[index]
      return (obj&&obj.answer)||''
    },
    
    preQuestion(){
      this.currentIndex -= 1 
      this.currentChildrenIndex = 0
      this.currentObj = this.list[this.currentIndex]  // 当前题目
      let key = this.currentObj.questionType == '4' ? 'value':'activeName'   // 填空题
      this._showDetail(0)
    },



    // 添加下一题信息
    nextQues(){
      this.currentIndex += 1                          // 当前索引
      this.currentObj = this.list[this.currentIndex]  // 当前题目
      this.$nextTick(()=>{
        this._showDetail(0)
      })
    },
    // 下一题
    async nextQuestion(){
      this.nextQues()
    },

    childrenPrevQuestion(){
      if(this.currentChildrenIndex > 0){
        this.currentChildrenIndex -= 1 
        this.currentChildrenObj = this.childrenList[this.currentChildrenIndex]  // 当前题目
        this.changeScore(this.currentChildrenObj,this.refChildrenObj)
      }else{
        this.currentIndex -= 1 
        this.currentChildrenIndex = 0
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
        this.changeScore(this.currentChildrenObj,this.refChildrenObj)
      }else{
        this.nextQues()
      }
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
