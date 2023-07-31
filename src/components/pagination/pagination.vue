<template>
    <div class="pagination">
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page="currentPage1"
      :page-size="pageSize"
      layout="total, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    </div>
</template>

<script>

export default {
  props:{
    total:{
      typeof:Number,
      default:0
    },
    pageSize:{
      typeof:Number,
      default:0
    }
  },
    methods: {
      handleCurrentChange(val) {
        this.$emit('changeData',val)
      }
    },
    data() {
      return {
        currentPage1: 1,
      };
    }
}
</script>

<style scoped lang="less"> 
    .pagination{
        padding: 10px;
        background-color: #fff;
       text-align: center;
    }
</style>