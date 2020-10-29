<template>
    <AdminContentLayout>
        <template v-slot:content>
            <a-table :data-source = Articles :columns = columns>
                <a slot="Title" @click="ViewArticle(Article.id)" slot-scope="Title,Article">{{ Title }}</a>
                <span slot="customArticleTitle">文章标题</span>
                <span slot="Date" slot-scope="Date">{{ Date }}</span>
                <span slot="customArticleDate">创建时间</span>
                <span slot="isDelete" slot-scope="isDelete">
                    <span v-if="isDelete"> 已被删除！ </span>
                </span>
                <span slot="action" slot-scope="Article">
                    <span v-if="Article.isDelete">
                        <a>恢复文章</a>
                        <a-divider type="vertical" />
                        <a>强制删除文章</a>
                    </span>
                    <span v-else>
                        <a @click="ArticleEditVisible = true">编辑文章</a>
                    </span>
                </span>
            </a-table>
            <a-modal
                    :footer="null"
                    :visible="ArticlePreViewVisible"
                >
                <ArticleSubjectMain></ArticleSubjectMain>
            </a-modal>
            <a-modal
                    style="min-width: 20vw"
                    :width = "'75vw'"
                    :visible="ArticleEditVisible"
                >
                <a-form :form="Form">
                    <a-form-item label="文章标题">
                        <a-input></a-input>
                    </a-form-item>
                    <a-form-item label="文章介绍">
                        <a-input></a-input>
                    </a-form-item>
                    <a-form-item label="文章标签">
                        <a-select
                                mode="multiple"
                                placeholder="请选择标签"
                                @change="handleSelect"
                        >
                            <a-select-option  v-for=" item in Tags" v-bind:key="item.id">
                                <span v-if="!item.isDelete">{{ item.name }}</span>
                            </a-select-option>
                        </a-select>
                    </a-form-item>
                    <a-form-item label="文章正文">
                        <mavon-editor v-model="ArticleSubject"></mavon-editor>
                    </a-form-item>
                </a-form>
            </a-modal>
        </template>
    </AdminContentLayout>
</template>

<script>
    import AdminContentLayout from "../../../layout/AdminContentLayout";
    import ArticleSubjectMain from "../../blog/Article/ArticleSubjectMain";
    import { DataMixin as AdminDataMixin } from '../../../store/admin/Minxin'
    import { mapMutations,mapState } from 'vuex'
    export default {
        name: "changeArticle",
        components: {
            AdminContentLayout,
            ArticleSubjectMain
        },
        data(){
            return{
                columns:[
                    {
                        title: 'Id',
                        dataIndex: 'id',
                        key:'id',
                    },
                    {
                        dataIndex: 'Title',
                        key: 'Title',
                        slots: { title: 'customArticleTitle' },
                        scopedSlots: { customRender: 'Title' },
                    },
                    {
                        dataIndex: 'Creator.Date',
                        key: 'Creator.Date',
                        slots: { title:'customArticleDate' },
                        scopedSlots: { customRender: 'Date'}
                    },
                    {
                        dataIndex: 'isDelete',
                        title:'删除状态',
                        key:'isDelete',
                        scopedSlots: { customRender: 'isDelete' }
                    },
                    {
                        title: '操作',
                        key: 'action',
                        slots: { title:'customTitle' },
                        scopedSlots: { customRender: 'action' },
                    },
                ],
                Article:{
                    Title:'你好世界！'
                },
                Articles:[
                    {
                        id:0,
                        key:0,
                        Title:'你好世界！',
                        Introduction:'我又回来辣！',
                        isDelete:false,
                        Creator:{
                            Name:'feibam',
                            Date:'2020-10-8'
                        },
                        Tags:['水','日常']
                    }
                ],
                ArticlePreViewVisible:false,
                ArticleEditVisible:false,
                Form:this.$form.create(this , { name:'editArticle'})
            }
        },
        methods:{
            ViewArticle(Title){
                console.log(Title)
            }
        },
        computed:{
            ...mapState('Admin',AdminDataMixin)
        }
    }
</script>

<style scoped>

</style>