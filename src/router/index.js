import Vue from 'vue'
import Router from 'vue-router'
import Game from '@/components/game'//游戏首页
import Giftbag from '@/components/giftbag'//礼包页
import Personal from '@/components/personal'//个人中心页
import Changepwd from '@/components/changepwd'//登陆、修改密码、注册页
import CreditsLog from '@/components/personal/creditsLog'//积分记录页
import PayCenter from '@/components/personal/payCenter'//充值支付页
import Share from '@/components/personal/share'//推广游戏分享页
import Lottery from '@/components/personal/lottery'//积分抽奖享页
import Download from '@/components/download'//下载页、正文页
import Nav from '@/components/nav'//底部导航公共组件


Vue.use(Router)

Vue.component('my-nav',Nav)



export default new Router({
  linkActiveClass: 'active',
  // mode:'history',
  routes: [              //配置路由，这里是个数组
    {                    //每一个链接都是一个对象
      path: '/',         //链接路径
      name: 'game',     //路由名称，
      component: Game   //对应的组件模板
    },{
      path:'/giftbag',
      name:'giftbag',
      component:Giftbag
    },{
      path:'/personal',
      name:'personal',
      component:Personal
    },{
      path:'/changepwd',
      name:'changepwd',
      component:Changepwd,
    },{
      path:'/personal/creditsLog',
      name:'creditsLog',
      component:CreditsLog,
    }
    ,{
      path:'/personal/payCenter',
      name:'payCenter',
      component:PayCenter,
    }
    ,{
      path:'/personal/share',
      name:'share',
      component:Share,
    }
    ,{
      path:'/personal/lottery',
      name:'lottery',
      component:Lottery,
    }
    ,{
      path:'/download',
      name:'download',
      component:Download,
    }
  ],
  components:{
    Nav
  },
  

})
