<template>
    <div v-if="!isLoad">
        <ArticlePreview
            v-for="item in Articles"
            v-bind:key="item.id"
            v-bind:Title="item.Title"
            v-bind:Introduction = "item.Introduction"
            v-bind:Tags = "item.Tags"
            v-bind:Creator = "item.Creator"
            v-bind:ArticleId ="item.id"
        ></ArticlePreview>
        <div class="Pagination-Content">
            <div>
                <div v-if="NowPage !== 0" class="Pagination-Button" style="border-radius: 32px 10px 10px 32px">
                    <p>上一页</p>
                </div>
                <p v-else>{{ NowPage + 1 }} / {{ AllPage }}</p>
            </div>
            <div>
                <div v-if="(NowPage + 1) < AllPage" class="Pagination-Button" style="border-radius: 10px 32px 32px 10px;">
                    <p>下一页</p>
                </div>
                <p v-if="NowPage === 0">
                </p>
                <p v-else>{{ NowPage + 1 }} / {{ AllPage }}</p>
            </div>
        </div>
    </div>
    <div v-else>
        <template v-for="index of 5">
            <article-load v-bind:key = index></article-load>
        </template>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import ArticlePreview from "./view/ArticlePreview";
    import ArticleLoad from "../ArticleLoad";
    import Store from "@/store/index"
    import { ActionsMixin as BlogActionsMixin } from '@/store/blog/Mixin'
    import { setTitle } from '@/utils/SetTitle'
    export default {
        name: "Articles",
        components:{
            ArticlePreview,
            ArticleLoad
        },
        data(){
            return{
            }
        },
        mounted() {
            setTitle('飞竹的小站 | 文章们')
            Store.dispatch(`Blog/${ BlogActionsMixin.GetPageInfo }`).then(()=>{
                if (this.$route.fullPath === '/'){
                    Store.dispatch(`Blog/${BlogActionsMixin.GetPage}`,1)
                }else Store.dispatch(`Blog/${BlogActionsMixin.GetPage}`,this.$route.params.num)
            })
        },
        computed:{
            ...mapState('Blog',{
                AllPage:state => state.AllPage,
                NowPage:state => state.NowPage,
                Articles:state => state.Articles,
                isLoad:state => state.isLoad
            })
        }
    }
</script>
