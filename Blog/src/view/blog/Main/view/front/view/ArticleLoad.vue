<template>
    <BaseContent>
        <div class="Article-Main">
            <div>
                <div>
                    <h2 class="Creator-title is-loading" style="height: 30px; width: 80%;margin-bottom: 10px"></h2>
                    <div>
                        <div class="Creator-box">
                            <div class="Creator-item">
                                <a class="Creator-item-Spac">
                                    <div class="Creator-item-Img is-loading"></div>
                                    <div style="width:60px ;height: 17px" class="is-loading"></div>
                                </a>
                            </div>
                            <div class="Creator-item">
                                <div class="Creator-item-Img is-loading"></div>
                                <div style="width:60px ;height: 17px" class="Creator-title-a is-loading"></div>
                            </div>
                        </div>
                        <hr>
                    </div>
                </div>
                <div style="height: 80px" class="Article-text">
                    <div style="height: 20px;margin-top: 16px" class="is-loading"></div>
                    <div style="height: 12px; margin-top: 10px;width: 72%;" class="is-loading"></div>
                </div>
            </div>
            <div class="ReadMore is-loading">
            </div>
            <div class="Article-Tag">
                <div class="is-loading"></div>
                <div class="is-loading"></div>
                <div class="is-loading"></div>
            </div>
        </div>
    </BaseContent>
</template>

<script>
import BaseContent from "./Pubilc/components/BaseContent";
export default {
    name: "ArticleLoad",
    components:{
        BaseContent,
    },

}
</script>

<style scoped>
.Article-Main{
    position: relative;
    padding: 32px 24px;
    margin: 16px auto;
}
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
    flex-wrap: wrap;
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
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: default;
}
.Creator-item > a > i{
    margin-right: 4px;
    font-weight: 900;
}
.Article-Tag{
    background-color: rgba(231,231,231,.5);
    margin-top: 16px;
    margin-bottom: -32px;
    margin-left: -24px;
    position: relative;
    width: 100%;
    padding: 8px 24px;
    line-height: 1.7;
    word-spacing: 8px;
    display: flex;
}
.Article-Tag > div {
    margin-right: 10px;
    width: 42px;
    height: 17px;
}


.is-loading {

    /* 以下代码实现背景动画效果 */
    animation: loading 1.4s ease infinite;
    -webkit-animation: loading 1.4s ease infinite;
    background-image: -webkit-gradient(linear, left top, right top, color-stop(25%, #f0f0f0), color-stop(37%, #e3e3e3), color-stop(63%, #f0f0f0));
    background-image: -o-linear-gradient(left, #f0f0f0 25%, #e3e3e3 37%, #f0f0f0 63%);
    background-image: linear-gradient(90deg, #f0f0f0 25%, #e3e3e3 37%, #f0f0f0 63%);
    background-size: 400% 100%
}

@-webkit-keyframes loading {
    0% {
        background-position: 100% 50%
    }

    to {
        background-position: 0 50%
    }
}

@keyframes loading {
    0% {
        background-position: 100% 50%
    }

    to {
        background-position: 0 50%
    }
}

</style>