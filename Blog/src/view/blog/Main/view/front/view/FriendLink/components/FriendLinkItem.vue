<template>
    <a :href="link" class="Container" target="_blank">
        <div class="FriendImg">
            <img class="avatar" :src="friendImg">
        </div>
        <div class="FriendName">
            <p>{{friendName}}</p>
        </div>
    </a>
</template>

<script>
export default {
    name: "FriendLinkItem",
    props:{
        link:{
            type:String,
            default: 'javascript:void(0)'
        },
        friendImg:{
            type:String,
            default: require("@/assets/feibam.jpg")
        },
        friendName:{
            type:String,
            default:'No name'
        }
    },
    mounted() {
        this.$setTitle('飞竹的小站 | 友链')
    }
}
</script>
