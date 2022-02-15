<template>
    <div class="blog-main-content" style="display: flex">
        <front></front>
        <Side></Side>
    </div>
</template>

<script>
    import front from "./view/front/index";
    import Side from "./view/side/index";
    export default {
        name: "Main",
        components:{
            Side,
            front
        },
        data(){
            return{
            }
        }
    }
</script>

<style scoped>
</style>