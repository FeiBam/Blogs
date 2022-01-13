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

<style scoped>
.Container{
    transition: 0.4s;
    color: black;
    text-decoration: none;
    width: calc(100%/3 - 16px);
    display: flex;
    margin: 8px;
    border-radius: 10px;
    box-shadow:0 1px 2px 0 rgba(0,0,0,.1), 0 2px 4px 0 rgba(0,0,0,.1) ;
    background-color: white;
    flex-direction: column;
}
.Container:hover{
    box-shadow:0 2px 4px 0 rgba(0,0,0,.1), 0 4px 8px 0 rgba(0,0,0,.1), 0 8px 16px 0 rgba(0,0,0,.1), 0 16px 32px 0 rgba(0,0,0,.1) ;
    transform: scale(1.05);
}
.avatar{
    transition: 0.4s;
    margin: 16px 8px 4px 8px;
    width: 64px;
    height: 64px;
    min-width: 64px;
    min-height: 64px;
    border-radius: 100%;
    border: 0 solid transparent;
}
@media screen and (max-width: 786px){
    .Container{
        width: calc(100%/2 - 16px);
        flex-direction: row;
    }
    .avatar{
        margin: 16px;
    }

}
.FriendImg{
    display: flex;
    align-self: center;
    transition: 0.4s;
}
.Container:hover .avatar{
    transform: scale(1.2) rotate(18deg);
    box-shadow:0 2px 4px 0 rgba(0,0,0,.1), 0 4px 8px 0 rgba(0,0,0,.1), 0 8px 16px 0 rgba(0,0,0,.1), 0 16px 32px 0 rgba(0,0,0,.1)
}
.FriendName{
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
}
.FriendName > p{
    font-weight: 700;
    font-size: 16px;
    padding-top: 7px;
    margin: 0;
}
</style>