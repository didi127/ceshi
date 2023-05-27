<template>
  <div id="app">
    <h3>人员列表</h3>
    <div class="right">
      <h4>人员: </h4>
      <input class="search" v-model="searchKeyword" placeholder="请输入搜索内容" @keyup="handleKeyUp" />
      <button @click=search>搜索</button>
    </div>
    <el-table :data="tableData.slice((currentPage - 1) * PageSize, currentPage * PageSize)" border stripe style="width: 100%" height="430">
      <el-table-column prop="id" label="序号" sortable :sort-method="customSort"></el-table-column>
      <el-table-column prop="name" label="人员" sortable :sort-method="customSort"></el-table-column>
      <el-table-column prop="advance" label="推进中" sortable :sort-method="customSort"></el-table-column>
      <el-table-column prop="lag" label="进度滞后" sortable :sort-method="customSort"></el-table-column>
      <el-table-column prop="complete" label="已完成" sortable :sort-method="customSort"></el-table-column>
      <el-table-column prop="total" label="总数" sortable :sort-method="customSort"></el-table-column>
      <el-table-column prop="percentage" label="完成百分比" sortable :sort-method="customSort"></el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="PageSize"
      layout="prev, pager, next"
      :total="total"
      background
      >
    </el-pagination>
    <p class="xiala">
      显示第1到第{{ PageSize }}条记录, 总共{{ total }}条记录每页显示
      <el-select v-model="pageSize" placeholder="请选择" size="mini" @change="handlePageSizeChange">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.value"
          :value="item.value">
        </el-option>
      </el-select>
      条记录
    </p>
  </div>
</template>

<script>

import axios from 'axios';

export default {
  name: 'App',

  data() {
    return {
      tableData: [],
      searchKeyword: '',
      originalData: [],  //备份数据
      currentPage: 1, //当前页
      total: 100,
      PageSize: '',
      options: [
        {
          value: 20,
        },
        {
          value: 30,
        },
      ]
    };
  },
  mounted() {
    this.fetchData();
    this.pageSize = this.options[0].value; // 设置初始的 pageSize
    this.PageSize = this.pageSize;
    
  },
  methods: {
    fetchData() {
      axios.get('https://www.fastmock.site/mock/49c31aa28389842859394e7145c15b34/mockmessage/userlist')
        .then(response => {
          // 请求成功，处理返回的数据
          console.log(response.data.list);
          this.tableData = response.data.list;
          this.originalData = response.data.list;
        })
        .catch(error => {
          // 请求失败，处理错误
          console.error(error);
        });
        
    },
    search() {
      const filteredData = this.originalData.filter(item => {
        return item.name.includes(this.searchKeyword);
      });
      this.tableData = filteredData;
      this.currentPage = 1;
      
    },
    customSort(a, b) {
      // 自定义排序方法的实现
      return a.id - b.id;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.currentPage = 1;
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
    },
    handleKeyUp(event) {
      if (event.keyCode === 8 && this.searchKeyword === '') {
        // this.search();
        this.fetchData();
      }
    },
    handlePageSizeChange() {
      this.currentPage = 1;
      this.PageSize = this.pageSize;
    },
  },
  computed: {
    filteredData() {
      // 根据当前页和每页显示数量对数据进行分页
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      const dataToDisplay = this.searchKeyword ? this.originalData.filter(item => item.name.includes(this.searchKeyword)) : this.originalData;
      return dataToDisplay.slice(startIndex, endIndex);
    },
  }
}
</script>

<style lang="scss">
h3 {
  float: left;
}
.right {
  float: right;
}
h4 {
  margin-top: 21px;
  margin-right: 3px;
  float: left;
}
.search {
  margin-top: 15px;
  width: 200px;
  height: 30px;
  border-radius: 5px;
  border-style: none;
  border: 1px solid #999;
  margin-right: 3px;
}
button {
  margin-top: 15px;
  background-color: #4480F7;
  border-radius: 5px;
  border-style: none;
  height: 35px;
  width: 50px;  
  color: #fff;
}

.el-pagination {
  float: left;
}

.xiala {
  float: right;
  color: #9f9999;
}
.el-input__inner {
  width: 60px;
}
</style>
