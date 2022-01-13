<template>
    <div>
        <div class="anime"></div>
        <div>
        <div style="transition: 1s">
            <div class="head_change">
                <div style="position: absolute;top: 0;right: 0;margin-top: 20px">
                    <button class="nav_text" style="background-color: #2c3e50;color: white" type="primary">首页</button>
                    <button class="nav_text">朋友们</button>
                    <button @click="links.bluecloud()" class="nav_text">Minecraft</button>
                    <button class="nav_text">网站状态</button>
                </div>
            </div>
            <div style="height: 80%;text-align: center;display: flex;flex-flow: column;overflow: auto;">
                <div class="menu_button"><el-button @click="menu_vis = true" style="position: absolute;top:10px;left:10px" icon="el-icon-s-unfold"></el-button></div>
                <div style="margin: 0rem 2rem">
                    <image  style="height: 200px;width: 200px;border-radius: 100px;margin-top: 40px" :src="img"/>
                </div>
                <div>
                    <div>
                        <div><div style="padding-top: 80px" class="contens_margin">飞竹的小站</div></div>
                        <div><div class="contens_margin_button"><button @click="$router.push('/blog/1')" style="background-color: #0090c5" type="primary"><i class="el-icon-s-home icon_margin"></i>我的博客</button></div></div>
                        <div><div class="contens_margin_button"><button @click="links.github()" style="background-color: #dfdfdf;border: unset"><img class="icon_margin" width="20" height="20" src="../../../../../blog/vue/src/assets/GitHub-Mark-32px.png">Git hub</button></div></div>
                    </div>
                </div>
            </div>
            <div>
              <p>本站已运行{{day()}}天</p>
              <p>©2020-2020 All rights reserved.</p>
              <p>Builid by Feibam with ❤</p>
            </div>
        </div>
    </div>
      <!--  <div>
            <el-drawer direction="ltr" v-bind:size="'275px'" v-bind:visible.sync="menu_vis" v-bind:with-header="false">
                <div style="padding: 0 23px 0 20px">
                    <p><a class="no_text-decoration text-custom">首页</a></p>
                    <el-divider class="el-divider-custom text-custom"></el-divider>
                    <p><a class="no_text-decoration text-custom">朋友们</a></p>
                    <el-divider class="el-divider-custom"></el-divider>
                    <p><a href="http://www.blueclouds.club" class="no_text-decoration text-custom">Minecraft</a></p>
                    <el-divider class="el-divider-custom"></el-divider>
                    <p><a class="no_text-decoration text-custom">网站状态</a></p>
                </div>
            </el-drawer>
        </div>-->
    </div>
</template>

<script>
    export default {
        name: "index.vue",
        data(){
            return {
                img:require('../../../../../blog/vue/src/assets/head.png'),
                menu_vis:false,
                start:new Date("3/16/2020").getTime(),
                today:new Date().getTime(),
                links:{
                    bluecloud:function () {
                        window.open('http://www.blueclouds.club')
                    },
                    github:function () {
                        window.open('http://www.github.com/feibam')
                    }
                }
            }
        },
        methods:{
          day:function () {
            const duration = this.today - this.start;
            return Math.floor(duration / (1000 * 60 * 60 * 24))
          }
      }
    }
</script>

<style scoped>
    .anime{
        background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAIAAACRXR/mAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAABnSURBVHja7M5RDYAwDEXRDgmvEocnlrQS2SwUFST9uEfBGWs9c97nbGtDcquqiKhOImLs/UpuzVzWEi1atGjRokWLFi1atGjRokWLFi1atGjRokWLFi1af7Ukz8xWp8z8AAAA//8DAJ4LoEAAlL1nAAAAAElFTkSuQmCC") repeat 0 0;
        animation: bg-scrolling-reverse .92s infinite;
        animation-timing-function: linear;
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: -9999;
    }
    @keyframes bg-scrolling-reverse {
        100% {
            background-position: 50px 50px;
        }
    }
    .contens_margin {
        margin: 20px 0;
        font-size: 3rem;
    }
    .contens_margin_button /deep/ .el-button{
        margin-top:20px;
        padding: 0.6rem 1.5rem;
        font-size: 1.35rem;
        font-weight: 800;
        width: 30%;
        height: 3.55rem;
        border-radius: 6px;
    }
    .nav_text{
        background-color: unset;
        border:unset;
        color: rgba(0,0,0,0.67);
        font-weight: 800;
        font-size: 1rem;
        margin-right: 40px;
        margin-left: 0;
    }
    .nav_text:hover{
        background-color: unset;
    }
    .nav_text:focus{
        background-color: unset;
        color:rgba(0,0,0,0.67);
    }
    .head_change /deep/ .el-header{
        display: block;
        height: 8%;
    }
    .menu_button{
        display: none;
        margin: 10px;
    }
    .icon_margin{
        margin-right: 10px;
    }

    .el-divider-custom{
        margin: 0;
    }
    @media screen and (max-width:1200px){
        .head_change{
            display: none;
            height: 8%;
        }
        .menu_button{
            display: block;
            margin: 10px;
        }
        .contens_margin_button /deep/ .el-button{
            margin-top:20px;
            padding: 0.6rem 1.5rem;
            font-size: 1.35rem;
            font-weight: 800;
            width: 40%;
            height: 3.55rem;
            border-radius: 6px;
        }
    }
    @media screen and (min-width: 1200px){
        .head_change{
            display: block;
            height: 8%;
        }
    }
    @media screen and (max-width: 768px){
        .contens_margin_button /deep/ .el-button{
            margin-top:20px;
            padding: 0.6rem 1.5rem;
            font-size: 1.35rem;
            font-weight: 800;
            width: 45%;
            height: 3.55rem;
            border-radius: 6px;
        }
    }
    @media screen and (max-width: 647px){
        .contens_margin_button /deep/ .el-button{
            margin-top:20px;
            padding: 0.6rem 1.5rem;
            font-size: 1.35rem;
            font-weight: 800;
            width: 80%;
            height: 3.55rem;
            border-radius: 6px;
        }
    }
    @media screen and (max-height: 768px) {
        .anime{
            background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAIAAACRXR/mAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAABnSURBVHja7M5RDYAwDEXRDgmvEocnlrQS2SwUFST9uEfBGWs9c97nbGtDcquqiKhOImLs/UpuzVzWEi1atGjRokWLFi1atGjRokWLFi1atGjRokWLFi1af7Ukz8xWp8z8AAAA//8DAJ4LoEAAlL1nAAAAAElFTkSuQmCC") repeat 0 0;
            animation: bg-scrolling-reverse .92s infinite;
            animation-timing-function: linear;
        }
    }
</style>
<style>
    .no_text-decoration{
        text-decoration: none;
        color: black;
    }
    .text-custom{
        display: block;
        width: 100%;
        height: 100%;
        font-weight: 800;
        color: #444;
    }.text-custom:hover{
        cursor: pointer;
         }
</style>