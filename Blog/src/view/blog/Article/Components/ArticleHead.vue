<template>
    <div>
        <BaseHead v-bind:Title="Title" v-bind:Creator="Creator"></BaseHead>
        <p class="Article-text">{{Text}}</p>
    </div>
</template>

<script>
    import BaseHead from "../../../../components/Blog/BaseHead";
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
            Text:{
                type:String,
                default:'我是介绍哦！'
            },
            Creator:{
                type:Object,
                default:() => ({
                    Name:'null',
                    Date:'0000-00-00'
                })
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