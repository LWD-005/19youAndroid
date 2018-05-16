<template>
  <div class="wode">
      <div class="wd">
        <div class="wd_cont">
          <div v-if="dlzt==1" class="wd_header">
            <div class="wd_xx">
              <div class="wd_tx">
                <img src="../../static/img/wd_tx.png" alt="">
              </div>
              <div class="wd_mc">{{name}}</div>
              <div class="wd_qd">
                <a v-if="isSign==1" class="qd_btn">已签到</a>
                <yd-button v-else class="qd_btn go_qd" @click.native="signIn">去签到</yd-button>
                <!-- 点击去签到弹窗内容 -->
                <yd-popup v-model="qd_show" position="center" width="5.02rem">
                    <div class="sigIn_winClose" @click="qd_show = false"></div>
                    <div class="sigIn_win">
                        <p class="sigIn_tit">签到成功</p>
                        <p class="sigIn_7day">连续签到7天可获得大礼包</p>
                        <div class="sigIn_day">
                          <div class="numDay" v-for="(item,index) in log" :key="index">
                            <div class="numDay_bg active" v-if="item.is_sign==1">{{parseInt(index)+1}}</div>
                            <div class="numDay_bg" v-else>{{parseInt(index)+1}}</div>
                            <p class="oneIntegral">{{item.get}}积分</p>
                          </div>

                        </div>
                        
                         <a class="sigIn_btn"><span>已经连续签到{{continu}}天</span></a>
                    </div>
                   
                </yd-popup>
              </div>
            </div>
            <div class="wd_jb">
              <div class="jinbi">
                <img src="../../static/img/wd_xx.png" >
                <span class="jinbi_l">{{coin}}</span>
              </div>
              <div class="chongzhi">
                <router-link :to="{path:'/personal/payCenter'}">
                  <img src="../../static/img/wd_rb.png" alt="">
                  <span class="yxcz">游戏充值</span>
                </router-link>
              </div>
            </div>
          </div>
          <div v-else class="wd_header">
            <div class="wd_wdl">
              <div class="wdl_tx">
                <img src="../../static/img/wd_wdltx.png" alt="">
              </div>
              <div class="wdl_ts">登陆后关注更多活动</div>
              <div class="wdl_zc">
                <a class="wdl_btn" @click="login"><span>登陆/注册</span></a>
              </div>
            </div>
          </div>
          <div class="wd_sec">
            <div class="wd_list jfcj">
              <a @click="lettery">
                <img src="../../static/img/wd_jfsj.png" alt="">
                <span class="jfcj_tit">积分抽奖</span>
                <span class="wd_rg jfcj_rg"></span>
              </a>
            </div>
            <div class="wd_list tgyx">
              <a @click="share">
                <img src="../../static/img/wd_tgyx.png" alt="">
                <span class="jfcj_tit">推广游戏</span>
                <span class="wd_rg jfcj_rg"></span>
              </a>
            </div>
            <div class="wd_list jfjl">
              <a @click="credits">
                <img src="../../static/img/wd_jfjl.png" alt="">
                <span class="jfcj_tit">积分记录</span>
                <span class="wd_rg jfcj_rg"></span>
              </a>
            </div>
            <div class="wd_list lbjl">
              <a @click="Noyer">
                <img src="../../static/img/wd_lbjl.png" alt="">
                <span class="jfcj_tit">礼包记录</span>
                <span class="wd_rg jfcj_rg"></span>
              </a>
            </div>
            <div class="wd_list mmxg">
                <a @click="Noyer">
                  <img src="../../static/img/wd_mmxg.png" alt="">
                  <span class="jfcj_tit">密码修改</span>
                  <span class="wd_rg jfcj_rg"></span>
                </a>
            </div>
          </div>
          <a @click="Integra" class="jftx_btn"><span>积分提现</span></a>
        </div>
      </div>
      <div class="footer_nav">
        <my-nav></my-nav>
      </div>
  </div>
  
</template>

<script>
import Axios from 'axios'
export default {
  data(){
    return{
      dlzt:2,
      qd:0,
      qd_show:false,
      name:'',
      coin:'',
      log:[],
      isSign:'',
      continu:""
    }
    
  },
  created:function(){
    
    this.name = window.sessionStorage.getItem('name')
    this.coin = window.sessionStorage.getItem('coin')
    this.isSign = window.sessionStorage.getItem('isSign')
    const dlzt =window.sessionStorage.getItem('dlzt')
    if (dlzt==null) {
      this.dlzt=2;
    }else{
      this.dlzt=dlzt
    }
  },
  methods:{
    signIn(){
      let apiUrl=this.common.apiUrl;
      let tokenLogin = window.localStorage.getItem('token');
      Axios({
        method:'post',
        url:apiUrl+'Cis/SignIn',
        params:{
            token:tokenLogin
        },
        headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        },
      })
      .then((res)=>{
          this.qd_show=true;
          this.continu = res.data.d.continu;
          this.log = res.data.d.log;
      })
      .catch((error)=>{
        alert("网络错误，不能访问！");
      })
    },
    login(){
        this.$router.push({path:'/changepwd',query:{id:'login'}});
    },
    lettery(){
      if (this.dlzt==1) {
        this.$router.push({path:'/personal/lottery'});
      } else {
        this.$router.push({path:'/changepwd',query:{id:'login'}});
      }
        
    },
    share(){
      if (this.dlzt==1) {
        this.$router.push({path:'/personal/share'});
      } else {
        this.$router.push({path:'/changepwd',query:{id:'login'}});
      }
      
    },
    credits(){
      if (this.dlzt==1) {
        this.$router.push({path:'/personal/creditsLog'});
      } else {
        this.$router.push({path:'/changepwd',query:{id:'login'}});
      }
      
    },
    Noyer(){
      alert("该功能暂未开放")
    },
    Integra(){
      if (this.dlzt==1) {
        alert("积分提现请到公众号")
      } else {
        this.$router.push({path:'/changepwd',query:{id:'login'}});
      }
    }  
  }
}
</script>

<style lang="less" scoped>
.wd{
  height: auto;
  width: 100%;
  background: url(../../static/img/wd_bg.png) no-repeat;
  background-size: 100% 3.04rem;
  .wd_cont{
    padding: 1.42rem .3rem 0 .3rem;
    .wd_header{
      height: 1.98rem;
      background: #fff;
      border-radius: 4px;
      border-bottom: .07rem solid #eeeeef;
      // 登陆后样式
      .wd_xx{
        width: 100%;
        display: table;
          .wd_tx{
          width: 1.22rem;
          height: 1.22rem;
          margin-left: .2rem;
          float: left;
          img{
            margin-top: -.17rem;
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
        }
        .wd_mc{
          float: left;
          font-size: .24rem;
          color: #444444;
          font-weight: 500;
          margin: .38rem 0 0 .3rem;
        }
        .wd_qd{
          float: right;
          margin: .29rem .3rem 0 0;
          .qd_btn{
            display: block;
            width: 1.2rem;
            height: .82rem;
            line-height: .7rem;
            font-size: .2rem;
            text-align: center;
            color: #fff;
            background: url(../../static/img/yqd_btn.png) no-repeat;
            background-size:1.2rem .82rem;
          }
          .go_qd{
           background: url(../../static/img/wqd_btn.png) no-repeat;
           background-size:1.2rem .82rem;
            background-position: 0 .04rem;
            margin-top: -.04rem;
            padding: 0;
          }
        }
      }
      .wd_jb{
        padding: .15rem .6rem 0 .6rem;
        overflow: hidden;
        .jinbi{
          float: left;
          position: relative;
          img{
            width: .3rem;
            height: .3rem;
          }
          .jinbi_l{
            display: inline-block;
            font-size: .24rem;
            color: #555555;
            position: absolute;
            top: .02rem;
            left: .56rem;
          }
        }
        .chongzhi{
          float: right;
          position: relative;
          right: 1.2rem;
          img{
            width: .43rem;
            height: .42rem;
          }
          .yxcz{
            display: inline-block;
            font-size: .24rem;
            color: #555555;
            position: absolute;
            top: -.02rem;
            left: .55rem;
            width: 1.6rem;
          }
        }
      }
      // 未登录样式
      .wd_wdl{
        text-align: center;
        .wdl_tx{
          display: inline-block;
          width: 1.22rem;
          height: 1.22rem;
           margin-top: -.77rem;
          img{
            width: 100%;
            height: 100%;
            border-radius: 50%;
            margin-bottom: .15rem;
          }
        }
        .wdl_ts{
          font-size: .22rem;
          color: #7f7f7f;
        }
        .wdl_zc{
          margin-top: .16rem;
          .wdl_btn{
            width: 2.8rem;
            height: .52rem;
            display: inline-block;
            color: #fff;
            font-size: .24rem;
            font-family: "黑体";
            text-align: center;
            line-height:.52rem;
            border-radius: .2rem;
            position: relative;
            z-index: 0;
              span{
                  display: inline-block;
                  width: 2.8rem;
                  height: .52rem;
                  line-height: .52rem;
                  border-radius: .2rem;
                  position: relative;
                  z-index: 3;
                  background: linear-gradient(to right, #ff302b 0%, #ff4429 80%, #ff5526 100%);
              }
            }
          .wdl_btn:before{
            content: '';
            display: inline-block;
            height: .1rem;
            position: absolute;
            bottom: -.01rem;
            left: .1rem;
            right: .1rem;
            z-index: -1;
            border-radius: .1rem;
            background:  #ff302b;
            -webkit-filter: blur(5px) brightness(0.95);
              filter: blur(5px) brightness(0.95);
            
          }
        }
      }
    }
    .wd_sec{
      margin-top: .25rem;
      .wd_list{
        width: 100%;
        height: .69rem;
        border-bottom: 1px solid #eeeeee;
        line-height: .69rem;
        padding: 0 .17rem 0 .15rem;
        overflow: hidden;
        img{
          width: .24rem;
          height: .26rem;
          float: left;
          margin-top: .22rem;
        }
        .jfcj_tit{
          font-size: .22rem;
          color: #737373;
          margin-left: .24rem;
        }
        .wd_rg{
          display: block;
          width: .1rem;
          height: .18rem;
          background: url(../../static/img/wd_right.png);
          background-size: .1rem .18rem;
          float: right;
          margin-top: .26rem;
        }
      }
    }
    a{
      display: block;
    }
    .jftx_btn{
      width:  4.57rem;
      height: .63rem;
      margin: 0 auto;
      display: block;
      color: #fff;
      font-size: .24rem;
      font-family: "黑体";
      text-align: center;
      line-height: .38rem;
      border-radius: .25rem;
      position: relative;
      z-index: 0;
      bottom: -.5rem;
        span{
            display: inline-block;
            width: 4.57rem;
            height: .63rem;
            line-height: .63rem;
            border-radius: .25rem;
            position: relative;
            z-index: 2;
            background: linear-gradient(to right, #ff2d2c 0%, #ff4229 50%, #ff5826 100%);
        }
      }
      .jftx_btn:before{
          content: '';
          display: inline-block;
          height: .12rem;
          position: absolute;
          bottom: -.01rem;
          left: .1rem;
          right: .1rem;
          z-index: -1;
          border-radius: .1rem;
          background:  #ff302b;
          -webkit-filter: blur(5px) brightness(0.95);
          filter: blur(5px) brightness(0.95);
      
     }
                
  }
  // 弹窗背景图样式
    .sigIn_win{
        width: 5.02rem;
        height: 5.31rem;
        background: url(../../static/img/sigIn_win.png) no-repeat;
        background-size: 5.02rem 5.31rem;
        margin: 0 auto;
        .sigIn_tit{
          color: #fff;
          font-size: .36rem;
          padding-top: .43rem;
          text-align: center;
        }
        .sigIn_7day{
          color: #777;
          font-size: .16rem;
          text-align: center;
          margin-top: 1.8rem;
        }
        .sigIn_day{
          padding: .2rem .07rem 0 .28rem;
          overflow: hidden;
          .numDay{
            float: left;
            .numDay_bg{
              width: .49rem;
              height: .66rem;
              background: url(../../static/img/wqd_icon.png) no-repeat;
              background-size:.49rem .66rem;
              text-align: center;
              padding-top: .1rem;
              color: #121315;
              font-size: .16rem;
              margin-right: .17rem;
            }
            .oneIntegral{
              width: .49rem;
              font-size: .15rem;
              color: #646464;
              text-align: center;
              margin-top: .12rem;
            }
            .active{
              background: url(../../static/img/yqd_icon.png) no-repeat !important;
              background-size:.49rem .66rem !important;
            }
          }
          .numDay:last-child{
              .numDay_bg{
                background: url(../../static/img/yqd7_icon.png) no-repeat;
                background-size:.49rem .66rem;
              }
          }
        }
      .sigIn_btn{
          width: 2.36rem;
          height: .38rem;
          display: block;
          color: #fff;
          font-size: .18rem;
          font-family: "黑体";
          text-align: center;
          line-height: .38rem;
          border-radius: .13rem;
          position: relative;
          z-index:0;
           margin:0 auto;
           margin-top: .3rem;
          span{
              display: inline-block;
              width: 2.36rem;
              height: .38rem;
              line-height: .38rem;
              border-radius: .13rem;
              position: relative;
              z-index: 2;
              background: linear-gradient(to right, #ff5526 0%, #ff4429 80%, #ff302b 100%);
          }
        }
      .sigIn_btn:before{
          content: '';
          display: inline-block;
          height: .1rem;
          position: absolute;
          bottom: -.01rem;
          left: .1rem;
          right: .1rem;
          z-index: -1;
          border-radius: .1rem;
      background:  #ff302b;
          -webkit-filter: blur(5px) brightness(0.95);
          filter: blur(5px) brightness(0.95);
      }
    }
    .sigIn_winClose{
        width: .27rem;
        height: .27rem;
        background: url(../../static/img/gitfbag_winClose.png) no-repeat;
        background-size: .27rem .27rem;
        position: absolute;
        right: 0;
        top: 0;
    }
}
</style>

