<template>
  <div class="lottery">
      <div class="lottery_header">
          <div class="lottery_back"  @click="$router.go(-1);">
              <img :src="imgSrc+'back.png'" alt="">
          </div>
          <div class="lottery_icon">
              当前积分：9999
          </div>
      </div>
      <div class="exhibitors">
          <div class="exhibitors_start">
              <img :src="imgSrc+'lottery_start.png'" alt="">
          </div>
          <div class="exhibitors_gd">
              <yd-slider autoplay="3000" speed="7000">
                <yd-slider-item>
                    恭喜 刘德华 抽中了 10 积分    
                </yd-slider-item>
                <yd-slider-item>
                    恭喜 刘德华 抽中了 10 积分
                </yd-slider-item>
                <yd-slider-item>
                   恭喜 刘德华 抽中了 10 积分
                </yd-slider-item>
                <yd-slider-item>
                    恭喜 刘德华 抽中了 10 积分
                </yd-slider-item>
            </yd-slider>
          </div>
      </div>
      <div class="luckDraw">
        <div class="container">
            <div class="turntable-wrapper">
                <div class="luck-wrapper">
                    <ul class="nineGrid">
                        <li class="row">
                            <div v-for="(n, key) in 3" :key="n" :class="index === key ? `active` : ``">
                                <div class="wrapper">
                                <img :src="imgSrc+'lottery_icon.png'" alt="">
                                </div>
                                <div class="mask"></div>
                            </div>
                        </li>
                        <li class="row">
                            <div :class="index === 7 ? 'active': ''">
                                <div class="wrapper">
                                <img :src="imgSrc+'lottery_icon.png'" alt="">
                                </div>
                                <div class="mask"></div>
                            </div>
                            <div class="getLuck" @click="startLottery">
                                <div class="wrapper begin">
                                <img :src="imgSrc+'lottery_begin.png'" alt="">
                                </div>
                            </div>
                            <div :class="index === 3 ? 'active': ''">
                                <div class="wrapper">
                                <img :src="imgSrc+'lottery_icon.png'" alt="">
                                </div>
                                <div class="mask"></div>
                            </div>
                        </li>
                        <li class="row">
                            <div v-for="(n, key) in 3" :key="n" :class="index === 6-key ? `active` : ``">
                                <div class="wrapper">
                                <img :src="imgSrc+'lottery_icon.png'" alt="">
                                </div>
                                <div class="mask"></div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <div class="lotteryBottom">
           <yd-button class="lottery_rule" size="large" type="primary" @click.native="ruleShow = true">

            </yd-button>
            <!-- 活动规则弹窗 -->
            <yd-popup v-model="ruleShow" position="center" width="5.2rem">
                 <div class="rule_winClose" @click="ruleShow = false"></div>
                <div class="rule_win">
                   <div class="rule_p">
                        <p>
                        活动时间：2017年4月24日-27日，共4天
                        </p>
                        <p>
                            活动规则：活动期间内，通过当当购物手机客户端成功购买图书的用户，均视为成功参与此次活动；每个用户只可参与一次。
                        </p>
                        <p>活动奖励：成功参与此次活动的用户，均可获得10元当当网自营图书音像现金券，此礼券当当网自营图书音像品类通用，无最低消费限制，不可用于其他类商品交易；现金券有效期5月1日-5月31日，礼券不可转让、不可返现。</p>
                        <p>奖品发放：交易完成后，3个工作日内发送至参与用户账号</p>
                        <p>补充说明：此次活动不与当当网客户端用户首单奖励5元活动冲突，可同时参与。</p>
                        <p>此次活动最终解释权归当当网所有。</p>
                   </div>
                </div>
            </yd-popup>
            <yd-button class="lottery_rec" size="large" type="primary" @click.native="recShow = true">

            </yd-button>
            <!-- 中奖记录弹窗 -->
            <yd-popup v-model="recShow" position="center" width="5.2rem">
                 <div class="rec_winClose" @click="recShow = false"></div>
                <div class="rec_win">
                    <div class="recWin_list">
                        <div class="recWin_cont" v-for="(item,index) in recList" :key="index" >
                            <p class="recTime"><span class="recTime_day">{{item.recDay}}</span><span class="recTime_sj">{{item.recTime}}</span></p>
                            <p class="rec_num">抽中 {{item.recNum}}积分</p>
                        </div>
                    </div>
                </div>
            </yd-popup>
    </div>
        
  </div>
  
</template>

<script>
export default {
  name: 'luckDraw',
  data () {
    return {
    imgSrc:this.common.imgSrc,
      ruleShow:false,
      recShow:false,
      title: '积分转盘',
      index: -1,    // 当前转动到哪个位置，起点位置
      count: 8,    // 总共有多少个位置
      timer: 0,    // 每次转动定时器
      speed: 200,   // 初始转动速度
      times: 0,    // 转动次数
      cycle: 50,   // 转动基本次数：即至少需要转动多少次再进入抽奖环节
      prize: -1,   // 中奖位置
      click: true,
      showToast: false,
      toastType: 'luck',
      recList:[
          {
              recDay:"03-05",
              recTime:"07:00 PM",
              recNum:"10000万"
          },
          {
              recDay:"03-05",
              recTime:"07:00 PM",
              recNum:"10000万"
          },
          {
              recDay:"03-05",
              recTime:"07:00 PM",
              recNum:"10000万"
          },
          {
              recDay:"03-05",
              recTime:"07:00 PM",
              recNum:"10000万"
          },
           {
              recDay:"03-05",
              recTime:"07:00 PM",
              recNum:"10000万"
          },
      ]

    }
  },
  methods: {
    // 开始抽奖
    startLottery () {
      if (!this.click) {
        return
      }
      this.closeToast()
      this.speed = 200
      this.click = false
      this.startRoll()
    },
    // 开始转动
    startRoll () {
      this.times += 1  // 转动次数
      this.oneRoll()  // 转动过程调用的每一次转动方法，这里是第一次调用初始化

      // 如果当前转动次数达到要求 && 目前转到的位置是中奖位置
      if (this.times > this.cycle + 10 && this.prize === this.index) {
        clearTimeout(this.timer)   // 清除转动定时器，停止转动
        this.prize = -1
        this.times = 0
        this.click = true
        this.showToast = true
        this.toastType = 'comeOn'
        console.log('你已经中奖了')
      } else {
        if (this.times < this.cycle) {
          this.speed -= 10   // 加快转动速度
        } else if (this.times === this.cycle) {    // 随机获得一个中奖位置
          const index = parseInt(Math.random() * 10, 0) || 0
          this.prize = index
          if (this.prize > 7) {
            this.prize = 7
          }
          console.log(`中奖位置${this.prize}`)
        } else if (this.times > this.cycle + 10 &&
          ((this.prize === 0 && this.index === 7) || this.prize === this.index + 1)) {
          this.speed += 110
        } else {
          this.speed += 20
        }
        if (this.speed < 40) {
          this.speed = 40
        }
        this.timer = setTimeout(this.startRoll, this.speed)
      }
    },

    // 每一次转动
    oneRoll () {
      let index = this.index  // 当前转动到哪个位置
      const count = this.count  // 总共有多少个位置
      index += 1
      if (index > count - 1) {
        index = 0
      }
      this.index = index
    },

    // 关闭弹出框
    closeToast () {
      this.showToast = false
    },
  },
}
</script>

<style lang="less" scoped>
.lottery{
    width: 100%;
    height: 11.36rem;
    background: url(../../../static/img/lottery_bg.png) no-repeat;
    background-size: 100% 100%;
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    .lottery_header{
        overflow: hidden;
        padding-top: .27rem;
        .lottery_back{
            float: left;
            width: .18rem;
            height: .32rem;
            margin-left: .42rem;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .lottery_icon{
            float: right;
            margin-right: .33rem;
            font-size: .22rem;
            color: #fff9f1;
        }
    }
    .exhibitors{
        width: 5.6rem;
        height: .54rem;
        background: #fff;
        border-radius: .25rem;
        margin: 0 auto;
        margin-top: 2.73rem;
        padding-left: .6rem;
        .exhibitors_start{
            width: .71rem;
            height: .78rem;
            z-index: 2;
            img{
                width: 100%;
                height: 100%;
                margin-top: -.06rem;
                margin-left: -.66rem;
                margin-right: .7rem;
            }
        }
        .exhibitors_gd{
            color: #fb8d25;
            font-size: .2rem;
        }
    }
}
// 抽奖九宫格转盘样式
.luckDraw {
  .turntable-wrapper {
       margin: 0 auto;
      width: 5.82rem;
      height: 5.9rem;
        position: relative;
        margin-top: .25rem;
    .luck-wrapper {
      width:100%;
      height: 100%;
      margin: 0 auto;
      position: relative;
      .integral {
        width: 100%;
        color: #6d2d00;
        font-weight: normal;
        text-align: center;
        position: absolute;
        span {
          font-weight: 600;
          color: #ff2f4d;
        }
      }

      .nineGrid {
        width: 100%;
        height: 100%;
        padding: .28rem;
        background: #fff;
         border-radius: 9px;
         border-bottom: .08rem solid #ffd33e;
        li {
          display: flex;
        margin-bottom: .33rem;
          > div {
            width: 1.57rem;
            height: 1.57rem;
            text-align: center;
            position: relative;
            margin-right: .27rem;
            .wrapper {
              width: 1.57rem;
              height: 1.57rem;
              margin: 0;
            }
            .begin{
                height: 1.8rem;
            }
            img {
              width: 100%;
              height: 100%;
              vertical-align: middle;
            }

            .mask {
              position: absolute;
              top: 0;
              left: 0;
              width: 1.57rem;
              height: 1.72rem;
              background: url(../../../static/img/lottery_hover.png) no-repeat;
              background-size: 100% 100%;
              display: none;
            }
          }

          > div.active {
            .mask {
              display: block;
            }
          }
           > div:last-child {
            margin-right: 0;
          }
        }

        li:last-child {
          margin-bottom:0;
        }
      }
    }
  }
}
.lotteryBottom{
    overflow: hidden;
    padding: .1rem .23rem 0 .24rem;
    .lottery_rule{
        float: left;
        width: 1.23rem;
        height: .74rem;
        background: url(../../../static/img/lottery_ruleBtn.png) no-repeat;
        background-size: 100% 100%;
        margin-top: 0;
    }
    .lottery_rec{
        float: right;
        width: 1.23rem;
        height: .74rem;
        background: url(../../../static/img/lottery_recBtn.png) no-repeat;
        background-size: 100% 100%;
        margin-top: 0;
    }
}
// 活动规则弹窗样式
.rule_win{
    width: 5.2rem;
    height: 6rem;
    background: url(../../../static/img/ruleShow_bg.png) no-repeat;
    background-size: 100% 100%;
    .rule_p{
        padding: 1.73rem .25rem 0 .25rem;
        p{
            font-size: .18rem;
            color: #8c8c8c;
            text-align: justify;
            line-height: .3rem;
        }
    }
}
.rule_winClose{
    width: .27rem;
    height: .27rem;
    background: url(../../../static/img/gitfbag_winClose.png) no-repeat;
    background-size: .27rem .27rem;
    position: absolute;
    right: 0;
    top: 0;
}
// 中奖记录弹窗样式
.rec_win{
     width: 5.2rem;
    height: 6rem;
    background: url(../../../static/img/recShow_bg.png) no-repeat;
    background-size: 100% 100%;
    .recWin_list{
        padding: 1.78rem .4rem 0 .73rem;
        .recWin_cont{
           height: .82rem;
            .recTime{
                color: #909090;
                font-size: .16rem;
                overflow: hidden;
                .recTime_day{
                    float: left;
                    margin-left: .02rem;
                }
                .recTime_sj{
                    float: right;
                }
            }
            .rec_num{
                color: #636363;
                font-size: .18rem;
            }
        }
    }
}
.rec_winClose{
    width: .27rem;
    height: .27rem;
    background: url(../../../static/img/gitfbag_winClose.png) no-repeat;
    background-size: .27rem .27rem;
    position: absolute;
    right: 0;
    top: 0;
}
</style>

