<template>
    <div class="layout">
        <div class="menu">
            <Menu :isCollapse="isCollapse"></Menu>
        </div>
        <div class="content" :class="{small:isCollapse}">
            <Content @changeShow="changeShow" :isCollapse="isCollapse"></Content>
        </div>

    </div>
</template>

<script>
import Menu from './menu/menu.vue'
import Content from './content/content.vue'
export default {
    data(){
        return {
            isCollapse:false
        }
    },
    components:{
        Menu,
        Content
    },
    methods:{
        changeShow(){
            this.isCollapse=!this.isCollapse
        }
    }
}
</script>

<style scoped lang="less">
    .layout{
        // display: flex;
        width: 100vw;
        height: 100vh;
        background-color: #eee;
        .menu{
            // width: 200px;
            background: #112f50;
            position: fixed;
            left: 0;
            top: 0;
            bottom: 0;
        }
        .content{
          padding-left: 200px;
          transition: all .4s linear;
        }
        .small{
            padding-left: 64px;
        }
    }
</style>