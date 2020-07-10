<template>
  <!--登录-->
  <div class="login">
    <noBgHeader></noBgHeader>
    <!--<div class="banner"><img src="../../assets/img/home/banner.png" alt=""></div>-->
    <div class="cont1">
      <ul>
        <li>
          <img src="../../assets/img/my/phone.png" alt="">
          <input type="text" placeholder="请输入手机号码" v-model="phone">
        </li>
        <li>
          <img src="../../assets/img/my/password.png" alt="">
          <input type="text" placeholder="请输入验证码" v-model="imgCode">
          <span @click="getImgCode"><img :src="img" alt=""></span>
        </li>
        <li>
          <img src="../../assets/img/my/yzm.png" alt="">
          <input type="text" placeholder="请输入验证码" v-model="phoneCode">
          <h2 @click="phone!=''&&isLoading&&getPhonecode()" :style="{color:phone==''?'#C0BFC5':''}">{{btnText}}</h2>
        </li>
      </ul>
    </div>

    <div class="cont2">
      <h2 class="errorMsg">{{errormsg}}</h2>
      <button @click="phone!=''&&phoneCode!=''&&login()" :style="{background:phone==''||phoneCode==''?'#C0BFC5':''}">
        登录
      </button>
      <p>登录表示您同意<span  @click="isShow=true">《会员注册协议》</span></p>
    </div>
    <div class="prop" v-if="isShow">
      <div class="contProp">
        <van-icon name="cross" @click="isShow=false"/>
        <h1>用户协议</h1>
        <div class="overCss">
          <p>第一条  为加强对互联网用户账号名称的管理，保护公民、法人和其他组织的合法权益，根据《国务院关于授权国家互联网信息办公室负责互联网信息内容管理工作的通知》和有关法律、行政法规，制定本规定。</p>

          <p>第二条  在中华人民共和国境内注册、使用和管理互联网用户账号名称，适用本规定。</p>

          <p>本规定所称互联网用户账号名称，是指机构或个人在博客、微博客、即时通信工具、论坛、贴吧、跟帖评论等互联网信息服务中注册或使用的账号名称。</p>

          <p>第三条  国家互联网信息办公室负责对全国互联网用户账号名称的注册、使用实施监督管理，各省、自治区、直辖市互联网信息内容主管部门负责对本行政区域内互联网用户账号名称的注册、使用实施监督管理。</p>

          <p>第四条  互联网信息服务提供者应当落实安全管理责任，完善用户服务协议，明示互联网信息服务使用者在账号名称、头像和简介等注册信息中不得出现违法和不良信息，配备与服务规模相适应的专业人员，对互联网用户提交的账号名称、头像和简介等注册信息进行审核，对含有违法和不良信息的，不予注册；保护用户信息及公民个人隐私，自觉接受社会监督，及时处理公众举报的账号名称、头像和简介等注册信息中的违法和不良信息。</p>

          <p>第五条  互联网信息服务提供者应当按照“后台实名、前台自愿”的原则，要求互联网信息服务使用者通过真实身份信息认证后注册账号。</p>

          <p>互联网信息服务使用者注册账号时，应当与互联网信息服务提供者签订协议，承诺遵守法律法规、社会主义制度、国家利益、公民合法权益、公共秩序、社会道德风尚和信息真实性等七条底线。</p>

          <p>第六条  任何机构或个人注册和使用的互联网用户账号名称，不得有下列情形：</p>

          <p>（一）违反宪法或法律法规规定的；</p>

          <p>（二）危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家统一的；</p>

          <p>（三）损害国家荣誉和利益的，损害公共利益的；</p>

          <p>（四）煽动民族仇恨、民族歧视，破坏民族团结的；</p>

          <p>（五）破坏国家宗教政策，宣扬邪教和封建迷信的；</p>

          <p>（六）散布谣言，扰乱社会秩序，破坏社会稳定的；</p>

          <p>（七）散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的；</p>

          <p>（八）侮辱或者诽谤他人，侵害他人合法权益的；</p>

          <p>（九）含有法律、行政法规禁止的其他内容的。</p>

          <p>第七条  互联网信息服务使用者以虚假信息骗取账号名称注册，或其账号头像、简介等注册信息存在违法和不良信息的，互联网信息服务提供者应当采取通知限期改正、暂停使用、注销登记等措施。</p>

          <p>第八条  对冒用、关联机构或社会名人注册账号名称的，互联网信息服务提供者应当注销其账号，并向互联网信息内容主管部门报告。</p>

          <p>第九条  对违反本规定的行为，由有关部门依照相关法律规定处理。</p>

          <p>第十条  本规定自2020年6月10日施行。</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {loginAPI, getPhoneCodeAPI, getImgCodeAPI} from '@/api/login.js';
  import {Icon, List, NavBar, Picker} from "vant";

  export default {
    name: 'HelloWorld',
    data() {
      return {
        isShow:false,
        img: null,
        uuid: null,
        phone: '',
        imgCode: '',
        phoneCode: '',
        errormsg: '',
        second: 0,
        interval: null,
        isLoading:true,
      }
    },
    created() {
      this.getImgCode();
    },
    components: {
      "van-icon":Icon,
    },
    computed: {
      btnText() {
        return this.second !== 0 ? `重新获取(${this.second}s)` : "获取验证码"//
      }
    },
    watch: {
      phone(n, o) {
        if (n != o) {
          this.errormsg = '';
        }
      },
      imgCode(n, o) {
        if (n != o) {
          this.errormsg = '';
        }
      },
      phoneCode(n, o) {
        if (n != o) {
          this.errormsg = '';
        }
      },
    },
    methods: {
      getImgCode() {
        console.log()
        getImgCodeAPI().then(res => {
          if (res.data.img) {
            this.img = res.data.img;
            this.uuid = res.data.uuid;
          }
        })
      },
      login() {
        loginAPI({
          code: this.phoneCode,
          phone: this.phone,
        }).then(res => {
          if (res.data.code==0) {
            this.$store.commit('setToken',res.data.data);
          } else {
            if(res.data.code==-1){
              this.errormsg=res.data.msg;
              return
            }
            let errorM={5010:'手机号不能为空',5011:'验证码不能为空',5012:'验证码已过期',5013:'验证码有误'};
/*验证短验证码 5010:手机号不能为空 5011:验证码不能为空 5012:验证码已过期，请从新获取 5013:验证码有误*/
            this.errormsg=errorM[res.data.code];
          }
        })
      },
      getPhonecode() {
        let self = this;

        this.errormsg = this.yzPhone();
        if (this.errormsg != '') return;
        this.yzImgCode();
        if (this.errormsg != '') return;
        this.isLoading=false;
        getPhoneCodeAPI({
          phone: this.phone,
          uuid: this.uuid,
          code: this.imgCode
        }).then(res => {
          if (!res.data.status) {
            this.errormsg = res.data.msg;
            this.isLoading=true;
            this.getImgCode();
          } else {
            self.second = 60;
            this.interval = setInterval(() => {
              self.second--
              /*this.addBtnFlag = false*/
              if (self.second == 0) {
                this.isLoading=true;
                clearInterval(self.interval)
                /*this.addBtnFlag = true*/
              }
            }, 1000);
          }

        })
      },

      yzPhone() {
        if (this.phone == '') {
          return '请输入手机号';
        } else {
          if (!(/^1[3456789]\d{9}$/.test(this.phone))) {
            return '请输入正确的手机号';
          } else {
            return '';
          }
        }
      },

      yzImgCode() {
        if (this.imgCode == '') {
          this.errormsg = '请输入图片验证码';
        } else {
          this.errormsg = '';
        }
      },

      yzPhoneCode() {
        if (this.phoneCode.trim() == '') {
          this.errormsg = '请输入图片验证码';
        } else {
          this.errormsg = '';
        }
      },
    },
    destroyed() {
      clearInterval(this.interval)
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .login {
    width: 3.75rem;
    overflow: auto;
    background-image: url("../../assets/img/home/banner.jpg");
    background-repeat: no-repeat;
    background-size: 100% 2.4rem;
    background-position: top left;
    /*.banner{width: 3.75rem;height:2.4rem;margin-top:-2.14rem;img{width: 3.75rem;height:2.4rem;object-fit:cover}}*/
    padding-top: 2.14rem;
    padding-bottom: .2rem;

    .cont1 {
      padding-top: .08rem;
      background: #fff;
      border-radius: .1rem .1rem 0 0;

      ul {
        width: 3.25rem;
        margin: 0 auto;

        li {
          padding-left: .09rem;
          border-bottom: 1px solid #E8E8E8;
          height: .63rem;
          display: flex;
          align-items: center;

          img {
            height: .18rem;
            object-fit: contain;
            float: left;
          }

          input {
            height: .2rem;
            border: none;
            padding-left: .15rem;
            font-size: .15rem;
            width: 1.8rem;
            border-right: 1px solid #E4E4E4;
            float: left;
          }

          input::-webkit-input-placeholder {
            color: #C0BFC5;
          }

          input:-moz-placeholder {
            color: #C0BFC5;
          }

          input:-ms-input-placeholder {
            color: #C0BFC5;
          }

          span, h2 {
            display: inline-block;
            width: 1.08rem;
            float: right;
            padding-left: .15rem;
            height: .63rem;
            line-height: .63rem;
          }

          span {
            img {
              width: .66rem;
              height: .34rem;
              margin-top: .15rem
            }
          }

          h2 {
            color: #04B6BA;
            font-size: .14rem;
            font-weight: normal
          }
        }

        li:first-child input {
          border: none;
          width: 2.5rem
        }

      }
    }

    .cont2 {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-top: .55rem;
      position: relative;

      .errorMsg {
        position: absolute;
        top: .05rem;
        width: 3.25rem;
        color: #f56c6c;
        font-size: .11rem;
        font-weight: normal;
        padding-left: .09rem;
      }

      button {
        width: 3.05rem;
        height: .42rem;
        background: url("../../assets/img/my/buttonBg.png") no-repeat;
        background-size: contain;
        border-radius: .24rem;
        border: none;
        color: #fff;
        font-size: .15rem;
        margin: 0 auto;
      }

      p {
        padding-top: .3rem;
        color: #171717;
        font-size: .13rem;
        height: .2rem;
        line-height: .2rem;

        span {
          color: #03BCBE;
        }
      }
    }

    .prop{
      width: 100%;
      height:100%;
      position: fixed;
      top:0;
      left: 0;
      background: rgba(0,0,0,.2);
      display: flex;
      align-items: center;
      justify-content: center;
      .contProp{
        width: 80%;
        height:75%;
        background: #fff;
        /*overflow-y: scroll;*/
        border-radius: .08rem;
        padding: .15rem .15rem;
        position: relative;
        i{font-size: .16rem;position: absolute;top:.15rem;right: .15rem;color: #333333}
        h1{
          color: #333333;
          width: 100%;
          text-align: left;
          font-size: .16rem;
          /*font-weight: normal;*/
          line-height: .26rem;
        }
        .overCss{
          overflow-y: scroll;
          height: calc(100% - .3rem);
          p{
            color: #333333;
            padding: .04rem 0;
            line-height: .2rem;
            text-indent: 2em;
          }
        }

      }
    }
  }
</style>
