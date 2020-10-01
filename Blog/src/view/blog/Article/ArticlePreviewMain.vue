<template>
    <div>
        <ArticlePreview
                v-for="item in Articles"
                v-bind:key="item.id"
                v-bind:Title="item.Title"
                v-bind:Text = "item.Text"
                v-bind:Tag = "item.Tag"
                v-bind:Creator = "item.Creator"
                v-bind:ArticleId="item.id"
        ></ArticlePreview>
    </div>
</template>

<script>
    import ArticlePreview from "./ArticlePreview";
    export default {
        name: "ArticlePreviewMain",
        components:{
            ArticlePreview
        },
        data(){
            return{
                Articles:[
                    {
                        id:0,
                        Title:'测试！',
                        Text:'我才是预览！！',
                        Creator:{
                            Name:'FeiBam',
                            Date:'2020-09-30'
                        },
                        Tags:[],
                    },
                    {
                        id:1,
                        Title:'测试！',
                        Text:'我才是预览！！',
                        Creator:{
                            Name:'FeiBam',
                            Date:'2020-09-30'
                        },
                        Tags:[],
                    },
                    {
                        id:2,
                        Title:'测试！',
                        Text:'我又回来辣！！铲屎堆屎结束后！终于重新整好了！',
                        Creator:{
                            Name:'FeiBam',
                            Date:'2020-09-30'
                        },
                        Tags:[],
                    }
                ]
            }
        },
    }
</script>

<style scoped>

</style>