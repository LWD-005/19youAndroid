<template>
  <div class="index">
    <yd-pullrefresh :callback="freshList" ref="pullrefresh">
    <!-- 首页轮播图 -->
    <div class="banner">
      <yd-slider autoplay="5000">
        <yd-slider-item  v-for="(item, index) in CarouselList" :key="index">
            <a :href="item.url">
                <img :src="item.img">
            </a>
        </yd-slider-item>

      </yd-slider>
    </div>
    <!-- 首页内容 -->
    <div class="sy_wrap">
      <div class="wrap_nav">
        <div class="wrap_icon">
          <router-link :to="{path:'/download'}">
            <img src="../../static/img/news.png">
            <p class="wrap_bt">新闻</p>
          </router-link>
        </div>
        <div class="wrap_icon">
          <a  @click="zwkf">
            <img src="../../static/img/kaifu.png">
            <p class="wrap_bt">开服</p>
          </a>
        </div>
        <div class="wrap_icon">
          <a @click="zwkf">
            <img src="../../static/img/huodong.png">
            <p class="wrap_bt">活动</p>
          </a>
        </div>
        <div class="wrap_icon">
          <router-link :to="{path:'/giftbag'}">
            <img src="../../static/img/miaosha.png">
            <p class="wrap_bt">秒杀</p>
          </router-link>
        </div>
      </div>
      <div class="sy_hero">
        <div class="hero_icon" v-for="(item,index) in hotList.slice(0,3)" :key="index">
          <router-link :to="{path:'/download',query:{id:item.id}}">
            <div class="hero_img">
              <img :src="item.icon">
            </div>
            <p class="hero_bt">{{item.name}}</p>
            <p class="hreo_rl">{{item.size}}m</p>
          </router-link>  
          <p class="hreo_start"><span class="dian_star" v-for="(statr,yindex) in 5" :key="yindex" v-if="yindex<item.score"></span><span class="dian_wstar" v-for="statr in (5-item.score)" :key="statr.id"></span><span class="hero_pf">{{item.score}}</span></p>
          <!-- <a href="" class="btn btn-danger hero_btn">下载</a> -->
          <a :href="item.download_path" v-if="down_zt==0" class="btn btn-danger Down_btn"><span>下载</span></a>
          <a :href="item.download_path" v-else-if="down_zt==1" class="btn btn-danger hero_btn"><i></i>15%</a> 
          <a :href="item.download_path" v-else class="btn btn-danger hero_btn  hero_jx">继续</a>
          
        </div>

      </div>

      <!-- 首页列表 -->
      <div class="sy_list">
        
         <yd-infinitescroll :callback="loadMore" ref="infinitescrollDemo">
            <yd-list theme="2" slot="list">
              <div class="list_hero" v-for="(item, index) in list" :key="index">
                <div class="list_img"><img :src="item.icon"></div>
                <div class="hero_wz" v-if="item.btn_zt==1">
                    <p class="list_tit">{{item.name}}</p>
                      <div class="list_zt">
                      <p class="xz_zt"><span class="xzsd">{{item.xzsd}}MB<span class="jxzsd">+{{item.jxzsd}}MB/s</span></span><span class="xzjd">{{item.xzjd}}</span></p>
                      <p class="xz_jdt xz_jsjd"><span class="undown"><i :style="{width:item.xzjd}" class="down_i"></i></span></p>
                    </div>
                </div>
                <div class="hero_wz" v-else-if="item.btn_zt==2">
                    <p class="list_tit">{{item.name}}</p>
                    <div class="list_zt">
                      <p class="xz_zt"><span class="zt_sp">已暂停</span><span class="xzjd">{{item.xzjd}}</span></p>
                      <p class="xz_jdt"><span class="undown"><i :style="{width:item.xzjd}" class="down_i"></i></span></p>
                    </div>
                </div>
                <div class="hero_wz" v-else>
                    <router-link :to="{path:'/download',query:{id:item.id}}">
                      <p class="list_tit">{{item.name}}</p>
                      <p class="list_xz"><span class="xz_l">{{item.download}}</span>万次下载</p>
                      <div class="list_zt">
                          <p class="hero_jj">{{item.description}}</p>
                          <p class="hero_zt"> 
                            <a v-for="(part,index) in item.category" :key="index"  href="" class="zt_hh">{{part}}</a>
                          </p>
                      </div>
                    </router-link>
                </div>
                <div class="list_btn">
                    <a href="" v-if="item.btn_zt==1" class="a_btn hero_zt" >暂停</a>
                    <a href="" v-else-if="item.btn_zt==2" class="a_btn jx_btn" >继续</a>
                    <!-- <a href="" v-else class="a_btn" >下载</a> -->
                    <a :href="item.download_path" v-else class="Down_btn"><span>下载</span></a>
                    <p class="list_rl">{{item.size}}m</p>
                </div>
              </div>
            </yd-list>

            <!-- 数据全部加载完毕显示 -->
            <span slot="doneTip">啦啦啦，啦啦啦，没有数据啦~~</span>

            <!-- 加载中提示，不指定，将显示默认加载中图标 -->
            <img slot="loadingTip" src="http://static.ydcss.com/uploads/ydui/loading/loading10.svg"/>

        </yd-infinitescroll>
      
      </div>
    </div>
     </yd-pullrefresh>  
     <div class="footer_nav">
        <my-nav></my-nav>
      </div>
     
  </div>
</template>

<script>
import game from '../assets/game'
import Axios from 'axios'



export default {
   
  name: 'game',
  data () {
    return {
      page:1,
      down_zt:0,
      widthI:3.9,
      count:10,
      CarouselList:[],
      list:[],
      hotList:[]
    }
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
        let json = {
            page: this.page,
            count: this.count,
        };

        let apiUrl=this.common.apiUrl;
        Axios({
            method:'post',
            url:apiUrl+'Game/GameList',
            params:json
        }).then((res)=>{
            if (res.data != null) {
                if (this.page== 1) {
                    this.list=res.data.d.list;
                    this.$refs.pullrefresh.$emit("ydui.pullrefresh.finishLoad");
                } else {
                    this.list = res.data.d.list;
                    this.list.forEach((item,index) => {
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
    zwkf(){
      alert("暂未开放！")
    }
  },
  created(){
    let apiUrl=this.common.apiUrl;
    Axios.get(apiUrl+'Base/CarouselList')
    .then((res)=>{
    this.CarouselList=res.data.d.list;
    })
    .catch(error=>{
      console.log(error);
      alert("网络错误，不能访问");
    });
    Axios({
      method:'post',
      url:apiUrl+'Game/GameList',
      params:{
        is_hot:"1"
      },
    }).then((res)=>{
      this.hotList=res.data.d.list;
    })
    .catch((error)=>{
      console.log(error);
      alert("网络错误，不能访问");
    });
    Axios({
      method:'post',
      url:apiUrl+'Game/GameList',
      params:{
        page:this.page,
        count:this.count
      },
    }).then((res)=>{
      this.list=res.data.d.list;
    })
    .catch((error)=>{
      console.log(error);
      alert("网络错误，不能访问");
    });
  },
 
    
  
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.index{
  position: relative;
  left: 0;
  bottom: 0;
  margin-bottom: .8rem;
}
.banner {
  img{
    width: 100%;
    height: 2.8rem;
  }
  
}
.sy_wrap{
  padding: .3rem .29rem 0 .29rem;
  overflow: hidden;
  // 新闻、秒杀nav样式
  .wrap_nav{
    overflow: hidden;
    .wrap_icon{
      float: left;
      width: 25%;
      text-align: center;
      img{
          width: .89rem;
          height: .89rem;
        }
      .wrap_bt{
        font-size: .2rem;
        color: #929292;
      }
    }
  }
  // hero样式
  .sy_hero{
    margin: 0 auto;
    margin-top: .7rem;
    display:table;
    .hero_icon{
      width: 1.8rem;
      text-align: center;
      float: left;
      margin-right: .1rem;
    }
    .hero_img{
      width: .76rem;
      height: .76rem;
      display: inline-block;
      img{
        width: 100%;
        height: 100%;
        border-radius: .09rem;
      }
    }
    .hero_bt{
      color: #333333;
      font-size: .2rem;
      font-family: "黑体";
      margin-top: .1rem;
      margin-bottom: .08rem;
    }
    .hreo_rl{
      color: #c2c2c2;
      font-size: .12rem;
      font-family: "黑体";
    }
    .hreo_start{
      .dian_star{
        display: inline-block;
        width: .17rem;
        height: .19rem;
        background: url(../../static/img/star.png) no-repeat;
        background-size: .17rem .19rem;
        margin-right: .05rem;
      }
      .dian_wstar{
        display: inline-block;
        width: .17rem;
        height: .19rem;
        background: url(../../static/img/wstar.png) no-repeat;
        background-size: .17rem .19rem;
        margin-right: .05rem;
      }
      .hero_pf{
        font-family: "黑体";
        font-size: .16rem;
        color: #b7b6b6;
      }
    }
    .Down_btn{
      width: .93rem;
      height: .38rem;
      display: inline-block;
      color: #fff;
      font-size: .18rem;
      font-family: "黑体";
      text-align: center;
      line-height: .38rem;
      border-radius: 15px;
      margin-top: .18rem;
      position: relative;
      z-index: 0;
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
    .Down_btn:before{
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
    .hero_btn{
      width: .93rem;
      height: .38rem;
      display: inline-block;
      background: #ff8f92;
      color: #fff;
      font-size: .18rem;
      font-family: "黑体";
      text-align: center;
      line-height: .38rem;
      border-radius: 15px;
      margin-top: .18rem;
      position: relative;
      overflow: hidden;
      i{
        position: absolute;
        top: 0;
        left: 0;
         width: .18rem;
        height: .36rem;
        display: inline-block;
        background: #ff5426;
        border-radius: 0 10px 10px 0;
      }
    }
    .hero_jx{
      background: #cacaca;
    }
    .hero_zt{
      background: #ff5426;
    }
  }
  // 首页列表样式
  .sy_list{
    margin-top: .47rem;
    .list_hero{
      overflow: hidden;
      padding-bottom: .21rem;
      border-bottom: 1px solid #eeeeee;
      .list_img{
        float: left;
        width: .76rem;
        height: .76rem;
        margin-top: .22rem;
        img{
          border-radius: .1rem;
          width: 100%;
          height: 100%;
        }
      }
      .hero_wz{
        float: left;
        margin-top: .24rem;
        margin-left: .12rem;
        width: 65%;
        .list_tit{
          font-size: .2rem;
          font-family: "黑体";
          color: #444;
          line-height: .26rem;
          height: .26rem;
        }
        .list_xz{
          font-size: .11rem;
          color: #b0b0b0;
          font-family: "黑体";
          line-height: .15rem;
          height: .15rem;
        }
        .hero_jj{
          font-size: .13rem;
          color: #b0b0b0;
          font-family: "黑体";
          line-height: .17rem;
          height: .17rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .hero_zt{
          margin-top: -.1rem;
          a{
            display: inline-block;
            font-size: .1rem;
            font-family: "黑体";
            color: #fff;
            padding:.002rem .03rem .002rem .03rem;
            text-align: center;
            margin-right: .12rem;
            border-radius: 1px;
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
          margin-top: .08rem;
          .zt_sp{
            float: left;
            font-size: .13rem;
            color: #c8c8c8;
          }
          .xzsd{
            float: left;
            font-size: .13rem;
            color: #c8c8c8;
            .jxzsd{
              color: #ff5426;
            }
          }
          .xzjd{
            float: right;
            font-size: .13rem;
            color: #c9c9c9;
          }
        }
        .xz_jdt{
          line-height: .16rem;
          height: .16rem;
          .undown{
            display: inline-block;
            width: 3.9rem;
            height: .04rem;
            background: #eeeeee;
            border-radius: 1px;
            position: relative;
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
        }
        .xz_jsjd{
           line-height: .2rem;
          height: .2rem;
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
          background: #ff3f29;
          color: #fff;
          font-size: .18rem;
          font-family: "黑体";
          text-align: center;
          line-height: .38rem;
          border-radius: 15px;
          margin-bottom: .09rem;
        }
        .Down_btn{
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
        .Down_btn:before{
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
        .jx_btn{
          background: #cacaca;
        }
        .list_rl{
          color: #c9c9c9;
          font-size: .13rem;
          font-family: "黑体";
        }
      }
    }
  }
}
</style>