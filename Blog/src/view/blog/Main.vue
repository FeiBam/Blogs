<template>
    <div>
        <BlogLayout>
            <template v-slot:header>
                <Header-Layout></Header-Layout>
            </template>
            <template v-slot:Content>
                <Content-Layout></Content-Layout>
            </template>
        </BlogLayout>
    </div>
</template>

<script>
    import BlogLayout from "../../layout/BlogLayout";
    import Header from './Layout/HeaderLayout'
    import Content from './Layout/ContentLayout'
    import { mapActions } from 'vuex'
    export default {
        name: "Main",
        components:{
            BlogLayout,
            'Header-Layout':Header,
            'Content-Layout':Content,
        },
        mounted() {

        }
    }
</script>

<style scoped>

</style>