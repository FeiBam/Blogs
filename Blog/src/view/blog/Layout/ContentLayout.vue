<template>
    <div style="display: flex">
        <ContentMain></ContentMain>
        <ContentSide></ContentSide>
    </div>
</template>

<script>
    import ContentMain from "../Content/ContentMain";
    import ContentSide from "../Content/ContentSide";
    export default {
        name: "Content",
        components:{
            ContentSide,
            ContentMain
        },
        data(){
            return{
            }
        }
    }
</script>

<style scoped>
</style>