<template>
    <div class="main">
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: "ContentMain",
    }
</script>

<style scoped>
    .main{
        width: calc(100% - 1 * 285px);
        padding-right: 16px;
        float: left
    }
</style>