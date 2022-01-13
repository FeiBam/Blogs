<template>
    <BaseContent>
        <div class="Article-Main">
            <ArticleHead
                    v-bind:Title="this.ViewArticleData.Title"
                    v-bind:Introduction="this.ViewArticleData.Introduction"
                    v-bind:Creator="this.ViewArticleData.Creator"
            ></ArticleHead>
            <hr>
            <div v-html="SubjectHtml">
            </div>
            <ArticleTags v-bind:Tags="this.ViewArticleData.Tags"></ArticleTags>
        </div>
    </BaseContent>
</template>

<script>
    import ArticleHead from "../Pubilc/components/ArticleHead";
    import ArticleTags from "../Pubilc/components/ArticleTags";
    import BaseContent from "../Pubilc/components/BaseContent";
    import request from "../../../../../../../api";

    import markdown from 'markdown-it'

    import { ActionsMixin, DataMixin } from '@/store/blog/Mixin'
    import { mapActions, mapState,} from 'vuex'
    import { setTitle } from '@/utils/SetTitle'
    export default {
        name: "Article",
        data(){
            return {
                ArticleId:this.ViewArticleData.id,
                ArticleTitle:this.ViewArticleData.Title,
                ArticleIntroduction:this.ViewArticleData.Introduction,
                ArticleCreator: this.ViewArticleData.Creator,
                ArticleTags:this.ViewArticleData.Tags,
                SubjectHtml: ''
            }
        },
        components:{
            ArticleHead,
            ArticleTags,
            BaseContent
        },
        computed:{
            ...mapState('Blog',DataMixin)
        },
        methods:{
            ...mapActions('Blog',ActionsMixin)
        },
        async mounted() {
            console.log(this.$route.params.Id)
            if (!this.ViewArticleData.id){
                const ArticleData = await request.getArticleById(this.$route.params.Id)
                const ArticleTag = await request.getArticleTag(this.$route.params.Id)
                console.log(ArticleData,ArticleTag)
            }
            setTitle(`飞竹的小站 | ${this.ViewArticleData.Title}`)
            const md = new markdown()
            this.SubjectHtml = md.render(this.ViewArticleData.Subject)
        }
    }
</script>

<style scoped>
    .Article-Main{
        position: relative;
        padding: 32px 24px;
        margin: 16px auto;
    }
</style>
