import Vue from 'vue'
import store from '../store';
import Router from 'vue-router'


Vue.use(Router)
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}


let router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/home/home.vue'),
      meta: "首页",
    },
    {
      path: '/uploadFile',
      name: 'uploadFile',
      component: () => import('@/views/uploadFile/index.vue'),
      meta: {
        title: "下载资料",
        isLogin: true
      },
    },
    {
      path: '/lineStudy',
      name: 'lineStudy',
      meta: {
        title: "在线学习",
        isLogin: true
      },
      component: () => import('@/views/lineStudy/index.vue'),
    },
    {
      path: '/business',
      name: 'business',
      /*meta:'在线经办',*/
      meta: {
        title: "职业指导",
        keepAlive: true, //此组件需要被缓存
        isBack:false, //用于判断上一个页面是哪个
        /*isLogin: true*/
      },
      component: () => import('@/views/business/index.vue'),
    },
    {
      path: '/pdf',
      name: 'pdf',
      meta:'pdf',
      component: () => import('@/views/business/pdf.vue'),
    },
    {
      path: '/play',
      name: 'play',
      meta:'视频播放',
      component: () => import('@/views/play/index.vue'),
    },
    {
      path: '/my',
      name: 'my',
      meta: {
        title: "个人中心",
        isLogin: true
      },
      component: () => import('@/views/my/index.vue'),
    },
    {
      path: '/myCompletion',
      name: 'myCompletion',
      meta:{
        title:`补全个人信息`,
      },
      component: () => import('@/views/completion/index.vue'),
    },
    {
      path: '/mychangeUnit',
      name: 'mychangeUnit',
      /*meta:'更改单位',*/
      meta: {
        title: "更改单位",
      },
      component: () => import('@/views/changeUnit/index.vue'),
    },
    /*{
      path: '/myAnswerlogs',
      name: 'myAnswerlogs',
      meta: {
        title: "答题记录",
        // isLogin: true
      },
      component: () => import('@/views/answerLogs/index.vue'),
    },*/
    {
      path: '/myWrongbook',
      name: 'myWrongbook',
      meta: {
        title: "错题本",
        isLogin: true
      },
      component: () => import('@/views/wrongBook/index.vue'),
    },
    {
      path: '/myWrongDetail',
      name: 'myWrongDetail',
      meta: {
        title: "错题详情",
        isLogin: true
      },
      component: () => import('@/views/moonMatch/viewMatch.vue'),
    },
    {
      path: '/myCollection',
      name: 'myCollection',
      meta: {
        title: "收藏试题",
        isLogin: true
      },
      component: () => import('@/views/collection/index.vue'),
    },
    {
      path: '/myCollectionDetail',
      name: 'myCollectionDetail',
      meta: {
        title: "试题详情",
        isLogin: true
      },
      component: () => import('@/views/moonMatch/viewMatch.vue'),
    },
    {
      path: '/myCourseware',
      name: 'myCourseware',
      meta: {
        title: "收藏课件",
        keepAlive: true, //此组件需要被缓存
        isBack:false, //用于判断上一个页面是哪个
        isLogin: true,
      },
      component: () => import('@/views/courseware/index.vue'),
    },
    {
      path: '/login',
      name: 'login',
      meta:'手机号快捷登录',
      component: () => import('@/views/login/index.vue'),
    },
    {
      path: '/weekPractice',
      name: 'weekPractice',
      meta: {
        title: "周周练",
        isLogin: true
      },
      component: () => import('@/views/weekPractice/index.vue'),
    },
    {
      path: '/practice',
      name: 'practice',
      meta: {
        title: "周周练试卷",
        isLogin: true
      },
      component: () => import('@/views/weekPractice/practice.vue'),
    },
    {
      path: '/viewPracticeReport',
      name: 'viewPracticeReport',
      meta: {
        title: "答题报告",
        isLogin: true
      },
      component: () => import('@/views/weekPractice/viewPracticeReport.vue'),
    },
    {
      path: '/moonMatch',
      name: 'moonMatch',
      meta: {
        title: "月月赛",
        isLogin: true
      },
      component: () => import('@/views/moonMatch/index.vue'),
    },
    {
      path: '/match',
      name: 'match',
      meta: {
        title: "月月赛试卷",
        isLogin: true
      },
      component: () => import('@/views/moonMatch/match.vue'),
    },
    {
      path: '/viewMatch',
      name: 'viewMatch',
      meta: {
        title: "查看解析",
        isLogin: true
      },
      component: () => import('@/views/moonMatch/viewMatch.vue'),
    },
    {
      path: '/userView',
      name: 'userView',
      meta: {
        title: "查看解析"
      },
      component: () => import('@/views/moonMatch/userView.vue'),
    },
    {
      path: '/viewMatchReport',
      name: 'viewMatchReport',
      meta: {
        title: "答题报告",
        isLogin: true
      },
      component: () => import('@/views/moonMatch/viewMatchReport.vue'),
    },

    {
      path: '/answerRecord',
      name: 'answerRecord',
      meta: {
        title: "答题记录",
        isLogin: true
      },
      component: () => import('@/views/answerRecord/index.vue'),
    },
    /*留言板 X*/
    {
      path: '/messageBoard',
      name: 'messageBoard',
      meta: {
        title: "留言板",
        /*keepAlive: true, //此组件需要被缓存
        isBack:false, //用于判断上一个页面是哪个
        isLogin: true*/
      },
      component: () => import('@/views/messageBoard/index.vue'),
    },
  ]
})
export default router
router.beforeEach((to, from, next) => {
  if(from.name=='play'||from.name=="pdf"){
    to.meta.isBack=true;
  }
  if (to.matched.some(function (item) {
    return item.meta.isLogin
  })) {
    if(!store.state.token){
      next('/login')
      return
    }else{
      if(store.state.isFirstLogin==1){
        next('/myCompletion')
        return
      }
      next()
      return
    }
    next()
  } else
    next()
})
