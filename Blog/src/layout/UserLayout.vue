<template>
    <a-layout class="flex-box AccountLayout maxHeight" >
        <div style="height: 44px;line-height: 44px;text-align: center;margin: 12px 0 40px">
            <a style="cursor: default" href="javascript:void(0)">
                <img height="44px" style="vertical-align: top;margin-right: 14px" src="../../public/logo-alpha-sc.png">
                <span>FeiBam Blogs</span>
            </a>
            <div style="text-decoration:line-through;color: rgba(0,0,0,0.1)">{{ColoredEgg}}</div>
        </div>
        <a-layout-content class="login-form">
            <router-view />
        </a-layout-content>
        <a-layout-footer style="text-align: center" class="footer">
            Build By FeiBam with ❤️
        </a-layout-footer>
    </a-layout>
</template>

<script>
    export default {
        name: "UserLayout",
        data(){
            return{
                ColoredEgg:'',
            }
        },
        mounted() {
            this.RandomColorEgg()

        },
        methods:{
            RandomColorEgg:function(){
                let arr = ['007福报！','你没看见我！','FrameWork by Antd','Web从入门到入土']
                let index = Math.floor(Math.random()*arr.length)
                this.ColoredEgg = arr[index]
            }
        }
    }
</script>

<style scoped>
</style>
<style>
    .AccountLayout{
        position: relative;
        width: 100%;
        min-height: 100%;
        padding: 133px 0 168px;
        min-width: 328px;
    }
    .AccountLayout > div > a >span{
        font-size: 33px;
        font-family: Avenir,Helvetica Neue,Arial,Helvetica,sans-serif;
        font-weight: 600;
        color: black;
        position: relative;
        top: 2px;
    }
    .flex-box{
        display: flex;
    }
    .fixed{
        position: fixed;
    }
    .maxHeight{
        height: 100vh;
    }
    .maxWidth{
        width: 100%;
    }
    .login-form{
        min-width: 368px;
        margin: 0 auto;
    }
    .footer{
        position: absolute;
        bottom: 0;
        align-items: center;
        width: 100%;
    }
    @media screen and (max-width: 647px){
        .login-form{
            min-width: 70%;
        }
    }
</style>