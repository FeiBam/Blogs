<template>
    <BaseContent>
        <div class="Article-Main">
            <ArticleHead v-bind:Title="Title" v-bind:Text="Text" v-bind:Creator="Creator"></ArticleHead>
            <div class="ReadMore">
                <a @click="viewArticle()"><i style="margin-right: 5px" class="fas fa-book-open fa-fw"></i>阅读全文</a>
            </div>
            <ArticleTags v-bind:Tags="Tags"></ArticleTags>
        </div>
    </BaseContent>
</template>

<script>
    import BaseContent from "../../../components/Blog/BaseContent";
    import ArticleHead from "./Components/ArticleHead";
    import ArticleTags from "./Components/ArticleTags";
    export default {
        name: "ArticlePreview",
        components:{
            ArticleTags,
            ArticleHead,
            BaseContent,
        },
        props:{
            Tags:{
                type:Array,
            },
            Title:{
                type:String
            },
            Text:{
                type:String
            },
            Creator:{
                type:Object
            },
            ArticleId:{
                type:Number
            }
        },
        methods:{
            viewArticle(){
                console.log(this.ArticleId)
            }
        }
    }
</script>

<style scoped>
    .Article-Main{
        position: relative;
        padding: 32px 24px;
        margin: 16px auto;
    }
    .ArticlePreview-Main > h2 {
        transition: all .25s ease;;
        font-weight: 400;
        font-size: 24px;
        margin: 0;
    }
    .ArticlePreview-Main > h2 > a {
        color: #333333;
    }
    .ArticlePreview-Main > h2 > a:hover{
        color: darkorange;
        cursor: pointer;
    }
    .Creator-item > a{
        color: rgba(51,51,51,.7);
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .Creator-item > a > i{
        margin-right: 4px;
        font-weight: 900;
    }
    .ReadMore{
        letter-spacing:.1rem;
        font-size: .8rem;
        margin-top: 16px;
    }
    .ReadMore > a {
        font-weight: 700;
        color: #fff;
        display: inline-block;
        padding: .2em 2.4em;
        line-height: 2rem;
        background-color: #1bc3fb;
        vertical-align: middle;
        border-radius: 6px;
    }
    .ArticlePreview-Tag{
        background-color: rgba(231,231,231,.5);
        margin-top: 16px;
        margin-bottom: -32px;
        margin-left: -24px;
        position: relative;
        width: calc(100% + 3 * 16px);
        padding: 8px 24px;
        line-height: 1.7;
        word-spacing: 8px;
    }
    .ArticlePreview-Tag > a {
        margin-right: 10px;
        color: rgba(51,51,51,.7);
    }
    .ArticlePreview-Tag > a:hover{
        color: darkorange;
    }
    .ArticlePreview-Tag > a > i {
        margin-right: 4px;
    }
</style>