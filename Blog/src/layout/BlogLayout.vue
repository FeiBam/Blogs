<template>
    <div style="height: 100%">
        <div class="Head-Cover">
            <slot name="header">
            </slot>
        </div>
        <div class="Content-Cover">
            <slot name="Content">
            </slot>
        </div>
        <div class="Footer-Cover">
          <slot name="Footer"></slot>
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
        padding: 16px;
    }
</style>