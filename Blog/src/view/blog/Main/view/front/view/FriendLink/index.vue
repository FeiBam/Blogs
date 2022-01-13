<template>
    <BaseContent>
        <div class="Article-Main">
            <BaseHead :Title="'友链'" :creator="{Name:'FeiBam',Date:'2021-4-4'}">
            </BaseHead>
            <h3 style="color: #04bbf8;font-size: 21px;margin-top: 1.5em;margin-bottom: 1em"><i class="el-icon-link"></i>朋友们</h3>
            <div class="LinkContainer">
                <template v-for="item of FriendLink">
                    <FriendLinkItem
                        :key="item.id"
                        :link="item.Link"
                        :friend-name="item.FriendName"
                        :friend-img="item.FriendImg"
                    ></FriendLinkItem>
                </template>
            </div>
        </div>
    </BaseContent>
</template>

<script>
import BaseContent from "../Pubilc/components/BaseContent";
import BaseHead from "../Pubilc/components/ArticleHead/components/BaseHead";
import FriendLinkItem from './components/FriendLinkItem'
export default {
    name: "index",
    components:{
        BaseContent,
        BaseHead,
        FriendLinkItem
    },
    data(){
        return{
            FriendLink: [
                {
                    id:0,
                    Link:'https://blw.moe/',
                    FriendImg:'https://blog.blw.moe/wp-content/uploads/2020/11/photo_2020-08-27_15-07-48-300x300.jpg',
                    FriendName:'派兹'
                },
                {
                    id:1,
                    Link:'https://n0099.net/',
                    FriendImg:'https://secure.gravatar.com/avatar/dd653350e3f7684319d676f14438d3f2?s=44&d=mm&r=g',
                    FriendName:'N0099'
                },
                {
                    id:2,
                    Link:'https://walkedby.com/',
                    FriendImg:'https://walkedby.com/images/avator_t.webp',
                    FriendName:'戈登'
                }

            ]
        }
    }
}
</script>

<style scoped>
.LinkContainer{
    display: flex;
    transition: 0.2s;
}
@media screen and (max-width: 786px){
    .LinkContainer{
        flex-flow: wrap;
    }
}
@media screen and (max-width: 600px){
    .LinkContainer>a{
        width: 100%;
        border-radius: 0;
        margin: 0 4px;
    }
    .LinkContainer>a:hover{
        border-radius: 12px;
        margin: 10px;
        box-shadow: 0 2px 4px 0 rgba(0,0,0,.1), 0 4px 8px 0 rgba(0,0,0,.1), 0 8px 16px 0 rgba(0,0,0,.1), 0 16px 32px 0 rgba(0,0,0,.1), 0 32px 64px 0 rgba(0,0,0,.1);
    }
    a:first-of-type{
        border-radius: 12px 12px 0 0
    }
    a:last-of-type{
        border-radius: 0 0 12px 12px
    }
}
</style>