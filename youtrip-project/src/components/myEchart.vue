<template>
  <div style="margin-left:50px" id="myChart" :style="{width: '500px', height: '500px'}">

  </div>
</template>
<style scoped>

</style>
<script>
  export default {
    name: 'echar',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    mounted(){
      this.drawLine();
    },
    methods: {
      drawLine(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        // 绘制图表
        myChart.setOption({
          title: { text: '' },
          tooltip: {},
          xAxis: {
            data: ["大洋洲","欧洲","东南亚","中东","南美洲","北美洲"]
          },
          yAxis: {},
          series: [{
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }]
        });
      }
    },
    created(){

    }
  }
</script>
