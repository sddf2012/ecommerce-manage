import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/layout/Layout'
import menus from '@/config/menuConfig'

Vue.use(Router)

const getComponent = (name, detail, component) => () => import(`@/views/${name}/${detail}/${component}.vue`)

const myRoutes = [
  {
    path: '/',
    name: '首页',
    component: Layout
  }
]

// configMenu中的菜单
function childRoute (name, path, directory, component) {
  return {
    name: name,
    path: path,
    component: getComponent(directory, component, component)
  }
}

menus.forEach(menu => {
  let childs = []
  if (menu.sub != null) {
    menu.sub.forEach(subMenu => {
      childs.push(childRoute(subMenu.name, subMenu.index, menu.index, subMenu.index))
    })
  }

  let route = {
    path: `/${menu.index}`,
    name: menu.name,
    component: Layout,
    children: childs
  }
  myRoutes.push(route)
})

const myRouter = new Router({
  routes: myRoutes
})

export default myRouter
