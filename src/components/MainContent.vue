<template>
<div>
  <div style="height:400px;display: flex">
    <div>
      <el-table
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

      <!-- 两个表格直接的间隔 -->
      <div style="width:5%"></div>
    
      <!-- 搜索框 -->
      <div height="100%" style="width: 50%;margin-right: -22%;">
        <div height="10%" style="margin-bottom: -20px;">
          <el-form :inline="true" :model="search" class="demo-form-inline">
            <el-form-item label="" style="width:15%">
              <el-input v-model="search.interval" placeholder="间隔"></el-input>
            </el-form-item>
            <el-form-item label="" style="width:15%">
              <el-input v-model="search.amplitue" placeholder="振幅"></el-input>
            </el-form-item>
            <el-form-item label="" style="width:15%">
              <el-input v-model="search.amplituePercentage" placeholder="振幅百分比"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
          </el-form>
        </div>

        <el-table
          @row-dblclick="double"
          :data="second"
          height="90%"
          border
          style="width: 58%">
          <el-table-column
            prop="Symbol"
            label="交易对名称"
            width="217">
          </el-table-column>
          <el-table-column
            prop="Klines.length"
            label="出现的次数"
            width="217">
          </el-table-column>
        </el-table>
      </div>

      <!-- 双击之后显示的详情 -->
    <el-dialog :title="doublename" :visible.sync="doubleVisible" width="83%" center>
      <el-table :data="show" stripe>
        <el-table-column prop="High" label="最高价" width="200"></el-table-column>
        <el-table-column prop="Low" label="最低价" width="200"></el-table-column>
        <el-table-column prop="Open" label="开盘价" width="200"></el-table-column>
        <el-table-column prop="Close" label="收盘价" width="200"></el-table-column>
        <el-table-column prop="amplitue" label="振幅百分比" width="200"></el-table-column>
        <el-table-column prop="OpenTime" label="时间(单位毫秒)" width="200"></el-table-column>
      </el-table>
    </el-dialog>
      
      <!-- 两个表格直接的间隔 -->
      <div style="width:5%"></div>

      <el-table
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
          show:[{}],                                              //双击之后显示的数组
          doublename:'',                                          //双击之后表格的名称
          search:{
            interval:null,
            amplitue:null,
            amplituePercentage:null,
          },                                                      //搜索的参数
          doubleVisible:false,                                    //双击之后显示的表单
          delete:false,                                           //判断是否在进行删除操作，方便更改第一个表格中的数组
          increase:false,                                         //判断是否在进行新增操作，方便更改第一个表格中的数组
          formLabelWidth: '120px',                                //点击新增的弹出的表单的大小
          dialogFormVisible: false,                               //是否显示新增表单
          trade:{name:''},                                        //表单中的数据
          first:[{name:''}],                                      //第一个表格
          second:[{}],                                            //第二个表格
          third:[{}],                                             //第三个表格
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
          this.$data.increase=true
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
              var updata=[]
              for (let index = 0; index < that.$data.first.length; index++) {
                updata[index] =  that.$data.first[index].name;
              }
              updata.push(that.$data.trade.name)
              console.log(updata);
              that.$data.trade.name=''
              that.$axios({
                url:'/api/symbols/set',
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
          this.$data.delete=true
          var that = this;
          this.$confirm('确认删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
          }).then(() => {
              //点击确定的操作(调用接口)
              console.log('删除');
              var updata=[]
              var j=0
              if(that.$data.first.length==index+1){
                for (let i = 0; i < that.$data.first.length-1; i++) {
                updata[i] = that.$data.first[i].name;
                }
              }
              else for (let i = 0; i < that.$data.first.length; i++) {
                if(i == index) i++
                updata[j] = that.$data.first[i].name;
                j++
              }
              that.$axios({
                url:'/api/symbols/set',
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
          this.$axios({
                url:'/api/symbols/get',
                method:'post',
                headers: {
                  Authorization : this.$store.state.token
                }
            }).then(function(res){
              if(that.$data.increase){
                that.$data.first.push({name:''})
                for (let index = 0; index < res.data.symbols.length; index++) {
                  that.$data.first[index].name=res.data.symbols[index]
                }
                that.$data.increase=false
              }
              else if(that.$data.delete){
                that.$data.first.pop()
                for (let index = 0; index < res.data.symbols.length; index++) {
                  that.$data.first[index].name=res.data.symbols[index]
                }
              }
              else for (let index = 0; index < res.data.symbols.length; index++) {
                if(index<res.data.symbols.length-1) that.$data.first.push({name:''})
                that.$data.first[index].name=res.data.symbols[index]
              }
          }).catch(function(err){
            console.log(err);
          })
        },
        // 搜索
        onSubmit(){
          // 参数全部输入后才可以查询
          if(this.$data.search.interval==null || this.$data.search.amplitue==null || this.$data.search.amplituePercentage==null){
            this.$message({
            message: '警告，请将全部参数都输入再进行搜索',
            type: 'warning'
            });
            return
          }
          this.$data.second=[{}]
          var interval=this.$data.search.interval
          var amplitue=this.$data.search.amplitue/100
          var amplituePercentage=this.$data.search.amplituePercentage/100
          var that=this
          this.$axios({
                url:'/api/symbols/search',
                method:'post',
                headers: {
                  Authorization : this.$store.state.token
                },
                data:{
                  interval: interval,
                  amplitue: amplitue,
                  amplituePercentage: amplituePercentage,
                }
            }).then(function(res){
              console.log(res.data);
              that.$data.second=res.data.res
              for (let index = 0; index < that.$data.second.length; index++) {
                for (let aindex = index+1; aindex < that.$data.second.length; aindex++) {
                  if (that.$data.second[aindex].Klines.length > that.$data.second[index].Klines.length) {
                    var s=that.$data.second[aindex].Klines
                    that.$data.second[aindex].Klines=that.$data.second[index].Klines
                    that.$data.second[index].Klines=s
                  }         
                }   
              }
              console.log(that.$data.second);
            }).catch(function(err){
              console.log(err);
            })
        },
        sortFun() {
          this.$data.show.sort((a, b) => {
            return b.OpenTime - a.OpenTime;
          });      
        },
        double(row){
          console.log(row);
          this.$data.show=[{}]
          this.$data.doubleVisible=true
          this.$data.doublename=row.Symbol
          this.$data.show=row.Klines
          this.sortFun()
          for (let index = 0; index < this.$data.show.length; index++) {
            this.$data.show[index].amplitue=(this.$data.show[index].High-this.$data.show[index].Low)/this.$data.show[index].Close*100
            let tempVal = parseFloat(this.$data.show[index].amplitue).toFixed(3)
            this.$data.show[index].amplitue=tempVal
            this.$data.show[index].OpenTime=this.$moment(this.$data.show[index].OpenTime).format('YYYY-MM-DD HH:mm:ss')
          }
        },   
      },
		mounted() {
      // 判断是否登入
      if(this.$store.state.token == '') this.$router.replace({name:'login'})
      // 开启心跳
			this.currentTime()
      // 请求第一个表格的数据
      this.addfirst()
		},
		// 销毁定时器
		beforeDestroy() {
			if (this.formatDate) {
				clearInterval(this.formatDate); // 在Vue实例销毁前，清除时间定时器
			}
		},
}
</script>

<style>

</style>