<template>
  <div class="download">
      <div class="down_header">
          <div class="down_banner">
              <img src="../../static/img/download_banner.png" alt="">
          </div>
          <div class="down_game">
              <div class="down_gameImg">
                  <img :src="Detail.icon" alt="">
              </div>
              <div class="down_gameTit">
                 <p class="list_tit">{{Detail.name}}</p>
                <p class="list_xz"><span class="xz_rl">{{Detail.size}}MB</span><span class="xz_l">{{Detail.download}}万次下载</span></p>
                <div class="list_zt">
                    <p class="hero_zt"> 
                        <a href="" class="zt_hh" v-for="(item,index) in Detail.category" :key="index">{{item}}</a>
                    </p>
                </div>
              </div>
              <div class="list_btn">
                    <a :href="Detail.download_path" class="a_btn" ><span>下载</span></a>
                </div>
          </div>
      </div>
      <div class="down_gameIntd">
          <div class="gameIntd">
            <img src="../../static/img/download_intd.png" alt="">
            <p class="gameIntd_tit">游戏介绍</p>
          </div>
          <div class="gameContent">
              <p class="gameContent_p">
                  {{Detail.description}}
              </p>
              <div class="gameContent_img" v-for="(item,index) in Detail.images" :key="index">
                  <div class="gameContent_imgfl">
                      <img :src="item" alt="">
                  </div>

              </div>
          </div>
      </div>
  </div>
</template>

<script>
import Axios from 'axios'

export default {
    data(){
        return{
            Detail:''
        }
    },
  created:function(){
      let urlId = this.$route.query.id;
      let apiUrl=this.common.apiUrl;
        Axios({
            method:'post',
            url:apiUrl+'Game/GameDetail',
            params:{
                id:urlId
            }
        })
        .then((res)=>{
            this.Detail=res.data.d;
        })
        .catch((error)=>{
            console.log(error);
            alert("网络错误，不能访问");
        })
  }
}
</script>


<style lang="less" scoped>
.download{
    .down_header{
        .down_banner{
            width: 100%;
            height: 2.3rem;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .down_game{
            height: 1.6rem;
            padding: 0 .1rem 0 .05rem;
            margin: 0 .3rem;
            border-bottom: 1px solid #eeeeee;
            .down_gameImg{
                width: 1.54rem;
                height: 1.54rem;
                float: left;
                position: relative;
                img{
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    border-radius: .27rem;
                    top: -.37rem;
                }
            }
            .down_gameTit{
                float: left;
                margin-top: .15rem;
                margin-left: .15rem;
                width: 50%;
                .list_tit{
                    font-size: .24rem;
                    font-family: "黑体";
                    color: #444;
                    margin-bottom: .1rem;
                }
                .list_xz{
                    font-size: .14rem;
                    color: #bcbcbc;
                    font-family: "黑体";
                    height: .1rem;
                    line-height: .15rem;
                     margin-bottom: .08rem;
                    .xz_rl{
                        padding-right: .14rem;
                        border-right: 1px solid #bcbcbc;
                    }
                    .xz_l{
                        padding-left: .15rem;
                    }
                }
                .hero_zt{
                    a{
                        display: inline-block;
                        font-size: .12rem;
                        font-family: "黑体";
                        color: #fff;
                       padding: .01rem .04rem;
                        text-align: center;
                        margin-right: .12rem;
                        border-radius: .02rem;
                    }
                    a:first-child{
                        background: #ff7750;
                    }
                    a:nth-child(2){
                        background: #be73ff;
                    }
                    a:nth-child(3){
                        background: #23c8af;
                    }
                    a:nth-child(4){
                        background: #fa9700;
                    }
                }
                .xz_zt{
                overflow: hidden;
                height: .26rem;
                line-height: .26rem;
                }
            }
            .list_btn{
                text-align: center;
                margin-top: .39rem;
                float: right;
                .a_btn{
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
                    z-index: -1;
                    margin-bottom: .09rem;
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
                .a_btn:before{
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
    .down_gameIntd{
        padding: 0 .3rem;
        .gameIntd{
            padding: .24rem .1rem .15rem .08rem; 
            overflow: hidden;
            img{
                float: left;
                width: .17rem;
                height: .22rem;
            }
            .gameIntd_tit{
                float: left;
                font-size: .2rem;
                color: #444;
                margin-left: .08rem;
                margin-top: -.02rem;
            }
        }
        .gameContent{
            .gameContent_p{
                font-size: .16rem;
                color: #9f9f9f;
                text-align: justify;
                line-height: .34rem;
                padding: 0 .1rem 0 .08rem ;
            }
            .gameContent_img{
                margin-top: .24rem;
                overflow: hidden;
                .gameContent_imgfl{
                    float: left;
                    width: 47%;
                    height: 4.8rem;
                    margin-right: 0.3rem;
                    margin-bottom: .3rem;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
                .gameContent_imgfl:nth-child(even){
                   margin-right: 0;
                }
            }
        }
    }
}
</style>
