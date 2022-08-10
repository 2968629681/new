<template>
<div>
  <div style="height:400px;display: flex">
    <el-table
      class="up"
      :data="first"
      height="100%"
      border
      style="width: 100%">
      <el-table-column
        prop="date"
        label="日期"
        width="80">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="80">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
      <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" plain @click="delmembers(scope.$index, scope.row)">删除</el-button>
          </template>
      </el-table-column>
    </el-table>
    <i class="el-icon-circle-plus-outline" @click="addmembers"></i>

    <el-table
      class="up"
      :data="tableData"
      height="100%"
      border
      style="width: 100%">
      <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
    </el-table>

    <el-table
      class="up"
      :data="tableData"
      height="100%"
      border
      style="width: 100%">
      <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
    </el-table>
  </div>

  <!-- 下面的表单 -->
 <el-table
    :data="tableData"
    height="100%"
    border
    style="width: 100%"
    >
    <el-table-column
      prop="date"
      label="日期"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址">
    </el-table-column>
  </el-table>
</div>
  
</template>

<script>

export default {
    data(){
        return {
          first:[{}],
          second:[{}],
          third:[{}],
          tableData: [{
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-08',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-06',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-07',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }],
          lockReconnect: false, //是否真正建立连接
          timeout: 60 * 1000, //60秒一次心跳
          timeoutObj: null, //心跳心跳倒计时
          serverTimeoutObj: null, //心跳倒计时
          timeoutnum: null, //断开 重连倒计时
        }
    },
    created() {
			this.initWebSocket();
		},
		destroyed() {
			this.websock.close(); //离开路由之后断开websocket连接
		},
    methods: {
      // 动态添加
      addmembers() {
        console.log('添加');
        var member = this.data.tableData;
        console.log(member);
        var length = member.length;
        this.zichandetail.members.push({
              id: parseInt(length),
              date: '',
              name: '',
              address: '',
        })
      },
      // 删除
      delmembers(index, row) {
        var that = this;
        this.$confirm('确认删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
        }).then(() => {
            //点击确定的操作(调用接口)
            var hasmembers = that.zichandetail.members;
            for (var i = 0; i < hasmembers.length; i++) {
                if (row.id == hasmembers[i].id) {
                    that.zichandetail.members.splice(i, 1);
                    // this.$message({ message: '删除成功', duration: 2000, type: 'success' });
                }
            }
          }).catch(() => {
          //点取消的提示
              return;
          });
        },

      currentTime() {
				setInterval(this.formatDate, 500);
			},
			initWebSocket() {
				//初始化weosocket
				const wsuri = "ws://trader.niuwx.cn/ws/ping";
				this.websock = new WebSocket(wsuri);
				// 客户端接收服务端数据时触发
				this.websock.onmessage = this.websocketonmessage;
				// 连接建立时触发
				this.websock.onopen = this.websocketonopen;
				// 通信发生错误时触发
				this.websock.onerror = this.websocketonerror;
				// 连接关闭时触发
				this.websock.onclose = this.websocketclose;
			},
			// 连接建立时触发
			websocketonopen() {
				//开启心跳
				this.start();
				//连接建立之后执行send方法发送数据
				// let actions = {"room":"007854ce7b93476487c7ca8826d17eba","info":"1121212"};
				// this.websocketsend('ping');
			},
			// 通信发生错误时触发
			websocketonerror() {
				console.log("出现错误");
				this.reconnect();
			},
			// 客户端接收服务端数据时触发
			websocketonmessage(e) {
				console.log(e.data);
        console.log("收到后台消息");
				//收到服务器信息，心跳重置
				this.reset();
			},
			websocketsend(Data) {
				//数据发送
				this.websock.send(Data);
			},
			// 连接关闭时触发
			websocketclose(e) {
				//关闭
				console.log("断开连接", e);
				//重连
				this.reconnect();
			},
			reconnect() {
				//重新连接
				var that = this;
				if (that.lockReconnect) {
					return;
				}
        console.log('重新连接');
				that.lockReconnect = true;
				//没连接上会一直重连，设置延迟避免请求过多
				that.timeoutnum && clearTimeout(that.timeoutnum);
				that.timeoutnum = setTimeout(function () {
					//新连接
					that.initWebSocket();
					that.lockReconnect = false;
				}, 5000);
			},
			reset() {
				//重置心跳
				var that = this;
				//清除时间
				clearTimeout(that.timeoutObj);
				clearTimeout(that.serverTimeoutObj);
				//重启心跳
				that.start();
			},
			start() {
				//开启心跳
				console.log("开启心跳");
				var self = this;
				self.timeoutObj && clearTimeout(self.timeoutObj);
				self.serverTimeoutObj && clearTimeout(self.serverTimeoutObj);
				self.timeoutObj = setTimeout(function () {
          console.log(self.websock);
					//这里发送一个心跳，后端收到后，返回一个心跳消息，
					if (self.websock.readyState == 1) {
            console.log("接受到了数据");
						//如果连接正常
						self.websock.send("ping"); //这里可以自己跟后端约定
					} else {
						//否则重连
						self.reconnect();
					}
					self.serverTimeoutObj = setTimeout(function () {
						//超时关闭
						self.websock.close();
					}, self.timeout);
				}, self.timeout);
			}
      },
		mounted() {
			this.currentTime();
      // 请求第一个表格的数据
      var that =this
      if(this.$store.state.token == '') this.$router.replace({name:'login'})
      console.log(this.$store.state.token);
      this.$axios({
            url:'/api/symbols/get',
            method:'post',
            headers: {
              Authorization : this.$store.state.token
            }
        }).then(function(res){
          console.log(res.data);
          that.$data.first=res.data.symbols
          that.$data.first[that.$data.first.length]=''
          console.log(that.$data.first.length);
      }).catch(function(err){
        console.log(err);
      })
		},
		// 销毁定时器
		beforeDestroy() {
			if (this.formatDate) {
				clearInterval(this.formatDate); // 在Vue实例销毁前，清除时间定时器
			}
		}
}
</script>

<style>

</style>