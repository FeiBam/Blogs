<template>
    <div class="cover cover-flex">
        <h1 class="cover-title">Blog</h1>
        <div class="cover-search">
            <form class="cover-search-form">
                <input class="cover-search-form-input" type="text">
                <i class="cover-search-form-input-icon fa fa-search"></i>
            </form>
        </div>
        <div class="menu">
            <div class="menu-flex">
                <a @click="$router.push({name:'index'})" v-bind:class="Show() ? 'menu-tag-active' : 'menu-tag-unactive'" class="menu-tag"><i class="fa fa-rss fa-fw"></i>{{ $T('article')}}</a>
                <a @click="$router.push('/FriendLinks')" v-bind:class="this.$route.name === 'FriendLinks' ? 'menu-tag-active' : 'menu-tag-unactive'" class="menu-tag"><i class="fas fa-link fa-fw"></i>{{ $T('friendLink')}}</a>
                <a v-bind:class="this.$route.name === 'About' ? 'menu-tag-active' : 'menu-tag-unactive'" class="menu-tag"><i class="fa fa-info-circle fa-fw"></i>{{$T('about')}}</a>
            </div>
        </div>
        <div class="cover-img">
            <img src="@/assets/default-banner.jpg" class="cover-img">
        </div>
    </div>
</template>

<script>
    export default {
        name: "Head",
        mounted() {
        },
        beforeDestroy() {
        },
        methods:{
            Show(){
                if (this.$route.name === 'index' || this.$route.name === 'Articles' || this.$route.name === 'ViewArticle') return true
            }
        }
    }
</script>

<style scoped>
</style>