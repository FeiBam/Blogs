<template>
    <div>
        <BlogLayout>
            <template v-slot:header>
                <Header></Header>
            </template>
            <template v-slot:Content>
                <Main style="max-width: 80vw;margin: auto"></Main>
            </template>
            <template v-slot:Footer>
                <Footer></Footer>
            </template>
        </BlogLayout>
    </div>
</template>

<script>
    import BlogLayout from "../../layout/BlogLayout";
    import Header from './Head/index'
    import Main from './Main/index'
    import Footer from './Fotter/index'
    //import { mapActions } from 'vuex'
    export default {
        name: "index",
        components:{
            BlogLayout,
            'Header':Header,
            'Main':Main,
            'Footer':Footer
        },
    }
</script>

<style scoped>
</style>