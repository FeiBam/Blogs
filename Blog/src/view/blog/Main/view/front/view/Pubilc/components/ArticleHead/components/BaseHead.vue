<template>
    <div>
        <h2 @click="ViewArticle" class="Creator-title"><a class="Creator-title-a">{{ Title }}</a></h2>
        <div>
            <div class="Creator-box">
                <div class="Creator-item">
                    <a class="Creator-item-Spac">
                        <img class="Creator-item-Img" :src="require('@/assets/feibam.jpg')">
                        {{ Creator.Name }}
                    </a>
                </div>
                <div class="Creator-item">
                    <a class="Creator-title-a" style="cursor: pointer" @click="ViewArticleByDate"><i class="fa fa-calendar-alt"></i>{{ Creator.Date }}</a>
                </div>
            </div>
            <hr>
        </div>
    </div>
</template>

<script>
    export default {
        name: "BaseHead",
        props:{
            Title:{
                type:String,
                default:'我可是标题！'
            },
            Creator:{
                type:Object,
                default:() => ({
                    Name:'null',
                    Date:'0000-00-00',
                })
            },
            ArticleID:{
                Type:Number
            },
        },
        methods:{
           ViewArticle() {
               console.log(this.ArticleID)
           },
            ViewArticleByDate(){
               console.log(this.Creator.Date)
            }
        }
    }
</script>

<style scoped>
    .Creator-title{
        transition: all .25s ease;;
        font-weight: 400;
        font-size: 24px;
        margin: 0;
    }
    .Creator-title-a{
        color: #333333;
    }
    .Creator-title-a:hover{
        color: darkorange;
    }
    .Creator-box{
        display: flex;
        padding-top: 4px;
        padding-bottom: 8px;
        transition: all .25s ease;
        align-items: center;
        flex-wrap: nowrap;
    }
    .Creator-item{
        color: rgba(51,51,51,.7);
        font-size: 16px;
        line-height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 2px;
        margin: 0 8px 0 0;
        border-radius: 4px;
    }
    .Creator-item-Img{
        width: 17px;
        height: 17px;
        margin-right: 5px;
        border-radius: 100%;
    }
    .Creator-item > a{
        color: rgba(51,51,51,.7);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: default;
    }
    .Creator-item-Spac:hover{
        color: darkorange;
    }
    .Creator-item > a > i{
        margin-right: 4px;
        font-weight: 900;
    }
</style>