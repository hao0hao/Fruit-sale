<template>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="订单编号:">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="日期:">
              <span>{{ props.row.date }}</span>
            </el-form-item>
            <el-form-item label="姓名:">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="地址:">
              <span>{{ props.row.address }}</span>
            </el-form-item>
            <el-form-item label="订单详情:">
              <span v-for="item in props.row.content">水果名称：{{ item.name }} 水果数量： {{ item.number }}个<br/></span>
            </el-form-item>
            <el-form-item label="备注:">
              <span>{{ props.row.remark }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        label="编号"
        prop="id">
      </el-table-column>
      <el-table-column
           prop="date"
           label="日期">
         </el-table-column>
         <el-table-column
           prop="name"
           label="姓名">
         </el-table-column>
         <el-table-column
           prop="order"
           label="订单价格">
         </el-table-column>
         <el-table-column
           prop="address"
           label="地址">
         </el-table-column>
         <el-table-column
           prop="state"
           label="状态">
         </el-table-column>
    </el-table>
  </template>
   
   <script>
   import axios from 'axios';
   
   export default {
       data() {
         return {
           tableData: []
         }
       },
       mounted(){
           axios.get('http://localhost:8080/order.json').then(response => {
                this.tableData= response.data.filter((item)=>{
                return item.state=='完成'
               })
           })
       }
     }
   </script>
   
   <style scoped lang="less">
       .demo-table-expand {
    font-size: 0;
}

.demo-table-expand label {
    width: 90px;
    color: #99a9bf;
}

.demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
}
   </style>