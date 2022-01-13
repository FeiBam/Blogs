<template>
    <div>
        <a-layout-header style="z-index: 99999; background: #fff; padding: 0;position: sticky;top:0;">
            <div class="head-box">
                <a @click="this.setMenuHidden" class="trigger"><a-icon :style="{ fontSize: '20px' }" :type="this.MenuHidden ? 'menu-unfold' : 'menu-fold'"></a-icon></a>
                <slot name="head"></slot>
            </div>
        </a-layout-header>
        <a-layout-content  :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }">
            <slot name="content">
            </slot>
        </a-layout-content>
    </div>
</template>

<script>
    import { mapMutations,mapState } from 'vuex'
    import { MutationsMixin,DataMixin } from '../store/admin/Minxin'
    export default {
        name: "Content",
        methods:{
            ...mapMutations('Admin',{
                setMenuHidden:MutationsMixin.setMenuHidden
            })
        },
        computed:{
            ...mapState('Admin',DataMixin)
        },

    }
</script>

<style scoped>
    .head-box{
        display: flex;
        height: 100%;
        z-index: 99999;
    }
    .trigger{
        color: rgba(0,0,0,.65);
        height: 100%;
        width: 64px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>