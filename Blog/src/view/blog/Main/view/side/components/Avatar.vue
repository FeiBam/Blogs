<template>
    <BaseContent class="Avatar-Content">
        <div class="Avatar-Main">
            <img  src="../../../../../../assets/71566075_p0_master1200.jpg">
        </div>
        <div class="Avatar-Tags-Box">
            <a @click="()=>(this.$message.info('可惜了！没有使用Twitter'))" class="fab fa-twitter"></a>
            <a target="_blank" href="https://www.github.com/feibam" class="fab fa-github"></a>
            <a target="_blank" href="https://t.me/n0099_tg" class="fab fa-telegram"></a>
        </div>
    </BaseContent>
</template>

<script>
    import BaseContent from "../../front/view/Pubilc/components/BaseContent";
    export default {
        name: "Avatar",
        components: {
            BaseContent
        },
        data(){
            return{
                img:require('../../../../../../assets/71566075_p0_master1200.jpg')
            }
        }
    }
</script>

<style scoped>

</style>