<template>
  <div class="home">
    <div class="up">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <h4>总销售额</h4>
          <div class="Number">{{ dataNumber.sell | num }}</div>
        </div>
        <div class="footer">
          <span>今日支付量:</span>
          <div class="num">{{ dataNumber.todysell | num }}</div>
        </div>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <h4>总访问量</h4>
          <div class="Number">{{ dataNumber.visit | num }}</div>
        </div>
        <div class="footer">
          <span>今日支付量:</span>
          <div class="num">{{ dataNumber.todyvisit | num }}</div>
        </div>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <h4>总收藏量</h4>
          <div class="Number">{{ dataNumber.collect | num }}</div>
        </div>
        <div class="footer">
          <span>今日支付量:</span>
          <div class="num">{{ dataNumber.todycollect | num }}</div>
        </div>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <h4>总支付量</h4>
          <div class="Number">{{ dataNumber.pay | num }}</div>
        </div>
        <div class="footer">
          <span>今日支付量:</span>
          <div class="num">{{ dataNumber.todypay | num }}</div>
        </div>
      </el-card>
    </div>
    <div class="center">
      <el-card class="box-card left">
        <div slot="header" class="clearfix">
          <span>月销售额</span>
        </div>
        <div id="charts1" style="width: 100%; height: 300px;"></div>
      </el-card>
      <el-card class="box-card right">
        <div slot="header" class="clearfix">
          <span>产品销售比例</span>
        </div>
        <div class="echart">
          <div id="charts2" style="width: 100%; height: 300px;"></div>
        </div>
      </el-card>
    </div>
    <div class="down">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <h4>今日订单</h4>
        </div>
        <div class="tody"><i>今日订单量</i><span>{{tody.order}}</span></div>
        <div class="tody"><i>汇总累计量</i><span>{{tody.accumn}}</span></div>
        <div class="tody"><i>累计金额</i><span>{{tody.amounts}}</span></div>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <h4>本月订单</h4>
        </div>
        <div class="month"><i>本月订单量</i><span>{{month.order}}</span></div>
        <div class="month"><i>汇总累计量</i><span>{{month.accumn}}</span></div>
        <div class="month"><i>累计金额</i><span>{{month.amounts}}</span></div>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <h4>快速入口</h4>
        </div>
        <el-button class="btn" type="primary">产品管理</el-button>
        <el-button class="btn" type="primary">消息管理</el-button>
        <el-button class="btn" type="primary">内容管理</el-button>
      </el-card>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import * as echarts from 'echarts'
export default {
  data() {
    return {
      dataNumber: {},
      fruits:[],
      sales:[],
      saleroom:[],
      amounts:[],
      piedata:[],
      tody:{},
      month:{}
    }
  },
  mounted() {  //最早可以获取Dom元素
    axios.get('http://localhost:8080/data.json').then(response => {
      this.dataNumber = response.data.total;
      this.tody = response.data.tody
      this.month = response.data.month
      for ( let item in response.data.fruits) {
        this.fruits.push(response.data.fruits[item].name)
        this.sales.push(response.data.fruits[item].sales)
        this.saleroom.push(response.data.fruits[item].saleroom)
        this.amounts.push(response.data.fruits[item].amounts)
        this.piedata.push({"value":response.data.fruits[item].amounts,
                            "name":response.data.fruits[item].name
                          })
      } 
      this.line1()
      this.line2()
    })
  },
  filters: {
    num(value) {
      if (!value) return;
      return value.toLocaleString()
    }
  },
  methods: {
    line1() {
      var myChart = echarts.init(document.getElementById('charts1'));
      // 指定图表的配置项和数据
      var option = {
        toolbox: {
          // 显示工具箱
          show: true,
          feature: {
            // 数据缩放
            dataZoom: {
              yAxisIndex: 'none'
            },
            // 数据视图只读
            dataView: { readOnly: false },
            // 魔法类型
            magicType: { type: ['line', 'bar'] },
            //  重置
            restore: {},
            // 保存图片
            saveAsImage: {}
          }
        },
        tooltip: { trigger: "axis" },
        legend: { data: ["销售量", "销售额", "累计金额"] },
        xAxis: {
          type: 'category',
          data: this.fruits
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '销售量',
            data: this.sales,
            type: 'bar',
            smooth: true
          },
          {
            name: '销售额',
            data: this.saleroom,
            type: 'bar',
            smooth: true
          },
          {
            name: '累计金额',
            data: this.amounts,
            type: 'line',
            smooth: true
          },

        ]
      };
      option && myChart.setOption(option);

    },
    line2() {
      var myChart = echarts.init(document.getElementById('charts2'));
      // 指定图表的配置项和数据
      var option = {
        tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)'
  },
        legend: {
          top: '5%',
          left: 'center'
        },
        series: [
          {
            name: '累计金额',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },

            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 40,
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data:this.piedata
          }
        ]
      };

      option && myChart.setOption(option);
    }
  }
}
</script>

<style scoped lang="less">
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}

/deep/.el-card__body {
  padding: 10px !important;
}


.home {

  .up {
    display: flex;

    .box-card {
      width: 400px;
      margin: 20px 20px;
    }

    .Number {
      font-size: 30px;
    }

    .footer {
      display: flex;
    }

    .num {
      margin-left: 10px;
    }
  }

  .center {
    display: flex;

    .left {
      width: 1100px;
      margin: 20px 20px;
    }

    .right {
      width: 520px;
      margin: 20px 20px;
    }

    .echart {
      height: 300px;
    }
  }

  .down {
    display: flex;

    .box-card {
      width: 600px;
      margin: 20px 20px;
    }

    .btn {
      float: left;
      margin: 35px 30px;
    }

    .tody,
    .month {
      display: block;
      height: 40px;
      line-height: 40px;
      font-size: 18px;
      float: left;
      width: 160px;
      text-align: center;
      i {
        display: block;
      }

      span {
        font-size: 24px;
      }
    }
  }
}
</style>