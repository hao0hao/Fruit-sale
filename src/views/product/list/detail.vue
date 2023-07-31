<template>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="商品ID" prop="id" >
            <el-input v-model.id="ruleForm.id" disabled></el-input>
        </el-form-item>
        <el-form-item label="商品名称" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="商品品种" prop="variety">
            <el-select v-model="ruleForm.variety" placeholder="请选择商品品种">
                <el-option label="西瓜" value="西瓜"></el-option>
                <el-option label="桔子" value="桔子"></el-option>
                <el-option label="香蕉" value="香蕉"></el-option>
                <el-option label="苹果" value="苹果"></el-option>
                <el-option label="葡萄" value="葡萄"></el-option>
                <el-option label="梨" value="梨"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="商品数量" prop="number">
            <el-input v-model.number="ruleForm.number"></el-input>
        </el-form-item>
        <el-form-item label="商品价格" prop="price">
            <el-input v-model.number="ruleForm.price"></el-input>
        </el-form-item>
        <el-form-item label="商品描述" prop="describe">
            <el-input type="textarea" v-model="ruleForm.describe"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
export default {
    data() {
        return {
            ruleForm: {
                id:Math.floor(Math.random() * 10000),
                name: '',
                variety: '',
                number: '',
                price: '',
                describe: ''
            },
            rules: {
                name: [
                    { required: true, message: '请输入商品名称', trigger: 'blur' },
                    { min: 1, max: 6, message: '长度在 1 到 2 个字符', trigger: 'blur' }
                ],
                variety: [
                    { required: true, message: '请选择商品品种', trigger: 'change' }
                ],
                number: [
                    { required: true, message: '请输入商品数量', trigger: 'blur' },
                    { type: 'number', message: '必须为数字', trigger: 'blur' }
                ],
                price: [
                    { required: true, message: '请输入商品价格' },
                    { type: 'number', message: '必须为数字' }
                ],
                describe: [
                    { required: true, message: '请填写商品描述', trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$message({
                        message: '恭喜你，添加成功',
                        type: 'success'
                    });
                    this.ruleForm.id++
                    this.$store.commit('SetData', this.ruleForm)
                    this.$router.push('/product/list')
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    }
}

</script>

<style scoped lang="less"></style>