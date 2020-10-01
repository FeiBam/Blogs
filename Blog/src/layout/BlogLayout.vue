<template>
    <div style="height: 100%">
        <div class="Head-Cover">
            <slot name="header">
                没被替换
            </slot>
        </div>
        <div class="Content-Cover">
            <slot name="Content">
                没插入
            </slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "BlogLayout"
    }
</script>

<style scoped>
    .Head-Cover{
        padding-bottom: 2px;
    }
    .Content-Cover{
        margin: 16px;
    }
</style>