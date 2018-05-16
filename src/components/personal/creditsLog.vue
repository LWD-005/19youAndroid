<template>
  <div class="creditsLog">
      <div class="creditsLog_header">
          <div class="creditsLog_back"  @click="$router.go(-1);">
              <img :src="imgSrc+'creditsLog_back.png'" alt="">
          </div>
          <p class="creditsLog_tit">积分明细</p>
      </div>
        <yd-pullrefresh :callback="freshList" ref="pullrefresh">
            <yd-infinitescroll :callback="loadMore" ref="infinitescrollDemo">
                <yd-list theme="1" slot="list">
                    <div class="creditsLog_list">
                        <div  v-for="(item, index) in pointsList" :key="index" >
                            <div class="prepaidTime" v-if="item.time ==item.time">
                                <img :src="imgSrc+'prepaidTime_icon.png'" alt="">
                                <span class="prepaid_time"><span class="prepaid_day">{{item.time | datesj}}</span><span class="prepaid_noon"></span></span>
                            </div>
                            <div class="buyPoints" v-if="item.type==2">
                                <img :src="imgSrc+'convert_icon.png'" alt="">
                                <div class="points">
                                    <p class="points_tit">积分兑换</p>
                                    <p class="buy_time">{{item.time | date}}</p>
                                </div>
                                <div class="convert_num">
                                    <span class="num">-{{item.count}}<i class="num_icon"></i></span>
                                </div>
                            </div>
                            <div class="buyPoints" v-else>
                                <img :src="imgSrc+'prepaid_icon.png'" alt="">
                                <div class="points">
                                    <p class="points_tit">积分充值</p>
                                    <p class="buy_time">{{item.time | date}}</p>
                                </div>
                                <div class="points_sum">
                                    <span class="sum">+{{item.count}}<i class="buy_icon"></i></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </yd-list>

                <!-- 数据全部加载完毕显示 -->
                <span slot="doneTip">啦啦啦，啦啦啦，没有数据啦~~</span>

                <!-- 加载中提示，不指定，将显示默认加载中图标 -->
                <img slot="loadingTip" src="http://static.ydcss.com/uploads/ydui/loading/loading10.svg"/>

            </yd-infinitescroll>
        </yd-pullrefresh>   
  </div>
</template>


<script>
import Axios from 'axios'
export default {
    data(){
        return{
            imgSrc:this.common.imgSrc,
            page:1,
            count:10,
            pointsList:[],
            itemTime:[]
        }
    },
    created(){
        let apiUrl=this.common.apiUrl;
        let tokenLogin = window.localStorage.getItem('token');
        Axios({
            method:'post',
            url:apiUrl+'Fina/RechargeLog',
            params:{
                token:tokenLogin,
                page:this.page,
                count:10
            },
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
            },
        })
        .then((res)=>{
            this.pointsList = res.data.d.log;
            this.pointsList.forEach((item,index)=>{
                this.itemTime = item.time
                
            })
        })
        .catch((error)=>{
            alert("网络错误，不能访问")
        })
    },
    methods:{
        freshList() {

            this.page= 1;
            this.get_data1();
        },
        loadMore() {
            this.page++;
            this.get_data1();
        },
        get_data1() {
            let tokenLogin = window.localStorage.getItem('token');
            let json = {
                token:tokenLogin,
                page: this.page,
                count: this.count,
            };

            let apiUrl=this.common.apiUrl;
            Axios({
                method:'post',
                url:apiUrl+'Fina/RechargeLog',
                params:json
            }).then((res)=>{
                if (res.data != null) {
                    if (this.page== 1) {
                        this.pointsList=res.data.d.log;
                        this.$refs.pullrefresh.$emit("ydui.pullrefresh.finishLoad");
                    } else {
                        this.pointsList = res.data.d.log;
                        this.pointsList.forEach((item,index) => {
                            this.pointsList.push(item);
                        })
                    }
                    if (res.data.d.log.length != 10) {
                    this.$refs.infinitescrollDemo.$emit("ydui.infinitescroll.loadedDone");
                    return;
                    } else {
                    this.$refs.infinitescrollDemo.$emit("ydui.infinitescroll.finishLoad");
                    }
                    this.$refs.infinitescrollDemo.$emit("ydui.infinitescroll.reInit");
                }
            })
        //
        }
    },
    filters:{
        date(time){
            let oldDate = new Date(time)
            let newDate = new Date()
            var dayNum = "";
            var getTime = (newDate.getTime() - oldDate.getTime())/1000;

            if(getTime < 60*5){
                dayNum = "刚刚";
            }else if(getTime >= 60*5 && getTime < 60*60){
                dayNum = parseInt(getTime / 60) + "分钟前";
            }else if(getTime >= 3600 && getTime < 3600*24){
                dayNum = parseInt(getTime / 3600) + "小时前";
            }else if(getTime >= 3600 * 24 && getTime < 3600 * 24 * 30){
                dayNum = parseInt(getTime / 3600 / 24 ) + "天前";
            }else if(getTime >= 3600 * 24 * 30 && getTime < 3600 * 24 * 30 * 12){
                dayNum = parseInt(getTime / 3600 / 24 / 30 ) + "个月前";  
            }else if(time >= 3600 * 24 * 30 * 12){
                dayNum = parseInt(getTime / 3600 / 24 / 30 / 12 ) + "年前";  
            }

            let year   = oldDate.getFullYear();
            let month  = oldDate.getMonth()+1;
            let day    = oldDate.getDate();
            let hour   = oldDate.getHours(); 
            let minute = oldDate.getMinutes(); 
            let second = oldDate.getSeconds(); 
            return hour+":"+minute;
        },
        datesj(time){
            let oldDate = new Date(time)
            let newDate = new Date()
            var dayNum = "";
            var getTime = (newDate.getTime() - oldDate.getTime())/1000;

            if(getTime < 60*5){
                dayNum = "刚刚";
            }else if(getTime >= 60*5 && getTime < 60*60){
                dayNum = parseInt(getTime / 60) + "分钟前";
            }else if(getTime >= 3600 && getTime < 3600*24){
                dayNum = parseInt(getTime / 3600) + "小时前";
            }else if(getTime >= 3600 * 24 && getTime < 3600 * 24 * 30){
                dayNum = parseInt(getTime / 3600 / 24 ) + "天前";
            }else if(getTime >= 3600 * 24 * 30 && getTime < 3600 * 24 * 30 * 12){
                dayNum = parseInt(getTime / 3600 / 24 / 30 ) + "个月前";  
            }else if(time >= 3600 * 24 * 30 * 12){
                dayNum = parseInt(getTime / 3600 / 24 / 30 / 12 ) + "年前";  
            }

            let year   = oldDate.getFullYear();
            let month  = oldDate.getMonth()+1;
            let day    = oldDate.getDate();
            let hour   = oldDate.getHours(); 
            let minute = oldDate.getMinutes(); 
            let second = oldDate.getSeconds(); 
            return year+"-"+month+"-"+day
        }
    }
   
}
</script>

<style lang="less" scoped>
    .creditsLog{
        // 积分明细页面头部样式
        .creditsLog_header{
            overflow: hidden;
            padding-top: .27rem;
            width: 100%;
            height: .82rem;
            background: #fff;
            border-bottom: .08rem solid #f2f2f3;
            .creditsLog_back{
                float: left;
                width: .18rem;
                height: .32rem;
                margin-left: .42rem;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            .creditsLog_tit{
                text-align: center;
                color:#606060;
                font-size: .3rem;
                letter-spacing: .04rem;
                margin-top: -.1rem;
                 width: 95%;
            }
        }
        // 积分明细页面列表样式
        .creditsLog_list{
            min-height: 7rem;
            border-left: 3px solid #e4e4e4;
            margin: .24rem .28rem 0 .53rem;
            .prepaidTime{
                height: .36rem;
                line-height: .36rem;
                z-index: 2;
                margin-left: -.15rem;
                background: #fff;
                overflow: hidden;
                margin-bottom: .2rem;
                img{
                    float: left;
                    width: .24rem;
                    height: .24rem;
                    margin-top: .06rem;
                    margin-right: .2rem;
                }
                .prepaid_time{
                    float: left;
                    font-size: .14rem;
                    color: #898989;
                    .prepaid_noon{
                        margin-left: .08rem;
                    }
                }
            }
            .buyPoints{
                height: .72rem;
                background: #fff;
                border:1px solid #f2f2f3; 
                padding: .17rem .15rem 0 .2rem;
                border-radius: 5px;
                margin-left: -.3rem;
                margin-bottom: .16rem;
                img{
                    float: left;
                    width: .1rem;
                    height: .1rem;
                    margin-top: .14rem;
                    margin-right: .25rem;
                }
                // 充值积分样式
                .points{
                    float: left;
                    .points_tit{
                        line-height: .24rem;
                        font-size: .18rem;
                        color: #898989;
                    }
                    .buy_time{
                        line-height: .20rem;
                        color: #b7b7b7;
                        font-size: .14rem;
                    }
                    
                }
                .points_sum{
                    float: right;
                    .sum{
                        font-size: .2rem;
                        color: #ff4c74;
                        .buy_icon{
                            display: inline-block;
                            width: .18rem;
                            height: .18rem;
                            background: url(../../../static/img/buy_icon.png) no-repeat;
                            background-size: .18rem .18rem;
                            margin-left: .06rem;
                            position: relative;
                            top: .02rem;
                        }
                    }
                }
                // 兑换积分样式
                .convert_num{
                    float: right;
                    .num{
                        font-size: .2rem;
                        color: #3fd27b;
                        .num_icon{
                            display: inline-block;
                            width: .18rem;
                            height: .18rem;
                            background: url(../../../static/img/useUp_icon.png) no-repeat;
                            background-size: .18rem .18rem;
                            margin-left: .06rem;
                            position: relative;
                            top: .02rem;
                        }
                    }
                }
            }
        }
    }
</style>
