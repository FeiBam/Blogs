<template>
    <a-layout>
        <a-layout-sider>Sider</a-layout-sider>
        <a-layout>
            <a-layout-header>Header</a-layout-header>
            <a-layout-content><button @click='tologin'>click me</button></a-layout-content>
            <a-layout-footer>Footer</a-layout-footer>
        </a-layout>
    </a-layout>
</template>

<script>
    export default {
        name: "AdminLayout",
        methods:{
            tologin(){
                this.$router.push('/login')
            }
        }
    }
</script>

<style scoped>

</style>