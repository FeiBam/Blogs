<template>
    <BaseContent>
        <div class="Article-Main">
            <ArticleHead
                    v-bind:ArticleID="this.ViewArticleData.id"
                    v-bind:Title="this.ViewArticleData.Title"
                    v-bind:Introduction="this.ViewArticleData.Introduction"
                    v-bind:Creator="this.ViewArticleData.Creator"
            ></ArticleHead>
            <hr>
            <div v-html="this.SubjectHtml">
            </div>
            <ArticleTags v-bind:Tags="this.ViewArticleData.Tags"></ArticleTags>
        </div>
    </BaseContent>
</template>

<script>
    import ArticleHead from "../Pubilc/components/ArticleHead";
    import ArticleTags from "../Pubilc/components/ArticleTags";
    import BaseContent from "../Pubilc/components/BaseContent";

    import markdown from 'markdown-it'

    import { ActionsMixin, DataMixin } from '@/store/blog/Mixin'
    import { mapActions, mapState,} from 'vuex'
    import { setTitle } from '@/utils/SetTitle'
    export default {
        name: "Article",
        data(){
            return {
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
            if(!this.ViewArticleData.id){
                const ArticleID = this.$route.params.Id
                if(!await this[ActionsMixin.GetArticle](ArticleID)){
                    console.log('Not Fount')
                }
                this[ActionsMixin.ViewArticle](ArticleID)
            }
            setTitle(`飞竹的小站 | ${this.ViewArticleData.Title}`)
            const Md = new markdown()
            this.SubjectHtml = Md.render(this.ViewArticleData.Subject)
        }
    }
</script>

