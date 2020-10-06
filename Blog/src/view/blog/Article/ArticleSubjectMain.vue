<template>
    <BaseContent>
        <div class="Article-Main">
            <ArticleHead
                    v-bind:Title="this.ViewArticleData.Title"
                    v-bind:Text="this.ViewArticleData.Text"
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
    import ArticleHead from "./Components/ArticleHead";
    import ArticleTags from "./Components/ArticleTags";
    import BaseContent from "../../../components/Blog/BaseContent";

    import markdown from 'markdown-it'

    import { ActionsMixin, DataMixin } from '../../../store/blog/Mixin'
    import { mapActions, mapState,} from 'vuex'
    export default {
        name: "ArticleSubjectMain",
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
        mounted() {
            console.log(this.ViewArticleData)
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
