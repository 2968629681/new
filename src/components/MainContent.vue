<template>
<div>
  <div style="height:400px;display: flex">
    <div>
      <el-table
        class="up"
        :data="first"
        height="90%"
        border
        style="width: 100%">
        <el-table-column
          prop="name"
          label="交易对名称"
          width="200">
        </el-table-column>
        <el-table-column
        fixed="right"
        label="操作"
        width="120">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="deleteRow(scope.$index, tableData)"
            type="text"
            size="small">
            移除
          </el-button>
        </template>
      </el-table-column>
      </el-table>
      <el-button @click="dialogFormVisible = true" height="10%" style="align-self: flex-end;">新增交易对</el-button>
     </div>

      <!-- 用来新增交易对的表单 -->
     <el-dialog title="新增交易对" :visible.sync="dialogFormVisible">
      <el-form :model="trade">
        <el-form-item label="交易对名称" :label-width="formLabelWidth">
          <el-input v-model="trade.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addmembers()">确 定</el-button>
      </div>
    </el-dialog>

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
          formLabelWidth: '120px',
          dialogFormVisible: false,
          trade:{name:''},
          first:[{name:''}],
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
          console.log(this.$data.trade.name)
          var that=this
          this.$axios({
                url:'/api/symbols/check',
                method:'post',
                headers: {
                  Authorization : that.$store.state.token
                },
                data:{
                  symbol:that.$data.trade.name
                }
          }).then(function(){
              that.$message.error('新增交易对失败，请确认该交易对是否已存在');
            }).catch(function(){
              that.$data.dialogFormVisible=false
              that.$message({
                message: '新增交易对成功',
                type: 'success'
              });
              var transient=Object.assign({},that.$data.first)
              transient.push({name:that.$data.trade.name})
              var updata=[]
              for (let index = 0; index < transient.length; index++) {
                updata[index] =  transient[index].name;
              }
              that.$data.trade.name=''
              transient.push({name:'123123'})
              transient.push({name:'4124124'})
              that.$axios({
                url:'/api/user/set/symbols',
                method:'post',
                headers: {
                  Authorization : that.$store.state.token
                },
                data:{
                  symbols:updata
                }
              }).then(function(){
                console.log('新增');
                that.addfirst()
              }).catch(function(err){
                console.log(err);
                console.log('新增错误');
              })
          })
        },
        // 删除
        deleteRow(index) {
          console.log(index);
          var that = this;
          this.$confirm('确认删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
          }).then(() => {
              //点击确定的操作(调用接口)
              var updata=[]
              var j=0
              for (let i = 0; i < that.$data.first.length; i++) {
                if(i == index) i++
                updata[j] =  that.$data.first[i].name;
                j++
              }
              that.$axios({
                url:'/api/user/set/symbols',
                method:'post',
                headers: {
                  Authorization : that.$store.state.token
                },
                data:{
                  symbols:updata
                }
              }).then(function(){
                that.addfirst()
              }).catch(function(err){
                console.log(err);
              })
              
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
        },
        addfirst(){
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
              for (let index = 0; index < res.data.symbols.length; index++) {
              if(index<res.data.symbols.length-1) that.$data.first.push({name:''})
              that.$data.first[index].name=res.data.symbols[index]
              }
          }).catch(function(err){
            console.log(err);
          })
        }
      },
		mounted() {
			this.currentTime()
      // 请求第一个表格的数据
      this.addfirst()
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