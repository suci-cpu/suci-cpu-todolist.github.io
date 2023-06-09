// 该文件专门用于创建整个应用的路由器
import VueRouter from 'vue-router'
//引入组件
import LoginRegister from '../components/pages/LoginRegister.vue'
import BackUp from '../components/pages/BackUp.vue'
import DataStatistic from '../components/pages/JavaFXDataStatisticMenu.vue'
import TaskRanking from '../components/pages/TaskRanking.vue'
import UserCenter from '../components/pages/UserCenter.vue'
import TodoList from '../components/pages/TodoList.vue'
import JavaFXUseDataStatistic from "@/components/views/datastatistic/JavaFXUseDataStatistic";
import JavaFXFuturePlan from "@/components/views/datastatistic/JavaFXFuturePlan";
import WordReciteSituation from "@/components/views/datastatistic/WordReciteSituation";
import WordMap from "@/components/views/datastatistic/WordMap";

//创建并暴露一个路由器
const router = new VueRouter({
    routes: [
        {
            name: 'loginPage',
            path: '/loginRegister',
            component: LoginRegister,
            meta: {title: '登录注册'}
        },
        {
            path: '/backUp',
            component: BackUp,
            meta: {
                title: '备份还原',
                isAuth: true
            }
        },
        {
            path: '/dataStatistic',
            component: DataStatistic,
            meta: {
                title: '数据统计',
                isAuth: true
            }
        },
        {
            path: '/taskRanking',
            component: TaskRanking,
            meta: {
                title: '个人排名',
                isAuth: true
            }
        },
        {
            path: '/userCenter',
            component: UserCenter,
            meta: {
                title: '个人中心',
                isAuth: true
            }
        },
        {
            path: '/todoList',
            component: TodoList,
            meta: {
                title: '待办事项',
                isAuth: true
            }
        },
        {
            name: 'javaFXUseDataStatisticPage',
            path: '/javaFXUseDataStatistic',
            component: JavaFXUseDataStatistic,
            meta: {
                title: '本地端使用数据统计',
                isAuth: true
            }
        },
        {
            name: 'javaFXFuturePlan',
            path: '/javaFXFuturePlan',
            component: JavaFXFuturePlan,
            meta: {
                title: '本地端未来规划',
                isAuth: true
            }
        },
        {
            name: 'wordReciteSituation',
            path: '/wordReciteSituation',
            component: WordReciteSituation,
            meta: {
                title: '单词背诵情况',
                isAuth: true
            }
        },
        {
            name: 'wordMap',
            path: '/wordMap',
            component: WordMap,
            meta: {
                title: '世界地图',
                isAuth: true
            }
        },
    ]
})

//全局前置守卫：初始化时执行、每次路由切换前执行
router.beforeEach((to, from, next) => {
    if (to.meta.isAuth) { //判断当前路由是否需要进行权限控制
        if (sessionStorage.getItem('user') !== null) { //权限控制的具体规则
            next() //放行
        } else {
            next({name: 'loginPage'})//跳转到登录page
        }
    } else {
        next() //放行
    }
})

//全局后置守卫：初始化时执行、每次路由切换后执行
router.afterEach((to, from) => {
    console.log('全局后置守卫', to, from)
    document.title = to.meta.title || '考研计划管理系统'
})

export default router