<template>
  <div class="payCenter">
      <div class="payCenter_header">
          <div class="payCenter_back"  @click="$router.go(-1);">
              <img :src="imgSrc+'creditsLog_back.png'" alt="">
          </div>
          <p class="payCenter_tit">充值中心</p>
      </div>
      <div class="payCenter_uplink">
          <yd-accordion>
           <div @click="gameList">
                <yd-accordion-item :title=is_game>
                    <div style="padding: .24rem;">
                        <p @click.stop="isGame(item.name,item.id)" v-for="(item,index) in Glist" :key="index">{{item.name}}</p>
                    </div>
                </yd-accordion-item>
           </div>
           <div @click="serverList">
               <yd-accordion-item :title=is_server>
                    <div style="padding: .24rem;">
                        <p @click.stop="isServer(item.name,item.id)" v-for="(item,index) in server" :key="index">{{item.name}}</p>
                    </div>
                </yd-accordion-item>
           </div>
            <div @click="roleList">
               <yd-accordion-item :title=is_role>
                    <div style="padding: .24rem;">
                        <p @click.stop="isRole(item.name)" v-for="(item,index) in role" :key="index">{{item.name}}</p>
                    </div>
                </yd-accordion-item>
           </div>
        </yd-accordion>
      </div>
      <div class="credit">
          <p class="credit_tit">充值金额</p>
          <div class="credit_list">
              <div :class="{active:item.isActive}" v-for="(item,index) in creditList" :key="index"  @click="activeFun(item)">￥{{item.money}}元<i class="credit_pitch"></i></div>
          </div>
      </div>
       <div class="prePaid">
          <p class="prePaid_tit">充值支付方式</p>
          <div class="prePaid_list">
              <div class="pay" :class="item.className" v-for="(item,index) in prePaidList" :key="index"  @click="pitchFun(item)">
                  <img :src="item.imageSrc" alt="">
                  <span class="prePaidList_tit">{{item.prePaidList_tit}}</span>
                  <i :class="{pitch:item.isPitch}"></i>
              </div>
             
          </div>

      </div>
      <!-- <router-link :to="{path:'/changepwd'}"> -->
          <button @click="Recharge" class="payLogin">充值</button>
      <!-- </router-link> -->
  </div>
  
</template>

<script>
import Axios from 'axios'

export default {
    data(){
        return{
            imgSrc:this.common.imgSrc,
            prePaidList:[
                // {
                //     className:"Unionpay",
                //     imageSrc:"../../../static/img/Unionpay.png",
                //     prePaidList_tit:"银行卡支付",
                //     isPitch:true
                // },
                {
                    className:"WeChat",
                    imageSrc:"./static/img/WeChat.png",
                    prePaidList_tit:"微信支付",
                    isPitch:true,
                    pay:2
                },
                {
                    className:"Alipay",
                    imageSrc:"./static/img/Alipay.png",
                    prePaidList_tit:"支付宝支付",
                    isPitch:false,
                    pay:1
                },
            ],
            creditList:[
                {
                    money:"500",
                    isActive:true
                },
                {
                    money:"200",
                    isActive:false
                },
                {
                    money:"100",
                    isActive:false
                },
                {
                    money:"50",
                    isActive:false
                },
            ],
            Glist:[],
            is_game:'请选择游戏',
            server:[],
            gameid:'',
            is_server:'请选择区服',
            serverid:'',
            role:[],
            is_role:'请选择角色',
            amount:500,
            payway:2
        }
        
    },
    methods:{
        activeFun:function(data){
                this.creditList.forEach(function(obj){
                    obj.isActive = false;
                });
                data.isActive = !data.isActive;
                this.amount = data.money
            },
        pitchFun:function(data){
            this.prePaidList.forEach(function( pitchObj){
                    pitchObj.isPitch = false;
                });
                data.isPitch = !data.isPitch;
                 this.payway = data.pay
        },
        gameList:function(){
            let apiUrl=this.common.apiUrl;
            let tokenLogin = window.localStorage.getItem('token');
            Axios({
                method:'post',
                url:apiUrl+'Game/GetRole',
                params:{
                    token:tokenLogin,
                    type:1
                },
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
                },
            })
            .then((res)=>{
                this.Glist=res.data.d.list
            })
            .catch((error)=>{
                alert('网络错误，不能访问')
            })
        },
        isGame(gameName,gameId){
            this.is_game=gameName
            this.gameid = gameId
        },
        serverList:function(){
            let apiUrl=this.common.apiUrl;
            let tokenLogin = window.localStorage.getItem('token');
            Axios({
                method:'post',
                url:apiUrl+'Game/GetRole',
                params:{
                    token:tokenLogin,
                    type:2,
                    gameid:this.gameid
                },
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
                },
            })
            .then((res)=>{
                this.server=res.data.d.list
            })
            .catch((error)=>{
                alert('网络错误，不能访问')
            })
        },
        isServer(serverName,serverId){
            this.is_server=serverName
            this.serverid = serverId
        },
        roleList:function(){
            let apiUrl=this.common.apiUrl;
            let tokenLogin = window.localStorage.getItem('token');
            Axios({
                method:'post',
                url:apiUrl+'Game/GetRole',
                params:{
                    token:tokenLogin,
                    type:2,
                    gameid:this.gameid,
                    serverid:this.serverid
                },
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
                },
            })
            .then((res)=>{
                this.role=res.data.d.list
            })
            .catch((error)=>{
                alert('网络错误，不能访问')
            })
        },
        isRole(roleName){
            this.is_role=roleName
        },
        Recharge:function(){
            if (this.is_game=='请选择游戏') {
                alert("请选择您的游戏")
            }else if(this.is_server=='请选择区服') {
                alert("请选择您的区服")
            }else if (this.is_role=='请选择角色'){
                alert("请选择您的角色")
            }else{
                let apiUrl=this.common.apiUrl;
                let tokenLogin = window.localStorage.getItem('token');
                Axios({
                    method:'post',
                    url:apiUrl+'Fina/Recharge',
                    params:{ 
                        token:tokenLogin,
                        gameid:this.gameid,
                        amount:this.amount,
                        payway:this.payway
                    },
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
                    },
                })
                .then((res)=>{
                    alert(res.data.d.m)
                    console.log(res)
                })
                .catch((error)=>{
                    alert('网络错误，不能访问')
                })
            }
        }
    },
    
}

</script>

<style lang="less" scoped>
    .payCenter{
        // 积分明细页面头部样式
        .payCenter_header{
            overflow: hidden;
            padding-top: .27rem;
            width: 100%;
            height: .82rem;
            background: #fff;
            border-bottom: .08rem solid #f2f2f3;
            .payCenter_back{
                float: left;
                width: .18rem;
                height: .32rem;
                margin-left: .42rem;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            .payCenter_tit{
                text-align: center;
                color:#606060;
                font-size: .3rem;
                letter-spacing: .04rem;
                margin-top: -.1rem;
                margin-left: -.4rem;
                width: 95%;
            }
        }
        .payCenter_uplink{
            padding: .28rem .3rem 0 .3rem;
        }
        .credit{
            padding: .32rem .29rem 0 .29rem;
            .credit_tit{
                color: #606060;
                font-size: .24rem;
                font-weight: 600;
                padding-left: .12rem;
            }
            .credit_list{
                margin-top: .2rem;
                overflow: hidden;
                padding-bottom: .2rem;
                div{
                    float: left;
                    width: 1.2rem;
                    height: .72rem;
                    color: #f4c887;
                    background: #2f2724;
                    text-align: center;
                    line-height: .72rem;
                    font-size: .22rem;
                    border-radius: 4px;
                    margin-right: .3rem;
                    position: relative;
                    .credit_pitch{
                        width: .25rem;
                        height: .25rem;
                        display: none;
                        background: url(../../../static/img/credit_pitch.png) no-repeat;
                        background-size: 100% 100%;
                        position: absolute;
                        bottom: -.06rem;
                        right: -.08rem;
                    }
                }
                div:last-child{
                    margin-right: 0;
                }
                div.active{
                    color: #fff;
                    background: #d4ae75;
                    .credit_pitch{
                        display: inline-block;
                    }
                }
                .active:before{
                    content: '';
                    display: inline-block;
                    height: .8rem;
                    position: absolute;
                    bottom: -.03rem;
                    left: .1rem;
                    right: .1rem;
                    z-index: -1;
                    border-radius: .1rem;
                    background: #d4ae75;
                    -webkit-filter: blur(5px) brightness(0.95);
                    filter: blur(5px) brightness(0.95);
                }
            }
            
        }
        .prePaid{
            padding: .32rem .29rem 0 .29rem;
            .prePaid_tit{
                padding-left: .12rem;
                color: #606060;
                font-size: .24rem;
                font-weight: 600;
            }
            .prePaid_list{
                margin-top: .2rem;
                .pay{
                    height: .75rem;
                    line-height: .75rem;
                    border-bottom: 1px solid #e3e3e3;
                    img{
                        width: .36rem;
                        height: .25rem;
                        float: left;
                        margin-top: .22rem;
                        margin-right: .27rem;
                    }
                    .prePaidList_tit{
                        font-size: .22rem;
                        color: #606060;
                    }
                    i{
                        float: right;
                        width: .3rem;
                        height: .3rem;
                        background: url(../../../static/img/wprePaid.png) no-repeat;
                        background-size: 100% 100%;
                        margin-top: .2rem;
                    }
                    i.pitch{
                        background: url(../../../static/img/prePaid.png) no-repeat;
                        background-size: 100% 100%;
                    }
                }
                .WeChat{
                    img{
                        width: .41rem;
                        height: .36rem;
                    }
                }
                .Alipay{
                    img{
                        width: .39rem;
                        height: .38rem;
                    }
                }
            }
        }
        .payLogin{
            text-align: center;
            border: none;
            color: #fff;
            font-size: .24rem;
            width: 4.57rem;
            height: .63rem;
            margin: 0 auto;
            background: #ff382a;
            display: block;
            border-radius: 25px;
            position: relative;
            margin-top: 1rem;
            bottom: .5rem;
        }
    }
    
</style>
