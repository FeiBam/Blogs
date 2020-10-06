<template>
    <a-layout style="height: 100vh" id="components-layout-demo-custom-trigger">
        <a-layout-sider theme="dark" v-model="this.MenuHidden" :trigger="null">
            <div :class="{ classObject:collapsed }" class="logo">
                <img  width="32px" height="100%" src="../../../public/logo-alpha-sc.png">
                <span v-if=" this.MenuHidden !==true" style="color: white;display: flex;align-items: center;font-size: x-large">FeiBam</span>
            </div>
            <a-menu theme="dark" mode="inline" :default-selected-keys="['1']">
                <a-sub-menu>
                    <span slot="title"><i style="margin-right: 10px" class="fas fa-book-open"></i><span v-show="!this.MenuHidden">文章管理</span></span>
                    <a-menu-item @click="()=>{this.$router.push({name:'addArticle'})}">
                        <a-icon type="plus-circle" />
                        <span>添加文章</span>
                    </a-menu-item>
                    <a-menu-item>
                        <i class="fas fa-edit"></i>
                        <span>修改文章</span>
                    </a-menu-item>
                    <a-menu-item>
                        <i class="fas fa-trash-alt"></i>
                        <span>删除文章</span>
                    </a-menu-item>
                </a-sub-menu>
                <a-sub-menu>
                    <span slot="title"><i style="margin-right: 10px" class="fas fa-tag fa-fw"></i><span v-show="!this.MenuHidden">标签管理</span></span>
                    <a-menu-item @click="()=>{this.$router.push({name:'editTag'})}" >
                        <a-icon type="plus-circle" />
                        <span>管理标签</span>
                    </a-menu-item>
                </a-sub-menu>
                <a-sub-menu>
                    <span slot="title"><i style="margin-right: 10px" class="fas fa-user-shield"></i><span v-show="!this.MenuHidden">标签管理</span></span>
                    <a-menu-item>
                        <a-icon type="plus-circle" />
                        <span>添加管理员</span>
                    </a-menu-item>
                    <a-menu-item>
                        <i class="fas fa-edit"></i>
                        <span>修改管理员</span>
                    </a-menu-item>
                    <a-menu-item>
                        <i class="fas fa-trash-alt"></i>
                        <span>删除管理员</span>
                    </a-menu-item>
                </a-sub-menu>
            </a-menu>
        </a-layout-sider>
        <a-layout>
            <router-view></router-view>
        </a-layout>
    </a-layout>
</template>

<script>
    import { mapState,mapMutations } from 'vuex'
    import { MutationsMixin,DataMixin } from '../../store/admin/Minxin'
    export default {
        name: "AdminLayout",
        data() {
            return {
                collapsed: false,
            };
        },
        methods:{
            tologin(){
                this.$router.push('/login')
            },
            ...mapMutations('Admin',{
                setMenuHidden:MutationsMixin.setMenuHidden
            })
        },
        computed:{
            ...mapState('Admin',DataMixin)
        }
    }
</script>

<style scoped>
    #components-layout-demo-custom-trigger .trigger {
        font-size: 18px;
        line-height: 64px;
        padding: 0 24px;
        cursor: pointer;
        transition: color 0.3s;
    }

    #components-layout-demo-custom-trigger .trigger:hover {
        color: #1890ff;
    }

    #components-layout-demo-custom-trigger .logo {
        display: flex;
        height: 32px;
        margin: 16px;
    }
    .classObject{
        justify-content: center;
    }
    .ant-menu-item > i {
        margin-right: 10px;
    }
</style>