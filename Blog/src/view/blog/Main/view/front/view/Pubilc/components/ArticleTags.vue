<template>
    <div class="Article-Tag">
        <template v-for="item in Tags">
            <a v-bind:key="item.id" ><i class="fas fa-tag fa-fw"></i>{{item.Name}}</a>
        </template>
    </div>
</template>

<script>
    export default {
        name: "ArticleTags",
        props:{
            Tags:{
                type:Array,
                default:() => ([{id:0,name:'没有标签！'}])
            }
        }
    }
</script>

<style scoped>
    .Article-Tag{
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
    .Article-Tag > a {
        margin-right: 10px;
        color: rgba(51,51,51,.7);
    }
    .Article-Tag > a:hover{
        color: darkorange;
    }
    .Article-Tag > a > i {
        margin-right: 4px;
    }
</style>