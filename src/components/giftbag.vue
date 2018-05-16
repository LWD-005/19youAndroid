<template>
  <div class="libiao">
      <div class="lb">
        <div class="header">
            <div class="libao_banner">
                <img src="../../static/img/libao_banner.png" alt="">
            </div>
            <div class="search">
                <div class="back_btn" @click="$router.go(-1);">
                   
                </div>
                <form action="">
                    <div class="search_k">
                        <input type="text" placeholder="搜索更多福利" v-model.trim="keywork">
                        <a href="" class="sea_icon"></a>
                        <ul>
                            <li v-for="(item,index) in search" :key="index">{{item.gamename}}</li>
                        </ul>
                    </div>
                </form>
            </div>
        </div>
        <div class="section">
            <yd-pullrefresh :callback="freshList" ref="pullrefresh">
                <yd-infinitescroll :callback="loadMore" ref="infinitescrollDemo">
                    <yd-list theme="1" slot="list">
                        <div class="list_hero" v-for="(item, index) in list" :key="index">
                            <div class="list_img"><img :src="item.icon"></div>
                            <div class="hero_wz">
                                <p class="list_tit"><span class="sp_tit">{{item.gamename}}</span><span class="fb_lb">{{item.gift_name}}</span></p>
                                <div class="list_zt">
                                    <p class="hero_jj">{{item.content}}</p>
                                    <p class="lbsy"><span class="lb_sy">剩余</span><span class="undown"><i :style="{width:(1-item.remain/item.count)*100+'%'}" class="down_i"></i></span><span class="sy_bfb">{{(item.remain/item.count)*100}}%</span></p>
                                </div>
                            </div>
                            <div class="list_btn">
                                <yd-button v-if="item.status==1" class="get_btn"  @click.native="show1=true"><span >领取</span></yd-button>
                                <a href="" v-else-if="item.status==2" class="a_btn yqg" >已领取</a>
                                <a href="" v-else  class="a_btn ylq" >已抢光</a>
                            </div>
                        </div>
                    </yd-list>

                    <!-- 数据全部加载完毕显示 -->
                    <span slot="doneTip">啦啦啦，啦啦啦，没有数据啦~~</span>

                    <!-- 加载中提示，不指定，将显示默认加载中图标 -->
                    <img slot="loadingTip" src="http://static.ydcss.com/uploads/ydui/loading/loading10.svg"/>

                </yd-infinitescroll>
             </yd-pullrefresh>   
            <!-- 点击领取弹窗内容 -->
            <yd-popup v-model="show1" position="center" width="3.7rem">
                 <div class="gitfbag_winClose" @click="show1 = false"></div>
                <div class="giftbag_win">
                    <p class="giftbag_winBtn">
                        <a @click="show1 = false">
                            <img class="cont_receive" src="../../static/img/cont_receive.png" alt="">
                        </a>
                        <a>
                            <img class="look_giftbag" src="../../static/img/look_giftbag.png" alt="">
                        </a>
                    </p>
                   
                </div>
            </yd-popup>
        </div>
      </div>
       <div class="footer_nav">
        <my-nav></my-nav>
      </div>
  </div>
</template>

<script>

import Axios from 'axios'

const delay = (function() {
  let timer = 0;
  return function(callback, ms) {
    clearTimeout(timer);
    timer = setTimeout(callback, ms);
  };
})();

export default {
    data(){
        return{
            show1: false,
            page:1,
            count:10,
            list:[],//礼包列表
            gitlist:[],
            giftPre:[],//礼包剩余百分比
            giftStatus:[],//领取状态码
            keywork: '',
            search:[]
        }
        
    },
    watch: {
    //watch title change
        keywork() {
            
            delay(() => {
                this.fetchData();
            }, 300);
        },
        
    },
    created:function(){
        let apiUrl=this.common.apiUrl;
            Axios({
                method:'post',
                url:apiUrl+'Game/GiftList',
                params:{
                    page:this.page,
                    count:this.count
                }
            })
            .then((res)=>{
                this.list=res.data.d.list;

            })
            .catch((error)=>{
                console.log(error);
                alert("网络错误，不能访问");
            })
    },
    methods: {
        freshList() {

            this.page= 1;
            this.get_data1();
        },
        loadMore() {
            this.page++;
            this.get_data1();
        },
        get_data1() {
            let json = {
                page: this.page,
                count: this.count,
            };

            let apiUrl=this.common.apiUrl;
            Axios({
                method:'post',
                url:apiUrl+'Game/GiftList',
                params:json
            }).then((res)=>{
                if (res.data != null) {
                    if (this.page== 1) {
                        this.list=res.data.d.list;
                        this.$refs.pullrefresh.$emit("ydui.pullrefresh.finishLoad");
                    } else {
                        this.gitlist = res.data.d.list;
                        this.gitlist.forEach((item,index) => {
                            this.list.push(item);

                        })
                    }
                    if (res.data.d.list.length != 10) {
                    this.$refs.infinitescrollDemo.$emit("ydui.infinitescroll.loadedDone");
                    return;
                    } else {
                    this.$refs.infinitescrollDemo.$emit("ydui.infinitescroll.finishLoad");
                    }
                    this.$refs.infinitescrollDemo.$emit("ydui.infinitescroll.reInit");
                }
            })
        //
        },
        fetchData(){
            let apiUrl=this.common.apiUrl;
            if(this.keywork==''){
                this.search=''
            }else{
                Axios({
                    method:'post',
                    url:apiUrl+'Game/GiftList',
                    params:{
                        keywork:this.keywork
                    }
                })
                .then((res)=>{
                    this.search = res.data.d.list
                })
                .catch((error)=>{
                    console.log(error);
                    alert("网络错误，不能访问");
                })
            }
            
        }
      }
    
}
</script>

<style lang="less" scoped>
.lb{
    .header{
        position: relative;
        .libao_banner{
            width: 100%;
            height: 2.4rem;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .search{
            position: absolute;
            top: .18rem;
            left: .24rem;
            overflow: hidden;
            z-index: 99;
            .back_btn{
                float: left;
                width: .18rem;
                height: .32rem;
                background: url(../../static/img/back.png);
                background-size: .18rem .32rem;
                margin-top: .1rem;
            }
            form{
                width: 5.52rem;
                height: .51rem;
                line-height: .51rem;
                background:url(../../static/img/search_bg.png) no-repeat;
                background-size: 5.52rem .51rem;
                margin-left: .35rem;
                .search_k{
                    width: 100%;
                    float: left;
                    input{
                        border: none;
                        padding-left: .3rem;
                        font-size: .2rem;
                        color: #ffffff;
                        width: 80%;
                    }
                    input::-webkit-input-placeholder { 
                        color: #fff; 
                    } 
                    .sea_icon{
                        float: right;
                        width: .31rem;
                        height: .33rem;
                        background: url(../../static/img/search.png) no-repeat;
                        background-size: .31rem .33rem;
                        display: block;
                        margin-right: .27rem;
                        margin-top: .1rem;
                    }
                    ul{
                        background: #fff;
                        width: 5rem;
                        padding-left: .2rem;
                        margin-left: .2rem;
                        
                    }
                }
            }
        }
    }
    .section{
        padding: .06rem .3rem .7rem .3rem;
        .list_hero{
            overflow: hidden;
            border-bottom: .07rem solid #f2f2f3;
            padding: 0 .13rem .21rem .22rem;
            .list_img{
                float: left;
                width: .76rem;
                height: .76rem;
                margin-top: .22rem;
                img{
                width: 100%;
                height: 100%;
                }
            }
            .hero_wz{
                float: left;
                margin-top: .24rem;
                margin-left: .12rem;
                width: 60%;
                .list_tit{
                    .sp_tit{
                        font-size: .2rem;
                        font-family: "黑体";
                        color: #444;
                        line-height: .26rem;
                        height: .26rem;
                    }
                    .fb_lb{
                        float: right;
                        font-size: .16rem;
                        color: #444;
                        line-height: .26rem;
                        height: .26rem;
                    }
                }
                .list_xz{
                font-size: .11rem;
                color: #b0b0b0;
                font-family: "黑体";
                line-height: .15rem;
                height: .15rem;
                }
                .hero_jj{
                font-size: .14rem;
                color: #b1b1b1;
                font-family: "黑体";
                line-height: .25rem;
                height: .25rem;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                }
                .lbsy{
                    width: 3.87rem;
                    height: .28rem;
                    line-height: .28rem;
                    .undown{
                        display: inline-block;
                        width: 3rem;
                        height: .04rem;
                        background: #eeeeee;
                        border-radius: 1px;
                        position: relative;
                        top: -.04rem;
                        z-index: 0;
                        .down_i{
                            position: absolute;
                            top: 0;
                            left: 0;
                            display: inline-block;
                            // width: 3.3rem;
                            height: .04rem;
                            background: linear-gradient(to right, #fe735e 0%, #fe7c51 80%, #fe824a 100%);
                        }
                    }
                    .lb_sy{
                        font-size: .16rem;
                        color: #444;
                        float: left;
                        margin-right: .12rem;
                    }
                    .yd-progressbar{
                        width: 70%;
                        float: left;
                        margin-top: -.08rem;
                    }
                    .sy_bfb{
                        float: right;
                        font-size: .16rem;
                        color: #444;
                    }
                }
            }
            .list_btn{
                text-align: center;
                margin-top: .33rem;
                float: right;
                .a_btn{
                width: .93rem;
                height: .38rem;
                display: inline-block;
                background: #ff5027;
                color: #fff;
                font-size: .18rem;
                font-family: "黑体";
                text-align: center;
                line-height: .38rem;
                border-radius: 15px;
                margin-bottom: .09rem;
                }
                .get_btn{
                    width: .93rem;
                    height: .38rem;
                    display: inline-block;
                    color: #fff;
                    font-size: .18rem;
                    font-family: "黑体";
                    text-align: center;
                    line-height: .38rem;
                    border-radius: 15px;
                    position: relative;
                    z-index: 0;
                    margin-bottom: .09rem;
                    padding: 0;
                     background: linear-gradient(to right, #ff5526 0%, #ff4429 80%, #ff302b 100%);
                    span{
                        display: inline-block;
                        width: .93rem;
                        height: .38rem;
                        line-height: .38rem;
                        border-radius: 15px;
                        position: relative;
                        z-index: 2;
                        background: linear-gradient(to right, #ff5526 0%, #ff4429 80%, #ff302b 100%);
                    }
                    }
                    .get_btn:before{
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
                
                .ylq{
                background: #ff8665;
                }
                .yqg{
                    background: #d9d9d9;
                }
            }
        }
    }
    // 弹窗背景图样式
    .giftbag_win{
        width: 3.7rem;
        height: 3.4rem;
        background: url(../../static/img/giftbag_win.png) no-repeat;
        background-size: 3.7rem 3.4rem;
        margin: 0 auto;
        // position: relative;
        .giftbag_winBtn{
            position: absolute;
            left: 0;
            bottom: .3rem;
            padding: 0 .27rem 0 .22rem;
            overflow: hidden;
            width: 100%;
            .cont_receive{
                width: 1.28rem;
                height: .66rem;
                float: left;
            }
            .look_giftbag{
                 width: 1.28rem;
                height: .66rem;
                float: right;
            }
        }
        
    }
    .gitfbag_winClose{
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
