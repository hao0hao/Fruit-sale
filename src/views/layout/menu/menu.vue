<template>
    <div>
        <el-menu :default-active="menuPush" class="el-menu-vertical-demo" background-color="#112f50" text-color="#fff"
            active-text-color="#ffd04b" :collapse="isCollapse" router>
            <el-menu-item>
                <span slot="title">水果售卖</span>
            </el-menu-item>
            <el-menu-item index="/">
                <i class="el-icon-s-home"></i>
                <span slot="title">首页</span>
            </el-menu-item>
            <el-submenu index="/product">
                <template slot="title">
                    <i class="el-icon-data-line"></i>
                    <span>产品管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="/product/list">
                        <i class="el-icon-tickets"></i>
                        <span>产品列表</span>
                    </el-menu-item>
                    <el-menu-item index="/product/category">
                        <i class="el-icon-coin"></i>
                        <span>产品分类</span>    
                    </el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="/order">
                <template slot="title">
                    <i class="el-icon-s-shop"></i>
                    <span>订单管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="/order/order-list">
                        <i class="el-icon-tickets"></i>
                        <span>订单列表</span>
                    </el-menu-item>
                    <el-menu-item index="/order/collect">
                        <i class="el-icon-notebook-2"></i>
                        <span>已完成订单</span>    
                    </el-menu-item>
                    <el-menu-item index="/order/review">
                        <i class="el-icon-discount"></i>
                        <span>未完成订单</span>    
                    </el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="/advert">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>广告分类</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="/advert/advert-list" disabled>
                        <i class="el-icon-tickets"></i>
                        <span>广告列表</span>
                    </el-menu-item>
                </el-menu-item-group>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
export default {
    props: ['isCollapse'],
    data(){
        return{
            menuPush:this.$route.fullPath
        }
    },
    created(){
        if (this.$route.meta.activeMenu) {
            this.menuPush =this.$route.meta.activeMenu
        }
    }
}
</script>

<style scoped lang="less">
.el-menu {
    border-right: none;

    .is-active {
        background: #1e78bf !important;
        color: #fff !important;
    }
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}
</style>