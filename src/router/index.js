import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login'),
    hidden: true
  },
  {
    path: '/signup',
    component: () => import('@/views/signup/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '个人中心', icon: 'dashboard' }
    }]
  },
  //信用评价模块的路由
  {
    path: '/credit',
    component: Layout,
    // redirect: '/credit',
    name: 'Credit',
    meta: { title: '信用评价', icon: 'el-icon-s-marketing' },
    children: [
      {
        path: 'creditInquiry',
        name: 'CreditInquiry',
        component: () => import('@/views/credit/creditInquiry/index'),
        meta: { title: '信用查询', icon: 'el-icon-search' }
      },
      {
        path: 'evaluaCriteria',
        name: 'EvaluaCriteria',
        component: () => import('@/views/credit/evaluaCriteria/index'),
        meta: { title: '评价标准', icon: 'el-icon-postcard' }
      },
      {
        path: 'confirmationSubmit',
        name: 'ConfirmationSubmit',
        component: () => import('@/views/credit/confirmationSubmit/index'),
        meta: { title: '提交证明', icon: 'el-icon-upload2' }
      },
      {
        path: 'creditRepair',
        name: 'CreditRepair',
        component: () => import('@/views/credit/creditRepair/index'),
        meta: { title: '信用修复', icon: 'el-icon-circle-plus-outline' }
      },
      {
        path: 'creditGrading',
        name: 'CreditGrading',
        component: () => import('@/views/credit/creditGrading/index'),
        meta: { title: '评价打分', icon: 'el-icon-s-order' }
      }
    ]
  },

  //容缺办理模块的路由
  {
    path: '/rongque',
    component: Layout,
    // redirect: '/credit',
    name: 'Rongque',
    meta: { title: '容缺办理', icon: 'el-icon-notebook-2' },
    children: [
      {
        path: 'progressInquiry',
        name: 'ProgressInquiry',
        component: () => import('@/views/rongque/progressInquiry/index'),
        meta: { title: '进度查询', icon: 'el-icon-search' }
      },
      {
        path: 'approvalApply',
        name: 'ApprovalApply',
        component: () => import('@/views/rongque/approvalApply/index'),
        meta: { title: '申请办理', icon: 'el-icon-edit-outline' }
      },
      {
        path: 'materialSubmit',
        name: 'MaterialSubmit',
        component: () => import('@/views/rongque/materialSubmit/index'),
        meta: { title: '提交材料', icon: 'el-icon-document-add' }
      },
      {
        path: 'materialAudit',
        name: 'MaterialAudit',
        component: () => import('@/views/rongque/materialAudit/index'),
        meta: { title: '材料审核', icon: 'el-icon-s-check' }
      }
    ]
  },
  //奖惩机制路由
  {
    path: '/rewardandpunish',
    component: Layout,
    // redirect: '/credit',
    name: 'Rewardandpunish',
    meta: { title: '奖惩机制', icon: 'el-icon-set-up' },
    children: [
      
      {
        path: 'blackListManage',
        name: 'BlackListManage',
        component: () => import('@/views/rewardandpunish/blackListManage/index'),
        meta: { title: '黑名单管理', icon: 'el-icon-postcard' }
      },
      {
        path: 'priorityManage',
        name: 'PriorityManage',
        component: () => import('@/views/rewardandpunish/priorityManage/index'),
        meta: { title: '优先级管理', icon: 'el-icon-postcard' }
      },
      
    ]
  },

  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: 'Example', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: 'Table', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: 'Tree', icon: 'tree' }
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  },

  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: 'Nested',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        name: 'Menu2',
        meta: { title: 'menu2' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
