<template>
    <div class="comFoot">
      <ul>
        <li v-for="(item,index) in link" :key="index" :class="$route.path==item.curLink?'active':''" @click="linkHref(item.curLink)"><img :src="$route.path==item.curLink?item.iconHover:item.icon" alt=""><p>{{item.tit}}</p></li>
      </ul>
    </div>
</template>

<script>
  import {Toast} from 'vant';
    export default {
        name: 'HelloWorld',
        data() {
            return {
              link:[
                {tit:'首页',icon:'./static/img/home.png',iconHover:'./static/img/home-h.png',curLink:'/'},
                {tit:'留言板',icon:'./static/img/massage.png',iconHover:'./static/img/massage-h.png',curLink:'/messageBoard'},
                {tit:'我的',icon:'./static/img/me.png',iconHover:'./static/img/me-h.png',curLink:'/my'},
              ],
            }
        },
        created() {
        },
        watch: {},
        methods: {
          linkHref(link){
            if(link==''){
              Toast.fail('正在开发中');
            }
            this.$router.push(link);
          },
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.comFoot{
  height: .49rem;
  width: 100%;
  background: #fff;
  position: fixed;
  bottom: 0;
  left:0;
  ul{
    padding: .07rem .53rem 0;
    display: flex;
    justify-content: space-between;
    li{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      img{
        height: .19rem;
        object-fit: contain;
      }
      p{
        font-size: .1rem;
        height: .2rem;
        line-height: .2rem;
        color: #AAAAAA;
      }
    }
    .active{
      p{
        color: #01ADAF;
      }
    }
  }
}
</style>
