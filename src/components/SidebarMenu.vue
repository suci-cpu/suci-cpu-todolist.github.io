<template>
  <el-row class="tac">
    <el-col :span="12">
      <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          :default-openeds="['1','3']"
          >

        <!-- Vue中借助router-link标签实现路由的切换 -->
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>用户管理</span>
          </template>
          <el-menu-item-group>
            <template slot="title">登录</template>
            <router-link class="list-group-item" active-class="active" to="/loginRegister">
              <el-menu-item index="1-1">登录注册</el-menu-item>
            </router-link>
            <router-link class="list-group-item" active-class="active" to="/backUp">
              <el-menu-item index="1-2" :disabled="$store.state.user === null">备份还原</el-menu-item>
            </router-link>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">数据</template>
            <router-link class="list-group-item" active-class="active" to="/userCenter">
              <el-menu-item index="1-3" :disabled="$store.state.user === null">个人中心</el-menu-item>
            </router-link>
          </el-menu-item-group>
        </el-submenu>

        <router-link class="list-group-item" active-class="active" to="/todoList">
          <el-menu-item index="2" :disabled="$store.state.user === null">
            <i class="el-icon-menu"></i>
            <span slot="title">待办事项</span>
          </el-menu-item>
        </router-link>
        <el-submenu index="3" :disabled="$store.state.user === null">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>数据统计</span>
          </template>
          <el-menu-item-group>
            <template slot="title">任务</template>
            <router-link class="list-group-item" active-class="active" to="/javaFXUseDataStatistic">
              <el-menu-item index="3-1" :disabled="$store.state.user === null" @click="clearData">数据统计</el-menu-item>
            </router-link>
            <router-link class="list-group-item" active-class="active" to="/javaFXFuturePlan">
              <el-menu-item index="3-2" :disabled="$store.state.user === null">未来规划</el-menu-item>
            </router-link>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">单词</template>
            <router-link class="list-group-item" active-class="active" to="/wordReciteSituation">
              <el-menu-item index="3-3" :disabled="$store.state.user === null" @click="clearData">数据统计</el-menu-item>
            </router-link>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">其他</template>
            <router-link class="list-group-item" active-class="active" to="/wordMap">
              <el-menu-item index="3-4" :disabled="$store.state.user === null">世界地图</el-menu-item>
            </router-link>
          </el-menu-item-group>
        </el-submenu>

        <router-link class="list-group-item" active-class="active" to="/taskRanking">
          <el-menu-item index="4" :disabled="$store.state.user === null">
            <i class="el-icon-setting"></i>
            <span slot="title">情况汇总</span>
          </el-menu-item>
        </router-link>

      </el-menu>
    </el-col>
  </el-row>

</template>

<script>

export default {
  name: "SidebarMenu",
  data() {
    return {
      isCollapse: true
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    clearData(){
      while (this.$store.state.xAxis.length > 0) {
        this.$store.state.xAxis.pop()
      }

      while (this.$store.state.yData.length > 0) {
        this.$store.state.yData.pop()
      }
      while (this.$store.state.allStatisticData.taskData.pieData.length > 0) {
        this.$store.state.allStatisticData.taskData.pieData.pop()
      }
    }
  }
}
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 800px;
  margin-top: 20px;
}

a {
  text-decoration: none;
}

.router-link-active {
  text-decoration: none;
}
</style>