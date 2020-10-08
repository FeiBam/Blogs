<template>
    <AdminContentLayout>
        <template v-slot:content>
            <div>
                <div>
                    <a-steps :current="ArticleEditCurrent">
                        <a-step title="填写文章介绍信息" />
                        <a-step title="添加文章标签" />
                        <a-step title="编辑文章主题" />
                        <a-step title="预览文章" />
                        <a-step title="完成"></a-step>
                    </a-steps>
                </div>
                <div v-show="ArticleEditCurrent === 0" class="Form-Box">
                    <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
                        <a-form-item label="文章标题">
                            <a-input v-decorator="['Title',{ rules:[{ required: true , message:'请输入文章标题' }]}]"></a-input>
                        </a-form-item>
                        <a-form-item label="文章介绍">
                            <a-input v-decorator="[ 'Introduce',{ rules:[{ required: true , message:'请输入文章介绍！'}]}]"></a-input>
                        </a-form-item>
                    </a-form>
                </div>
            </div>
            <div v-show="ArticleEditCurrent === 1" class="Form-Box">
                <a-form :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
                    <a-form-item label="文章标签选择">
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
                </a-form>
            </div>
            <div class="Form-Box" v-show="ArticleEditCurrent === 2">
                <mavon-editor v-model="ArticleSubject"></mavon-editor>
            </div>
            <div class="Form-Box" v-if="ArticleEditCurrent === 3">
                <ArticleSubjectMain style="max-width: 750px">
                </ArticleSubjectMain>
            </div>
            <div class="Button-Box">
                <a-button @click="ArticleEditCurrent -=1" v-if="ArticleEditCurrent !== 0 ">上一步</a-button>
                <a-button @click="handelNext" v-if="ArticleEditCurrent !== 3 ">下一步</a-button>
                <a-button @click="handleSubmit" v-if="ArticleEditCurrent === 3">确认！</a-button>
            </div>
        </template>
    </AdminContentLayout>
</template>

<script>
    import { mapActions,mapState } from 'vuex'
    import { ActionsMixin as BlogActionsMixin } from '../../../store/blog/Mixin'
    import { DataMixin as AdminDataMixin , ActionsMixin as AdminActionMixin} from '../../../store/admin/Minxin'
    import AdminContentLayout from "../../../layout/AdminContentLayout";
    import ArticleSubjectMain from "../../blog/Article/ArticleSubjectMain";
    export default {
        name: "addArticle",
        components:{
            AdminContentLayout,
            ArticleSubjectMain
        },
        data(){
            return{
                ArticleTitle:'',
                ArticleIntroduce:'',
                ArticleSubject:'',
                ArticleTags:[],
                ArticleCreator:{},
                ArticleEditCurrent:0,
                ArticleObject:{},
                FormDecorator:{
                    Title:['Title',{ rules:[{ required: true , message:'请输入文章标题' },{ max:18 ,message: '标题不可超过18个字'}]}],
                    Introduce:[ 'Introduce',{ rules:[{ required: true , message:'请输入文章介绍！'}]}],
                    Tag:['Tags',{ rules :[{ required: true , message:'请选择至少一个标签'}]}],
                    Subject:''
                },
                form: this.$form.createForm(this, { name: 'createArticle' }),
            }
        },
        methods:{
            ...mapActions('Blog',{
                PreviewArticle:BlogActionsMixin.PreviewArticle,
            }),
            ...mapActions('Admin',{
                getAllTags:AdminActionMixin.getAllTag,
                createArticle:AdminActionMixin.addArticle
            }),
            handelNext(e){
                e.preventDefault();
                switch (this.ArticleEditCurrent) {
                    case 0:this.form.validateFields((err,data)=>{
                        if (err){
                            console.log(err)
                            this.$message.warn('请输入文章标题和介绍')
                        }
                        else {
                            this.ArticleTitle = data.Title
                            this.ArticleIntroduce = data.Introduce
                            this.ArticleEditCurrent +=1
                        }
                    })
                        break;
                    case 1:
                        if (this.ArticleTags.length === 0){
                            this.$message.warn('请至少选择一个标签')
                        }
                        else {
                            this.ArticleEditCurrent +=1
                        }
                        break;
                    case 2:
                        if (this.ArticleSubject === ''){
                            this.$message.warn('请编写你的文章！')
                        }
                        else {
                            const Time = new Date()
                            this.ArticleObject ={}
                            this.ArticleObject['Title'] = this.ArticleTitle
                            this.ArticleObject['Introduction'] = this.ArticleIntroduce
                            this.ArticleObject['Subject'] = this.ArticleSubject
                            this.ArticleObject['Creator'] = {
                                Name:this.UserName,
                                Date:`${Time.getFullYear()}-${Time.getMonth() + 1}-${Time.getDate()}`
                            }
                            this.ArticleObject['Tags'] = this.ArticleTags.map(item=>{
                                return {
                                    Name:item.name
                                }
                            })
                            this.PreviewArticle(this.ArticleObject)
                            this.ArticleEditCurrent +=1
                        }
                        break;
                }
            },
            handleSelect(value){
                const addTagArr = []
                for (let SelectTagId of value){
                    for (let OrginTag of this.Tags){
                        if (SelectTagId === OrginTag.id){
                            if (!OrginTag.isDelete){
                                addTagArr.push(OrginTag)
                            }
                        }
                    }
                }
                this.ArticleTags = addTagArr
            },
            async handleSubmit(){
                const Article = await this.createArticle(this.ArticleObject)
                this.$message.success('创建成功！')
                console.log(Article)
                return Article
            }
        },
        computed:{
            ...mapState('Admin',AdminDataMixin)
        },
        mounted() {
            this.getAllTags({ShowDelete:true,force:false})
        }
    }
</script>

<style scoped>
    .MarkEdit /deep/ .ant-col-12{
        width: 100%;
        display: flex;flex-flow: column;
    }
    .Form-Box{
        margin: 40px auto 0;
        max-width: 750px;
    }
    .Button-Box{
        display: flex;
        margin: auto;
        justify-content: center;
        margin-top: 20px;
    }
    .Button-Box > button {
        margin: 0 5px;
    }
</style>