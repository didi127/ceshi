<template>
  
  <el-table :data="tableData" border stripe style="width: 100%" height="430">
    <el-table-column prop="id" label="序号" sortable :sort-method="customSort"></el-table-column>
    <el-table-column prop="name" label="人员" sortable :sort-method="customSort"></el-table-column>
    <el-table-column prop="advance" label="推进中" sortable :sort-method="customSort"></el-table-column>
    <el-table-column prop="lag" label="进度滞后" sortable :sort-method="customSort"></el-table-column>
    <el-table-column prop="complete" label="已完成" sortable :sort-method="customSort"></el-table-column>
    <el-table-column prop="total" label="总数" sortable :sort-method="customSort"></el-table-column>
    <el-table-column prop="percentage" label="完成百分比" sortable :sort-method="customSort">
      <template slot-scope="scope">
        {{ scope.row.percentage }}
      </template>
    </el-table-column>
  </el-table>

  
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      tableData: [],
    };
  },
  mounted() {
    this.fetchData();
    
  },
  methods: {
    fetchData() {
      axios.get('https://www.fastmock.site/mock/49c31aa28389842859394e7145c15b34/mockmessage/userlist')
        .then(response => {
          // 请求成功，处理返回的数据
          console.log(response.data.list);
          this.tableData = response.data.list;
        })
        .catch(error => {
          // 请求失败，处理错误
          console.error(error);
        });
    },
    customSort(a, b) {
      // 自定义排序方法的实现
      return a.id - b.id;
    }
  }
}
</script>
<style scoped>

</style>
