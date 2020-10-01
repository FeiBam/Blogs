<template>
    <div class="Base-Content-Main">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "BaseContent"
    }
</script>

<style scoped>
    .Base-Content-Main{
        background-color: #fff;
        border-radius:16px;
        box-shadow: 0 1px 2px 0 rgba(0,0,0,.1), 0 2px 4px 0 rgba(0,0,0,.1);
        transition: all .25s ease;
    }
    .Base-Content-Main:hover {
        box-shadow: 0 2px 4px 0 rgba(0,0,0,.1), 0 4px 8px 0 rgba(0,0,0,.1), 0 8px 16px 0 rgba(0,0,0,.1), 0 16px 32px 0 rgba(0,0,0,.1);
    }
</style>