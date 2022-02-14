<template>
    <div class="Article-Tag">
        <template v-for="item in Tags">
            <a v-bind:key="item.id" ><i class="fas fa-tag fa-fw"></i>{{item}}</a>
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
