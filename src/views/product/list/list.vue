<template>
    <div>
        <div class="header">
            <el-row class="btn">
                <el-button type="warning" size="medium" @click="addProject"><i class="el-icon-plus"></i> 添加商品</el-button>
                <el-button type="danger" size="medium"><i class="el-icon-sold-out"></i>批量删除</el-button>
            </el-row>
            <el-form :inline="true" :model="search" class="form">
                <el-form-item label="搜索：">
                    <el-input v-model="search.name" placeholder="产品名称"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSearch">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="body">
            <el-table :data="tableData" height="700" border style="width: 100%">
                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column prop="id" label="商品ID" width="180">
                </el-table-column>
                <el-table-column prop="name" label="商品名称" width="180">
                </el-table-column>
                <el-table-column prop="variety" label="商品品种" width="180">
                </el-table-column>
                <el-table-column prop="number" label="商品数量" width="180">
                </el-table-column>
                <el-table-column prop="price" label="商品价格" width="180">
                </el-table-column>
                <el-table-column prop="describe" label="商品描述">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" plain @click="handlelook(scope.$index, scope.row)">查看</el-button>
                        <el-button type="primary" icon="el-icon-edit" size="mini"
                            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button icon="el-icon-delete" size="mini" type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>

            </el-table>
            <Pagination :total="total" :pageSize="pageSize" @changeData="changeData"></Pagination>
        </div>
        <el-dialog title="查看" class="pop" :visible.sync="showLook">
            <el-form label-position="right" label-width="80px" :model="lookData">
                <el-form-item label="商品ID">
                    <el-input v-model="lookData.id" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="商品名称">
                    <el-input v-model="lookData.name" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="商品品种">
                    <el-input v-model="lookData.variety" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="商品数量">
                    <el-input v-model="lookData.number" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="商品价格">
                    <el-input v-model="lookData.price" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="商品描述">
                    <el-input type="textarea" v-model="lookData.describe" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button class="cancel" @click="showLook = false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog title="编辑" class="pop" :visible.sync="showEdit">
            <el-form label-position="right" label-width="80px" :model="lookData" >
                <el-form-item label="商品ID">
                    <el-input v-model="lookData.id" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="商品名称">
                    <el-input v-model="lookData.name"></el-input>
                </el-form-item>
                <el-form-item label="商品品种">
                    <el-input v-model="lookData.variety"></el-input>
                </el-form-item>
                <el-form-item label="商品数量">
                    <el-input v-model="lookData.number"></el-input>
                </el-form-item>
                <el-form-item label="商品价格">
                    <el-input v-model="lookData.price"></el-input>
                </el-form-item>
                <el-form-item label="商品描述">
                    <el-input type="textarea" v-model="lookData.describe"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button class="cancel" @click="showEdit = false">取消</el-button>
                    <el-button class="save" @click="save">保存</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>

import Pagination from '@/components/pagination/pagination.vue'
import axios from 'axios'

export default {
    data() {
        return {
            search: {
                name: ""
            },
            tableData: [],
            total: 0,
            pageSize: 12,
            searchData: [],
            multipleSelection: [],
            showLook: false,
            showEdit: false,
            clickData: -1,
            EditData:{},
            lookData: {
                id: '',
                name: '',
                variety: '',
                number: '',
                price: '',
                describe: ''
            }
        }
    },
    mounted() {
        axios.get('http://localhost:8080/list.json').then(response => {
            this.tableData = response.data.list.page1
            this.total = 69
            if (localStorage.getItem('addData')) {
                let obj = JSON.parse(localStorage.getItem('addData'))
                for (let index = 0; index < obj.length; index++) {
                    this.tableData.unshift(obj[index])
                    this.total++
                }
            }
        })
    },
    updated() {
        if (this.$store.state.addData.id) {
            this.tableData.unshift(this.$store.state.addData)
            if (localStorage.getItem('addData')) {
                let data = []
                let obj = JSON.parse(localStorage.getItem('addData'))
                for (let index = 0; index < obj.length; index++) {
                    data.push(obj[index])
                }
                data.push(this.$store.state.addData)
                localStorage.setItem(`addData`, JSON.stringify(data))
            } else {
                let data = []
                data.push(this.$store.state.addData)
                localStorage.setItem(`addData`, JSON.stringify(data))
            }

            this.$store.commit('clearData')

        }
    },
    components: {
        Pagination
    },
    methods: {
        save(){
            this.showEdit= false
            this.EditData =this.lookData
            this.tableData.splice(this.clickData,1,this.EditData)
        },
        addProject() {
            this.$router.push('/product/detail')
        },
        onSearch() {
            if (this.search.name === '') {
                this.total = 69
                this.tableData = []
                axios.get('http://localhost:8080/list.json').then(response => {
                    this.tableData = response.data.list.page1
                })
            } else {
                this.total = 0
                this.pageSize = 0
                axios.get('http://localhost:8080/list.json').then(response => {
                    for (let index in response.data.list) {
                        for (let j in response.data.list[index]) {
                            if (response.data.list[index][j].name.includes(this.search.name) || response.data.list[index][j].variety.includes(this.search.name)) {
                                this.total++
                                this.pageSize++
                                this.searchData.push(response.data.list[index][j])
                            }
                        }
                    }
                    this.tableData = this.searchData
                    this.searchData = []
                    this.search.name = ""
                })
            }
            console.log('search!', this.search);
        },
        handlelook(index, row) {
            this.showLook = true
            this.lookData.id = row.id
            this.lookData.name = row.name
            this.lookData.variety = row.variety
            this.lookData.number = row.number
            this.lookData.price = row.price
            this.lookData.describe = row.describe
        },
        handleEdit(index, row) {
            this.showEdit = true
            this.clickData = index
            this.lookData.id = row.id
            this.lookData.name = row.name
            this.lookData.variety = row.variety
            this.lookData.number = row.number
            this.lookData.price = row.price
            this.lookData.describe = row.describe
        },
        handleDelete(index, row) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.tableData.splice(index, 1)
                this.total--
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });

        },
        changeData(value) {
            axios.get('http://localhost:8080/list.json').then(response => {
                for (let index in response.data.list) {
                    if (index == `page${value}`) {
                        this.tableData = response.data.list[index]
                    }
                }
            })
        }
    }
}
</script>

<style scoped lang="less">
.header {
    height: 80px;
    background-color: #fff;

    .btn {
        float: left;
        margin: 20px;
    }

    .form {
        float: right;
        margin: 20px;
    }
}

.body {
    .number {
        font-size: 40px;
    }
}

.pop {
    .cancel,.save {
        float: right;
    }
}
</style>