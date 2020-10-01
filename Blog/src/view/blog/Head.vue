<template>
    <div class="cover cover-flex">
        <h1 class="cover-title">Blog</h1>
        <div class="cover-search">
            <form class="cover-search-form">
                <input class="cover-search-form-input" type="text">
                <i class="cover-search-form-input-icon fa fa-search"></i>
            </form>
        </div>
        <div class="menu">
            <div class="menu-flex">
                <a @click="tologin" v-bind:class="this.$route.name === 'index' ? 'menu-tag-active' : 'menu-tag-unactive'" class="menu-tag"><i class="fa fa-rss fa-fw"></i>文章</a>
                <a v-bind:class="this.$route.name === 'admin' ? 'menu-tag-active' : 'menu-tag-unactive'" class="menu-tag"><i class="fas fa-link fa-fw"></i>友链</a>
                <a v-bind:class="this.$route.name === 'login' ? 'menu-tag-active' : 'menu-tag-unactive'" class="menu-tag"><i class="fa fa-info-circle fa-fw"></i>关于</a>
            </div>
        </div>
        <div class="cover-img">
            <img src="https://img.vim-cn.com/29/91197b04c13f512f734a76d4ac422d89dbe229.jpg" class="cover-img">
        </div>
    </div>
</template>

<script>
    export default {
        name: "Head",
        data(){
            return {
                isActive:true,
            }
        },
        mounted() {
            this.$router.beforeEach((to, from , next) => {
                next()
            })
        },
        beforeDestroy() {
        },
        methods:{
            tologin(){
                this.$router.push({name:'index'})
            },
        }
    }
</script>

<style scoped>
    .cover{
        position: relative;
        overflow: hidden;
        height: calc(60vh - 16px - 64px);
    }
    .cover-flex{
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
        align-self: center;
        align-content: center;
        flex-direction: column;
    }
    .cover-title{
        color: #1bc3fb;
        margin-top: calc(22vh - 4*16px);
        line-height: calc(24px*2 + 2*16px);
        font-size: 48px;
        font-weight: 700;
    }
    .cover-search{
        position: relative;
        max-width: calc(100% - 1*16px);
        width: 340px;
        line-height: 48px;
        vertical-align: middle;
        margin-top: 16px;
    }
    .cover-search-form{
        position: relative;
        display: block;
        width: 100%;
    }
    .cover-search-form-input {
        display: block;
        line-height: 46px;
        width: 100%;
        height: 44px;
        border: 1px dashed transparent;
        border-radius: 64px;
        -webkit-appearance:none;
        background-color: #fff;
        padding-left: 36px;
        transition: all .3s ease;
    }
    .cover-search-form-input:focus{
        border: 1px solid #1bc3fb;
        outline: unset;
    }
    .cover-search-form-input-icon{
        display: flex;
        text-align: center;
        justify-content: center;
        position: absolute;
        left: 5px;
        top: 0;
        height: 44px;
        width: 32px;
        font-size: 16px;
        color: rgba(51,51,51,.6);
        line-height: 44px;

    }
    .cover-search-form:hover > i{
        transition: all .3s ease;
        color: #1bc3fb;
    }
    .cover-img{
        width: 100vw;
        height: 60vh;
        object-fit: cover;
        left: 0;
        top: 0;
        overflow: hidden;
        position: absolute;
        margin: 0;
        padding: 0;
        z-index: -9999;
    }
    .menu{
        margin-top: 16px;
    }
    .menu-flex{
        display: flex;
    }
    .menu-flex > a >i{
        margin-right: 3px;
    }
    .menu-tag-active {
        color: #1bc3fb;
        border-bottom: 1px solid #1bc3fb;
    }
    .menu-tag-unactive{
        color: rgba(51,51,51,.85);
    }
    .menu-flex > a:hover{
        color: #1bc3fb;
        border-bottom: 1px solid #1bc3fb;
    }
    .menu-tag{
        font-size: 14px;
        padding: 4px;
        margin: 0 4px;
        transition: all .25s ease
    }
</style>