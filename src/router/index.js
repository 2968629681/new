//当前项目的路由模块
//如果在一个模块化工程中使用它，必须要通过 Vue.use() 明确地安装路由功能
import Vue from 'vue'
//安装好后就会有vue-router
import VueRouter from 'vue-router'
//在当前项目中安装路由
Vue.use(VueRouter)


// 1.创建路由对象
const router = new VueRouter({
    // 2.添加路由配置，通过routes来添加路由配置
    routes: [
        //3.添加具体的路由配置：配置的本质就是将路由映射到组件
        //一般来说，我们可以设置为如下几个选项：name path component redirect children
        // name:路由名称
        //path:路由路径
        //component:路由所映射的组件对象
        {
            name: 'index',
            path: '/index',
            // 异步引入组件，确保匹配了路由才加载组件，否则不利于优化
            component: () => import('@/views/index.vue')
        }

    ]
})
// 4.暴露
export default router
