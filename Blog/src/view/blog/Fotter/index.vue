<template>
    <div style="display: flex;flex-direction: column;align-items: center">
        <p>本站已运行{{day()}}天</p>
        <p>©2020-{{ Year }} All rights reserved.</p>
        <p>Builid by Feibam with <a style="color: red">❤</a></p>
    </div>
</template>

<script>
export default {
    name: "footer",
    data(){
        return {
            Year:new Date().getFullYear(),
            start:new Date('3/1/2021').getTime(),
            today:new Date().getTime(),
            menu_vis:false,
        }
    },
    methods:{
        day:function () {
            const duration = this.today - this.start;
            return Math.floor(duration / (1000 * 60 * 60 * 24))
        }
    }
}
</script>

<style scoped>
.bn{
    color:rgba(0, 0, 0, 0.65) ;
}
.bn:hover{
    color: #1bc3fb;
}
</style>