<template>
    <AdminContentLayout>
        <template v-slot:content>
            <div>
                <div style="margin-bottom: 10px">
                    <a-button @click="drawerVisBale = true" type="primary">
                        添加标签
                    </a-button>
                </div>
                <a-table :loading="onLoad" :pagination="{ pageSize: 5 }" :columns="columns" :data-source="data">
                    <a style="cursor: default;color: black" slot="name" slot-scope="text">{{ text }}</a>
                    <span slot="customTitle"><i class="fas fa-tag fa-fw"></i>标签名字</span>
                    <a style="cursor: default;color: black" slot="createAt" slot-scope="createAt">{{ createAt }}</a>
                    <span slot="customCreateAt"><i class="fas fa-clock"></i>创建时间</span>
                    <span slot="isDelete" slot-scope="record">
                        <span v-if="record === true">已被删除</span>
                    </span>
                    <span slot="action" slot-scope="record">
                        <a-popconfirm
                                v-if=" data.length && record.isDelete === false"
                                title="你真的要删除吗？"
                                ok-text="确认" cancel-text="取消"
                                @confirm="HandledDeleteTag(record.name)"
                        >
                            <a href="javascript:;">删除标签</a>
                        </a-popconfirm>
                        <div v-else slot-scope="record">
                            <a-popconfirm
                                    ok-text="确认"
                                    cancel-text="取消"
                                    title="恢复标签"
                                    @confirm="HandledRestoreTag(record.name)"
                            >
                                <a>恢复标签</a>
                            </a-popconfirm>
                            <a-divider type="vertical" />
                            <a-popconfirm
                                    ok-text="确认"
                                    cancel-text="取消"
                                    title="强制删除标签"
                                    @confirm="HandledForceDeleteTag(record.name,true)"
                            >
                                <a>强制删除标签</a>
                            </a-popconfirm>
                        </div>
                    </span>
                </a-table>
            </div>
            <div>
                <a-drawer
                        :width="450"
                        :visible="drawerVisBale"
                        @close="drawerVisBale = false"
                >
                    <a-form :form="form">
                        <a-form-item label="标签名字">
                            <a-input v-decorator="[ 'TagName',{ rules:[{ required: true , message:'请输入标签名字'}]}]"></a-input>
                        </a-form-item>
                        <a-button @click="handleAddTag">
                            创建
                        </a-button>
                    </a-form>
                </a-drawer>
            </div>
        </template>
    </AdminContentLayout>
</template>

<script>
    import { mapActions,mapState } from 'vuex'
    import {ActionsMixin , DataMixin as AdminDataMixin } from '../../../store/admin/Minxin'
    import AdminContentLayout from "../../../layout/AdminContentLayout";
    import { AsyncErrCatch } from "../../../utils/AsyncErrCatch";
    export default {
        name: "createTag",
        components:{
            AdminContentLayout
        },
        data(){
            return{
                drawerVisBale:false,
                ShowDeleteTag:false,
                columns:[
                    {
                        title: 'Id',
                        dataIndex: 'id',
                        key:'id',
                    },
                    {
                        dataIndex: 'name',
                        key: 'name',
                        slots: { title: 'customTitle' },
                        scopedSlots: { customRender: 'name' },
                    },
                    {
                        dataIndex: 'createAt',
                        key: 'createAt',
                        slots: { title:'customCreateAt' },
                        scopedSlots: { customRender: 'createAt'}
                    },
                    {
                        dataIndex: 'isDelete',
                        title:'删除状态',
                        key:'isDelete',
                        slots: { title: 'customTitle' },
                        scopedSlots: { customRender: 'isDelete' }
                    },
                    {
                        title: '操作',
                        key: 'action',
                        slots: { title:'customTitle' },
                        scopedSlots: { customRender: 'action' },
                    },
                ],
                data:[
                ],
                onLoad:true,
                form:this.$form.createForm(this, { name:'createTag' })
            }
        },
        methods:{
            ...mapActions('Admin',{
                getAllTag:ActionsMixin.getAllTag,
                addTag:ActionsMixin.addTag,
                deleteTag:ActionsMixin.deleteTag
            }),
            init(){
                this.getTags(true)
            },
            async HandledDeleteTag(TagName,force = false){
                console.log(TagName)
                const [Err,Tag] = await AsyncErrCatch(this.deleteTag({ TagName:TagName, force:force }))
                if (Err){
                    throw Err
                }
                this.$notification.open({
                    message: `删除成功！标签名字:${Tag.data.data.Name}`,
                    duration: 2.5,
                    icon:<a-icon style='color:green' type="smile" />
                });
            },
            async getTags(){
                const [Err,Tags] = await AsyncErrCatch(this.getAllTag(true))
                if (Err){
                    throw Err
                }
                this.data = this.Tags
                this.onLoad = false
                return Tags
            },
            async HandledRestoreTag(Tag){
                console.log(Tag)
            },
            async HandledForceDeleteTag(Tag){
                console.log(Tag)
            },
            async handleAddTag(){
                const data = await new Promise((resolve) => {
                    this.form.validateFields((err,data)=>{
                        if (err){
                            this.$message.warn('请输入标签名字')
                        }
                        else {
                            for (let item of this.data){
                                if (item.name === data.TagName){
                                    this.drawerVisBale = false
                                    this.$notification.open({
                                        message: '已经拥有这个标签了!',
                                        duration: 2.5,
                                        icon:<a-icon style="color:red" type="close-circle"/>
                                });
                                    return
                                }
                            }
                        }
                        resolve(data)
                    })
                })
                const [Err,Tag] = await AsyncErrCatch(this.addTag(data.TagName))
                if (Err){
                    throw Err
                }
                this.drawerVisBale = false
                this.$notification.open({
                    message: `创建成功！标签名字:${Tag.data.data.Name}`,
                    duration: 2.5,
                    icon:<a-icon style='color:green' type="smile" />
                });
            },
        },
        computed:{
            ...mapState('Admin',AdminDataMixin)
        },
        mounted() {
            this.init()
        }
    }
</script>

<style scoped>

</style>