const routes = [
  {
    path: '/dashboard',
    component: () => import('layouts/Dashboard.vue'),

    children: [
      {
        path: '',
        name: 'dashboard',
        component: () => import('pages/dashboard/Overview.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'suppliers',
        name: 'dashboard.suppliers',
        component: () => import('pages/dashboard/suppliers/Suppliers.vue'),
        meta: {requiresAuth: true}
      },
      {
        path: 'supplier/:id',
        name: 'dashboard.supplier',
        component: () => import('pages/dashboard/suppliers/Supplier.vue'),
        meta: {requiresAuth: true}
      },
      {
        path: 'all-products',
        name: 'dashboard.all-products',
        component: () => import('pages/dashboard/products/Products.vue'),
        meta: {requiresAuth: true}
      }
      ,{
        path: 'orders',
        name: 'dashboard.orders',
        component: () => import('pages/dashboard/orders/Orders.vue'),
        meta: {requiresAuth: true}
      },
    ]
  },

  {
    path: '',
    component: () => import('layouts/Auth.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/Auth/Login.vue'),
        meta: {guest: true}
      }
    ]
  },

  {
    path: '/auth',
    component: () => import('layouts/Auth.vue'),
    children: [
      {
        path: '',
        name: 'auth.landing',
        component: () => import('pages/Auth/Login.vue'),
        meta: {guest: true}
      },
      {
        path: 'register',
        name: 'auth.register',
        component: () => import('pages/Auth/Register.vue'),
        meta: {guest: true}
      },
      {
        path: 'login',
        name: 'auth.login',
        component: () => import('pages/Auth/Login.vue'),
        meta: {guest: true}
      }
    ]
  }
]


if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
