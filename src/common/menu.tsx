const menu = [
  {
    id: 389,
    parentId: 0,
    name: '管理菜单1',
    route: '/banner',
    icon: 'sliders',
    children: [
      {
        id: 390,
        parentId: 389,
        name: '记账',
        route: '/settlement',
        icon: 'double-right',
        children: [],
        permissionCode: 'test',
        metadata: '{"icon":"double-right"}'
      }
    ],
    permissionCode: 'test',
    metadata: '{"icon":"sliders"}'
  },
  {
    id: 391,
    parentId: 0,
    name: '管理菜单2',
    route: '/menu1',
    icon: 'deployment-unit',
    children: [
      {
        id: 392,
        parentId: 391,
        name: '二级菜单',
        route: '/menu1',
        icon: 'double-right',
        children: [
          {
            id: 392,
            parentId: 391,
            name: '三级菜单',
            route: '/menu3',
            icon: 'double-right',
            children: [],
            permissionCode: 'test',
            metadata: '{"icon":"double-right"}'
          }
        ],
        permissionCode: 'test',
        metadata: '{"icon":"double-right"}'
      }
    ],
    permissionCode: 'test',
    metadata: '{"icon":"deployment-unit"}'
  }
]

export default menu
