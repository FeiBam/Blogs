<template>
    <BaseContent>
        <div class="Article-Main">
            <ArticleHead v-bind:ArticleID="ArticleId" v-bind:Title="Title" v-bind:Introduction="Introduction" v-bind:Creator="Creator"></ArticleHead>
            <div class="ReadMore">
                <a @click="viewArticle()"><i style="margin-right: 5px" class="fas fa-book-open fa-fw"></i>阅读全文</a>
            </div>
            <ArticleTags v-bind:Tags="Tags"></ArticleTags>
        </div>
    </BaseContent>
</template>

<script>
    import BaseContent from "../../../Pubilc/components/BaseContent";
    import ArticleHead from "../../../Pubilc/components/ArticleHead";
    import ArticleTags from "../../../Pubilc/components/ArticleTags";

    import { mapActions } from 'vuex'
    import { ActionsMixin } from '@/store/blog/Mixin'
    import Router from "@/router";
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
            Introduction:{
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
                this.ViewArticle(this.ArticleId).then(()=>{
                    Router.push(`/Article/${this.ArticleId}`)
                })
            },
            ...mapActions('Blog',{
                ViewArticle:ActionsMixin.ViewArticle
            })
        }
    }
</script>
