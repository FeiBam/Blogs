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
          'phoneNumber',
          { rules:phoneNumberRules },
        ]"
                    placeholder="手机号"
            >
                <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
            </a-input>
        </a-form-item>
        <a-form-item>
            <a-row type="flex" :gutter="16">
                <a-col :span="16">
                    <a-input
                            size="large"
                            v-decorator="[
          'code',
          { rules: [{ required: true, message: '请输入验证码！'},{max:6,message: '验证码最多为6位'}] },
        ]"
                            type="text"
                            placeholder="验证码"
                    >
                        <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
                    </a-input>
                </a-col>
                <a-col :span="6">
                    <a-button size="large" type="primary">
                        获取验证码
                    </a-button>
                </a-col>
            </a-row>
        </a-form-item>
        <a-form-item style="text-align: center">
            <a-button @click="handleSendCode()" size="large" type="primary" html-type="submit" class="login-form-button">
                Log in
            </a-button>
        </a-form-item>
        <a @click="$router.push({path:'/user/'})">账户密码登录</a>
    </a-form>
</template>

<script>
    export default {
        name: "LoginByPhone",
        beforeCreate() {
            this.form = this.$form.createForm(this, { name: 'normal_login' });
        },
        data(){
            return{
                phoneNumberRules:[
                    { required: true, message: '请输入手机号！' },
                    {max:11,min:11,pattern:/^1[34578]\d{9}$/,message: '请输入正确的手机号！'}],
                timeOut:0
            }
        },
        methods: {
            handleSubmit(e) {
                e.preventDefault();
                this.form.validateFields((err, values) => {
                    if (!err){
                        console.log(values)
                    }
                });
            },
            handleSendCode(e){
                console.log(e,1)
            }
        },
    }
</script>

<style scoped>
    .login-form-button{
        width: 100%;
    }
</style>