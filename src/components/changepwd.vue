<template>
  <div class="xgmm">
     <div class="logo">
         <img src="../../static/img/logo.png">
     </div>

    <!-- 注册页 -->
    <div class="login" v-if="loginId == 'register'">
        <div class="login_phone">
             <div class="phone_icon">
                 <img src="../../static/img/phone_icon.png" alt="">
             </div>
             <input type="number" placeholder="请输入您的手机号码" v-model='phone' class="login_ipt phone_ipt">
        </div>
        <div class="login_phone login_verification" :class="{show:isShow}">
             <div class="phone_icon verification_icon">
                 <img src="../../static/img/verification.png" alt="">
             </div>
             <input type="text" placeholder="请输入您的验证码" class="login_ipt phone_ipt">
             <button @click="sendcode" type="button" :disabled="disabled" class="verification_btn"><span>{{btntxt}}</span></button >
        </div>
         <div class="login_phone login_pwd">
             <div class="phone_icon">
                 <img src="../../static/img/newpwd.png" alt="">
             </div>
             <input type="password" placeholder="请输入6-16位密码" class="login_ipt phone_ipt" v-model="pwd">
        </div>
        <a @click="query" class="review_btn register_btn"><span>注册</span></a>
         <p class="agree">注册即代表同意<a class="agree_a" href="">《19游戏用户注册协议》</a></p>
     </div>
     <!-- 登陆页 -->
    <div class="login login_page"  v-if="loginId == 'login'">
       <div class="login_phone">
             <div class="phone_icon">
                 <img src="../../static/img/user_icon.png" alt="">
             </div>
             <input v-model="loginPhone" type="number" placeholder="请输入你的账号" class="login_ipt phone_ipt">
        </div>
         <div class="login_phone login_pwd">
             <div class="phone_icon">
                 <img src="../../static/img/newpwd.png" alt="">
             </div>
             <input type="password" placeholder="请输入密码" class="login_ipt loginPage_ipt" v-model="loginPwd">
        </div>
        <a @click="Login" class="review_btn register_btn"><span>登陆</span></a>
        <p class="login_p"><a @click="register" class="qRegister">快速注册</a><a @click="changepwd" class="lostPwd">忘记密码？</a></p>
    </div>
     <!-- 忘记密码页 -->
     <div class="login"   v-if="loginId == 'changepwd'">
        <div class="login_phone">
             <div class="phone_icon">
                 <img src="../../static/img/phone_icon.png" alt="">
             </div>
             <input type="number" v-model="forgetPhone" placeholder="请输入注册手机号码" class="login_ipt phone_ipt">
        </div>
        <div class="login_phone login_verification" >
             <div class="phone_icon verification_icon">
                 <img src="../../static/img/verification.png" alt="">
             </div>
             <input type="text" v-model="forgetCode" placeholder="请输入您的验证码" class="login_ipt phone_ipt">
             <button @click="ForgetSendcode" type="button" :disabled='disabled' class="verification_btn"><span>{{btntxt}}</span></button>
        </div>
         <div class="login_phone login_pwd">
             <div class="phone_icon">
                 <img src="../../static/img/newpwd.png" alt="">
             </div>
             <input type="password" v-model="forgetPwd" placeholder="请输入您的新密码" class="login_ipt phone_ipt">
        </div>
        <a @click="Forget" class="review_btn"><span>确认修改</span></a>
     </div>
  </div>
  
</template>

<script>
import Axios from 'axios'

export default {
    data(){
         return{
            loginId:this.$route.query.id,
            disabled:false,
            time:0,
            btntxt:"发送验证码",
            phone:'',
            pwd:"",
            type:'',
            isShow:false,
            loginPhone:'',
            loginPwd:'',
            forgetPhone:'',
            forgetPwd:'',
            forgetCode:'',
         }
    },
    created:function(){
        let apiUrl=this.common.apiUrl;
        let tokenLogin = window.localStorage.getItem('token');
        if(tokenLogin==undefined){
            this.loginPhone ==''
        }else{
            Axios({
                method:'post',      
                url:apiUrl+'Cis/Token',
                params:{
                    token:tokenLogin
                },
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
                },
            })
            .then((res)=>{
                if(res.status==200){
                    this.loginPhone = res.data.d.phone
                }
            })
            .catch((error)=>{
                console.log(error.status);
                alert("网络错误，不能访问！");
            })
        }
    },
    methods:{
     register(){
         this.$router.replace({path:'/changepwd',query:{id:'register'}});
        window.location.reload()
     },
    changepwd(){
        this.$router.push({path:'/changepwd',query:{id:'changepwd'}});
        window.location.reload()
    },
     //验证手机号码部分
    sendcode(){
        var reg=11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
        if(this.phone==''){
            alert("请输入手机号码！");
            if(reg.test(this.phone)){
                this.isShow=false;
                let apiUrl=this.common.apiUrl;
                Axios({
                    method:'post', 
                    url:apiUrl+'Base/Sendsms',
                    params:{
                        phone:this.phone,
                    },
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
                    },
                })
                .then((res)=>{
                    if(res.status==200){
                        if(res.data.d==undefined){
                            alert(res.data.msg);
                        }else{
                            alert(res.data.d.m);
                        }
                    }
                })
                .catch((error)=>{
                    console.log(error);
                    alert("网络错误，不能访问！");
                })
                this.time=120;
                this.disabled=true;
                this.timer();
            }else{
                this.isShow=false
            }
        }
    },
    timer() {
        if (this.time > 0) {
              this.time--;
              this.btntxt=this.time+"s后重新获取";
              setTimeout(this.timer, 1000);
        } else{
              this.time=0;
              this.btntxt="获取验证码";
              this.disabled=false;
        }
    },
    query(){
        if(this.phone=='' ){
            alert("请输入你的手机号码！");
        }else if(this.pwd == ''){
            alert("请输入6-16位密码！");
        }else if(this.pwd.length>15 || this.pwd.length<5){
            alert("密码格式不对！");
        }else{
            console.log(this.pwd);
            let apiUrl=this.common.apiUrl;
           Axios({
                method:'post',
                url:apiUrl+'Cis/Register',
                params:{
                    phone:this.phone,
                    password:this.pwd,
                    code:1234,
                    type:1
                },
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
                },
            })
            .then((res)=>{
                if(res.status==200){
                    alert("注册成功！");
                    this.$router.push({path:'/changepwd',query:{id:'login'}});
                    window.location.reload()
                }
            })
            .catch((error)=>{
                console.log(error);
                alert("网络错误，不能访问！");
            })
        }
    },
    Login(){
        if(this.loginPhone==""){
            alert("请输入您的账号！")
        }else if(this.loginPwd==''){
            alert("密码不能为空！")
        }else{
            let apiUrl=this.common.apiUrl;
            let tokenLogin = window.localStorage.getItem('token');
            // if (window.localStorage.getItem('token')==undefined) {
                Axios({
                    method:'post',      
                    url:apiUrl+'Cis/Login',
                    params:{
                        phone:this.loginPhone,
                        password:this.loginPwd,
                        token:tokenLogin
                    },
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
                    },
                })
                .then((res)=>{
                    if(res.status==200){
                        if (res.data.d.s=='FAIL') {
                            alert(res.data.d.m);
                        } else {
                            window.localStorage.setItem('token',res.data.token);
                            window.sessionStorage.setItem('name',res.data.d.name);
                            window.sessionStorage.setItem('coin',res.data.d.coin);
                            window.sessionStorage.setItem('dlzt',1);
                            window.sessionStorage.setItem('isSign',res.data.d.isSign);
                            this.$router.push({path:'/'});
                        }

                    }
                })
                .catch((error)=>{
                    console.log(error);
                    alert("网络错误，不能访问！");
                })
           
        }
        
    },
    ForgetSendcode(){
        var reg=11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
        if(this.forgetPhone==''|| !reg.test(this.forgetPhone)){
            alert("请输入手机号码！");
        }else{
            let apiUrl=this.common.apiUrl;
            Axios({
                method:'post', 
                url:apiUrl+'Base/Sendsms',
                params:{
                    phone:this.forgetPhone,
                },
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
                },
            })
            .then((res)=>{
                if(res.status==200){
                    if(res.data.d==undefined){
                        alert(res.data.msg);
                    }else{
                        alert(res.data.d.m);
                    }
                }
            })
            .catch((error)=>{
                console.log(error);
                alert("网络错误，不能访问！");
            })
            this.time=120;
            this.disabled=true;
            this.timer();
        }
    },
    Forget(){
        if(this.forgetPhone==''){
            alert("请输入正确的手机号码！");
        }else if(this.forgetPwd == ''){
            alert("请输入6-16位密码！");
        }else if(this.forgetPwd.length>15 || this.forgetPwd.length<5){
            alert("密码格式不对！");
        }else{
            let apiUrl=this.common.apiUrl;
            Axios({
                method:'post',      
                url:apiUrl+'Cis/Forget',
                params:{
                    phone:this.forgetPhone,
                    password:this.forgetPwd,
                    code:1234
                },
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
                },
            })
            .then((res)=>{
                if(res.status==200){
                    alert("请求成功，暂时没有修改")
                    console.log(res);
                }
            })
            .catch((error)=>{
                console.log(error);
                alert("网络错误，不能访问！");
            })
        }
        
    }
  },
  
}

</script>

<style lang="less" scoped>
    .xgmm{
        .logo{
            position: relative;
            top: 1.64rem;
            margin: 0 auto;
            text-align: center;
            width: 3.47rem;
            height: 1.03rem;
            margin-bottom: .8rem;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .login{
            position: absolute;
            margin: 0 .5rem;
            margin-top: 1.64rem;
            width: 85%;
            .login_phone{
                border-bottom: 1px solid #e3e3e3;
                width: 100%;
                height: 1.04rem;
                padding: .55rem .35rem 0 .45rem;
                overflow: hidden;
                .phone_icon{
                    width: .22rem;
                    height: .35rem;
                    float: left;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
                .login_ipt{
                    border: none;
                    width: 60%;
                    height: .35rem;
                    line-height: .35rem;
                    padding-left: .27rem;
                    font-size: .24rem;
                    color: #949494;
                }
                input:-ms-input-placeholder{
                    color: #949494;
                }
                input::-webkit-input-placeholder{
                    color: #949494;
                }
            }
            .show{
                display: none;
            }
            .login_verification{
                padding-left: .35rem;
                .verification_icon{
                    width: .33rem;
                    height: .21rem;
                    margin-top: .08rem;
                    // position: relative;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
                .verification_btn{
                    width: 1.44rem;
                    height: .52rem;
                    display: block;
                    position: relative;
                    top: -.17rem;
                    float: right;
                    color: #fff;
                    font-size: .2rem;
                    text-align: center;
                    line-height: .52rem;
                    border: none;
                    border-radius: .2rem;
                    z-index: 0;
                    background: linear-gradient(to right, #ff5526 0%, #ff4429 50%, #ff302b 100%);
                    span{
                        display: inline-block;
                        width: 1.44rem;
                        height: .52rem;
                        line-height: .52rem;
                        border-radius: 15px;
                        position: relative;
                        z-index: 2;
                        background: linear-gradient(to right, #ff5526 0%, #ff4429 50%, #ff302b 100%);
                    }
                    }
                    .verification_btn:before{
                        content: '';
                        display: inline-block;
                        height: .1rem;
                        position: absolute;
                        bottom: 0rem;
                        left: .1rem;
                        right: .1rem;
                        z-index: -1;
                        border-radius: .1rem;
                        background:  #ff2c2c;
                        -webkit-filter: blur(5px) brightness(0.95);
                        filter: blur(5px) brightness(0.95);
                    
                }
            }
            .login_pwd{
                padding-left: .4rem;
                .phone_icon{
                    width: .28rem;
                    height: .29rem;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
            }
           
            .review_btn{
                width: 4.57rem;
                height: .63rem;
                display: block;
                margin: 0 auto;
                color: #fff;
                font-size: .24rem;
                text-align: center;
                text-align: center;
                line-height: .63rem;
                border-radius: 15px;
                position: relative;
                z-index: 0;
                margin-top: .48rem;
                background: linear-gradient(to right, #ff302b 0%, #ff4429 50%, #ff5526 100%);
                span{
                    display: inline-block;
                    width: 4.57rem;
                    height: .63rem;
                    line-height: .63rem;
                    border-radius: 15px;
                    position: relative;
                    z-index: 2;
                    background: linear-gradient(to right, #ff302b 0%, #ff4429 50%, #ff5526 100%);
                }
                }
                .review_btn:before{
                    content: '';
                    display: inline-block;
                    height: .2rem;
                    position: absolute;
                    bottom: 0;
                    left: .2rem;
                    right: .2rem;
                    z-index: -1;
                    border-radius: .1rem;
                    background:  #ff2c2c;
                    -webkit-filter: blur(5px) brightness(0.95);
                    filter: blur(5px) brightness(0.95);
                
            }
        }
        // 登陆页面样式
        .login_page{
            .login_phone{
                .phone_icon{
                    width: .3rem;
                    height: .35rem;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
            }
            .login_p{
                margin-top: .35rem; 
                padding: 0 .5rem;
                .qRegister{
                    float: left;
                    font-size: .18rem;
                    color: #949494;
                }
                .lostPwd{
                     float: right;
                    font-size: .18rem;
                    color: #949494;
                }
            }
        }
        // 注册页样式
        .agree{
            text-align: center;
            margin: 0 auto;
            margin-top: 1rem;
            font-size: .16rem;
            color: #898989;
            .agree_a{
                color: #ff2d2c;
                font-size: .16rem;
            }
        }
    }
</style>

