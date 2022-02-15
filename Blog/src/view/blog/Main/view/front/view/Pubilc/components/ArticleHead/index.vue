<template>
    <div>
        <div>
            <BaseHead v-bind:ArticleID="ArticleID" v-bind:Title="Title" v-bind:Creator="Creator">
                <template slot="head">
                    <a style="cursor:poniter;"><i class="fa fa-globe-africa"></i></a>
                </template>
            </BaseHead>
        </div>
        <p class="Article-text">{{ Introduction }}</p>
    </div>
</template>

<script>
    import BaseHead from "./components/BaseHead";
    export default {
        name: "ArticleHead",
        components:{
            BaseHead
        },
        props:{
            Title:{
                type:String,
                default:'我可是标题！'
            },
            Introduction:{
                type:String,
                default:'我是介绍哦！'
            },
            Creator:{
                type:Object,
                default:() => ({
                    Name:'null',
                    Date:'0000-00-00'
                })
            },
            ArticleID:{
                type:Number
            }
        },
        methods:{
            openLangSelect(){

            },
            changeArticleLang(){

            }
        }
    }
</script>

<style scoped>
    .Article-text{
        color: #333;
        font-size: 16px;
        max-width: 100%;
        overflow: hidden;
        margin-top: .5rem;
        margin-bottom: 1rem;
    }
</style>