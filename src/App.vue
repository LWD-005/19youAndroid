

<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return{
      imgSrc:'../../../static/img/'
    }
  },
  created(){
    var click=false;
    var lottery={
    index:-1,    //当前转动到哪个位置，起点位置
    count:0,    //总共有多少个位置
    timer:0,    //setTimeout的ID，用clearTimeout清除
    speed:20,    //初始转动速度
    times:0,    //转动次数
    cycle:50,    //转动基本次数：即至少需要转动多少次再进入抽奖环节
    prize:-1,    //中奖位置
    init:function(id){
        if ($("#"+id).find(".lottery-unit").length>0) {
            $lottery = $("#"+id);
            $units = $lottery.find(".lottery-unit");
            this.obj = $lottery;
            this.count = $units.length;
            $lottery.find(".lottery-unit-"+this.index).addClass("active");
        };
    },
    roll:function(){
        var index = this.index;
        var count = this.count;
        var lottery = this.obj;
        $(lottery).find(".lottery-unit-"+index).removeClass("active");
        index += 1;
        if (index>count-1) {
            index = 0;
        };
        $(lottery).find(".lottery-unit-"+index).addClass("active");
        this.index=index;
        return false;
    },
    stop:function(index){
        this.prize=index;
        return false;
    }
};

function roll(){
    lottery.times += 1;
    lottery.roll();//转动过程调用的是lottery的roll方法，这里是第一次调用初始化
    if (lottery.times > lottery.cycle+10 && lottery.prize==lottery.index) {
        clearTimeout(lottery.timer);
        lottery.prize=-1;
        lottery.times=0;
        click=false;
    }else{
        if (lottery.times<lottery.cycle) {
            lottery.speed -= 10;
        }else if(lottery.times==lottery.cycle) {
            var index = Math.random()*(lottery.count)|0;//中奖物品通过一个随机数生成
            lottery.prize = index;        
        }else{
            if (lottery.times > lottery.cycle+10 && ((lottery.prize==0 && lottery.index==7) || lottery.prize==lottery.index+1)) {
                lottery.speed += 110;
            }else{
                lottery.speed += 20;
            }
        }
        if (lottery.speed<40) {
            lottery.speed=40;
        };
        //console.log(lottery.times+'^^^^^^'+lottery.speed+'^^^^^^^'+lottery.prize);
        lottery.timer = setTimeout(roll,lottery.speed);//循环调用
    }
    return false;
};
        lottery.init('lottery');
        $("#lottery a").click(function(){
            console.log(1112)
            if (click) {//click控制一次抽奖过程中不能重复点击抽奖按钮，后面的点击不响应
                return false;
            }else{
                lottery.speed=100;
                roll();    //转圈过程不响应click事件，会将click置为false
                click=true; //一次抽奖完成后，设置click为true，可继续抽奖
                return false;
            }
        });
    }
}
</script>

<style lang="less">
#app .yd-mask{
  background: url(../static/img/bg_mask.png) no-repeat ;
  background-size: 100% 100%;
}
body{
  background: #fff;
}
a {
    text-decoration: none;
}
.router-link-active {
    text-decoration: none;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.banner{
  .yd-slider-pagination-item{
    width: .11rem;
    height: .11rem;
    margin-right: .12rem;
    background-color: #f8d6d3;
  }
  .yd-slider-pagination-item-active{
    background-color: #fff;
  }
  .yd-slider-pagination-item:last-child{
    margin-right: .32rem;
  }
  .yd-slider-pagination{
    justify-content: flex-end;
    bottom: .2rem;
  }
}
.footer_nav footer{
  font-size: .16rem !important;
  position: fixed;
  left: 0;
  bottom: 0;
}
.footer_nav .yd-tabbar-icon{
  width: .32rem;
  height: .32rem;
}
.footer_nav .game .yd-tabbar-icon{
  background: url(../static/img/game.png) no-repeat ;
  background-size: .32rem .32rem;
}
.footer_nav .game.router-link-active .yd-tabbar-icon{
  background: url(../static/img/dgame.png) no-repeat ;
  background-size: .32rem .32rem;
}
.footer_nav .lb .yd-tabbar-icon{
  background: url(../static/img/lb.png) no-repeat ;
  background-size: .32rem .32rem;
}
.footer_nav .lb.router-link-active .yd-tabbar-icon{
  background: url(../static/img/dlb.png) no-repeat ;
  background-size: .32rem .32rem;
}
.footer_nav .wd .yd-tabbar-icon{
  background: url(../static/img/wd.png) no-repeat ;
  background-size: .32rem .32rem;
}
.footer_nav .wd.router-link-active .yd-tabbar-icon{
  background: url(../static/img/dwd.png) no-repeat ;
  background-size: .32rem .32rem;
}
.yd-tabbar-txt{
  font-size: .16rem;
  margin-top: .02rem;
}
.router-link-active .yd-tabbar-txt{
  color: #ff2d2c;
}
/*充值页面(payCenter)下拉箭头样式*/
#app .yd-accordion-head:after{
  bottom: -.08rem !important;
}
#app .yd-accordion-title{
  height: .7rem !important;
  color: #606060 !important;
  font-size: .22rem !important;
  min-height: 0 !important;
}
#app .yd-accordion-head-arrow{
  height: .7rem !important;
  min-height: 0 !important;
}
#app .yd-accordion-head-arrow:after{
	border: none !important;
}
#app .yd-accordion-head:after{
  border: .07rem solid #f1f1f2 !important;
}
/*礼包页 礼包领取按钮样式*/
.yd-btn-block{
  margin-top: 0;
}
.yd-popup-content{
  padding-top: .3rem;
}
.exhibitors .yd-slider .yd-slider-pagination{
  display: none;
}
.exhibitors .yd-slider-item{
  width: 65%;
}
.exhibitors .yd-slider{
  margin-top: -.65rem;
}

</style>
