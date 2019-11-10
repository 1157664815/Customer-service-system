import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
    routes: [{
            path: '/',
            redirect: '/dashboard',
            meta: {
                requireAuth: true,
            }
        },
        {
            path: '/',
            component: () =>
                import ( /* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: '自述文件' },
            children: [{
                    path: '/dashboard',
                    component: () =>
                        import ( /* webpackChunkName: "dashboard" */ '../components/page/Dashboard.vue'),
                    meta: { title: '系统首页' } //修改标签属性
                },
                {
                    path: '/icon',
                    component: () =>
                        import ( /* webpackChunkName: "icon" */ '../components/page/Icon.vue'),
                    meta: { title: '自定义图标' }
                },
                {
                    path: '/table',
                    component: () =>
                        import ( /* webpackChunkName: "table" */ '../components/page/BaseTable.vue'),
                    meta: { title: '基础表格' }
                },
                {
                    path: '/tabs',
                    component: () =>
                        import ( /* webpackChunkName: "tabs" */ '../components/page/Tabs.vue'),
                    meta: { title: 'tab选项卡' }
                },
                {
                    path: '/form',
                    component: () =>
                        import ( /* webpackChunkName: "form" */ '../components/page/BaseForm.vue'),
                    meta: { title: '基本表单' }
                },

                {
                    // markdown组件
                    path: '/markdown',
                    component: () =>
                        import ( /* webpackChunkName: "markdown" */ '../components/page/Markdown.vue'),
                    meta: { title: '客服' }
                },
                {
                    // 图片上传组件
                    path: '/upload',
                    component: () =>
                        import ( /* webpackChunkName: "upload" */ '../components/page/Upload.vue'),
                    meta: { title: '文件上传' }
                },

                {
                    // 拖拽列表组件
                    path: '/drag',
                    component: () =>
                        import ( /* webpackChunkName: "drag" */ '../components/page/DragList.vue'),
                    meta: { title: '拖拽列表' }
                },
                {
                    // 拖拽Dialog组件
                    path: '/dialog',
                    component: () =>
                        import ( /* webpackChunkName: "dragdialog" */ '../components/page/DragDialog.vue'),
                    meta: { title: '拖拽弹框' }
                },

                {
                    // 权限页面
                    path: '/permission',
                    component: () =>
                        import ( /* webpackChunkName: "permission" */ '../components/page/Permission.vue'),
                    meta: { title: '权限测试', permission: true }
                },
                {
                    path: '/404',
                    component: () =>
                        import ( /* webpackChunkName: "404" */ '../components/page/404.vue'),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: () =>
                        import ( /* webpackChunkName: "403" */ '../components/page/403.vue'),
                    meta: { title: '403' }
                },

            ]
        },
        {
            path: '/login',
            component: () =>
                import ( /* webpackChunkName: "login" */ '../components/page/Login.vue')
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});
//路由守卫   to（去向）我们要访问的路由  from（来源）路由从哪里跳转到哪里  next 下一步的选择
router.beforeEach((to, from, next) => {
    if (to.meta.auth) {
        //需要认证，则检查令牌
        if (store.state.token) {
            //已经登录

            next({
                path: '/login',
            });
        } else {
            next({ //跳去登陆
                path: '/login',
                query: { redirect: to.path }
            })
        }
    } else {
        next();
    }
})



export default router;