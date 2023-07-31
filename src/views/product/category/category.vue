<template>
    <div>
        <div class="header">
            <h3>商品类目管理</h3>
        </div>
<el-input
  placeholder="输入查询种类"
  v-model.trim="filterText">
</el-input>

<el-tree
  class="filter-tree"
  :data="data"
  :props="defaultProps"
  default-expand-all
  :filter-node-method="filterNode"
  ref="tree">
</el-tree>
    </div>
   
</template>

<script>

 export default {
    data() {
      return {
        filterText: '',
        data: [{
          label: '苹果',
          children: [{
            label: '红富士苹果',
          },{
            label: '红将军苹果',
          },{
            label: '金帅苹果',
          },{
            label: '乔纳金果',
          },{
            label: '红星苹果',
          },{
            label: '嘎啦苹果',
          },{
            label: '国光苹果',
          },{
            label: '红玉苹果',
          },{
            label: '澳洲青苹',
          },{
            label: '蛇果',
          }]
        }, { 
          label: '西瓜',
          children: [{
            label: '小天使',
          }, {
            label: '京秀',
          },{
            label: '黑金刚',
          },{
            label: '红虎',
          },{
            label: '华蜜冠龙',
          },{
            label: '少子巨宝',
          },{
            label: '庆发黑马',
          },{
            label: '红小玉',
          },{
            label: '黄小玉',
          }]
        }, {  
          label: '芒果',
          children: [{
            label: '贵妃芒',
          },{
            label: '小台农芒凯特芒',
          },{
            label: '青皮芒',
          },{
            label: '鹰嘴芒',
          },{
            label: '水仙芒',
          },{
            label: '澳芒',
          },{
            label: '玉文芒',
          }, {
            label: '象牙芒',
          }]
        },{ 
          label: '葡萄',
          children: [{
            label: '巨峰葡萄',
          }, {
            label: '香峰葡萄',
          },{
            label: '夏黑葡萄',
          },{
            label: '红提葡萄',
          },{
            label: '无核白葡萄',
          },{
            label: '白谢希葡萄',
          },{
            label: '京早晶葡萄',
          },{
            label: '醉金香葡萄',
          }]
        },{
          label: '梨',
          children: [{
            label: '雪花梨',
          }, {
            label: '鸭梨',
          },{
            label: '苹果梨',
          },{
            label: '库尔勒香梨',
          },{
            label: '黄金梨',
          },{
            label: '皇冠梨',
          },{
            label: '丰水梨',
          },{
            label: '酥梨',
          },{
            label: '南果梨',
          },{
            label: '香梨',
          }]
        },{ 
          label: '香蕉',
          children: [{
            label: '米蕉',
          },{
            label: '芝麻蕉',
          },{
            label: '北蕉',
          },{
            label: '仙人蕉',
          },{
            label: '李林蕉',
          },{
            label: '西贡蕉',
          },{
            label: '灰蕉',
          },{
            label: '玫瑰蕉',
          }]
        },{
          label: '桔子',
          children: [{
            label: '糖橙',
          },{
            label: '橘子',
          },{
            label: '贡桔',
          },{
            label: '黄岩橙',
          },{
            label: '长兴岛橙',
          },{
            label: '黄岩橙',
          },{
            label: '脐橙',
          },{
            label: '柑桔',
          },{
            label: '四季橙',
          },{
            label: '金蛋果',
          },{
            label: '代带橙',
          },{
            label: '福居橙',
          },{
            label: '野居橙',
          },{
            label: '天台山橙',
          },{
            label: '贡桔',
          }, {
            label: '甜橙',
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      };
    },
  watch: {
    filterText(val) {
        this.$refs.tree.filter(val);
      }
    },
    methods: {
      filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      }
    }
}
</script>

<style scoped lang="less">
.header{
    height: 40px;
    line-height: 40px;
    padding-left: 20px;
}
</style>