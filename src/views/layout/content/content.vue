<template>
    <div>
        <div class="header">
            <div class="open">
                <i v-if="!isCollapse" class="el-icon-s-fold" @click="changMenu"></i>
                <i v-else class="el-icon-s-unfold" @click="changMenu"></i>

            </div>
        </div>
        <div class="content">
            <router-view></router-view>
        </div>
        
    </div>
</template>

<script>

export default {
    props: ['isCollapse'],
    methods: {
        changMenu() {
            this.$emit('changeShow')
        }
    }
}
</script>

<style scoped lang="less">
.header {
    height: 50px;
    background: #1e78bf;
    line-height: 50px;
    color: #fff;
    font-size: 22px;

    .open i {
        cursor: pointer;
    }
}
</style>