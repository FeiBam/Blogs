<template>
    <BaseContent>
        <div class="Article-Main">
            <BaseHead :Title="$T('friendLink')" :creator="{Name:'FeiBam',Date:'2021-4-4'}">
            </BaseHead>
            <h3 style="color: #04bbf8;font-size: 21px;margin-top: 1.5em;margin-bottom: 1em"><i class="el-icon-link"></i>{{$T('friend')}}</h3>
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
                    FriendImg:'https://blw.moe/juan_head55.png',
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
                    FriendImg:'https://walkedby.com/favicon.jpg',
                    FriendName:'戈登'
                }

            ]
        }
    }
}
</script>
