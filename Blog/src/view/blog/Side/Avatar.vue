<template>
    <BaseContent style="margin-top: 16px">
        <div class="Avatar-Main">
            <img  src="../../../assets/71566075_p0_master1200.jpg">
        </div>
        <div class="Avatar-Tags-Box">
            <a @click="()=>(this.$message.info('可惜了！没有使用Twitter'))" class="fab fa-twitter"></a>
            <a target="_blank" href="https://www.github.com/feibam" class="fab fa-github"></a>
            <a target="_blank" href="https://t.me/n0099_tg" class="fab fa-telegram"></a>
        </div>
    </BaseContent>
</template>

<script>
    import BaseContent from "../../../components/Blog/BaseContent";
    export default {
        name: "Avatar",
        components: {
            BaseContent
        },
        data(){
            return{
                img:require('../../../assets/71566075_p0_master1200.jpg')
            }
        }
    }
</script>

<style scoped>
    .Avatar-Main{
        display: flex;
        justify-content: center;
        max-height: calc(100% - 64px - 4 * 16px);
    }
    .Avatar-Main > img {
        width: 240px;
        height: 240px;
        border-top-left-radius: 16px;
        border-top-right-radius:16px;
        object-fit:cover;
    }
    .Avatar-Tags-Box{
        font-size: 18px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 4px 8px
    }
    .Avatar-Tags-Box > a{
        display: flex;
        color: rgba(51,51,51,.7);
        justify-content: center;
        align-items: center;
        width: 32px;
        height: 32px;
        margin: 4px;
        border-radius: 100px;
    }
    .Avatar-Tags-Box > a:hover{
        color: #1bc3fb;
        background-color: rgba(27,195,251,.1);
    }
</style>