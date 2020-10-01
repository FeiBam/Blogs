<template>
    <a-form
            id="components-form-demo-normal-login"
            :form="form"
            class="login-form"
            @submit="handleSubmit"
    >
        <a-form-item style="margin-bottom: 14px">
            <a-input
                    size="large"
                    v-decorator="[
          'UserName',
          { rules: [{ required: true, message: '请输入你的账户名!'},{max:8 ,message: '账户名不能超过8位'}] },
        ]"
                    placeholder="UserName"
            >
                <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
            </a-input>
        </a-form-item>
        <a-form-item>
            <a-input-password
                    size="large"
                    v-decorator="[
          'PassWord',
          { rules:passWordRule },
        ]"
                    type="PassWord"
                    placeholder="PassWord"
            >
                <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
            </a-input-password>
        </a-form-item>
        <a-form-item style="text-align: center">
            <a-button size="large" type="primary" html-type="submit" class="login-form-button">
                Log in
            </a-button>
        </a-form-item>
    </a-form>
</template>

<script>
    import { ActionsMixin as AdminActionsMixin, DataMixin as AdminDataMixin } from '../../../store/admin/Minxin'
    import { mapActions, mapState } from 'vuex'
    import { AsyncErrCatch } from '../../../utils/AsyncErrCatch'

    export default {
        name: "Login",
        beforeCreate() {
            this.form = this.$form.createForm(this, { name: 'normal_login' });
        },
        data(){
            return{
                passWordRule:[
                    { required: true, message: '请输入密码!' },
                    {max:18,message: '密码不可以超过18位'},
                    {min:8,message: '密码不能小于8位'},
                ],
            }
        },
        computed:{
            ...mapState('Admin',AdminDataMixin)
        },
        methods: {
            ...mapActions('Admin',{
                adminLogin:AdminActionsMixin.adminLogin
            }),
            handleSubmit(e) {
                e.preventDefault();
                this.form.validateFields(async (err, values) => {
                    if (!err) {
                        const [err,res] = await AsyncErrCatch(this.adminLogin(values))
                        console.log({ err },res)
                        if (err){
                            let ErrMessage = ''
                            switch (err.response.code) {
                                case 4001: ErrMessage = '用户名或者密码错误!';break;
                                case 4004: ErrMessage = '没有这个用户！'
                            }
                            this.$message.error(`登陆失败！${ErrMessage}`)
                            return Promise.reject(err)
                        }
                        if (res.status === 200){
                            this.$message.success(`欢迎回来: ${this.UserName}`)
                            setTimeout(()=>{ this.$router.push('/admin') } , 3000)
                        }
                    }
                });
            },
        },
    }
</script>

<style scoped>
    .login-form-button{
        width: 100%;
    }
</style>