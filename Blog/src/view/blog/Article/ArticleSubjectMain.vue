<template>
    <BaseContent>
        <div class="Article-Main">
            <ArticleHead></ArticleHead>
            <div class="ReadMore">
                <a><i style="margin-right: 5px" class="fas fa-book-open fa-fw"></i>阅读全文</a>
            </div>
            <ArticleTags></ArticleTags>
        </div>
    </BaseContent>
</template>

<script>
    import ArticleHead from "./Components/ArticleHead";
    import ArticleTags from "./Components/ArticleTags";
    import BaseContent from "../../../components/Blog/BaseContent";
    import { ActionsMixin, DataMixin } from '../../../store/blog/Mixin'
    import { mapActions, mapState,} from 'vuex'
    export default {
        name: "ArticleSubjectMain",
        components:{
            ArticleHead,
            ArticleTags,
            BaseContent
        },
        computed:{
            ...mapActions('Blog',ActionsMixin),
            ...mapState('Blog',DataMixin)
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
