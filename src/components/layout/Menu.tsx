import React, { useState } from 'react'
import { Menu } from 'antd';
import { Link } from 'react-router-dom'
import _menuList from '../../common/menu'
import '@css/common/footer.scss';
const { SubMenu } = Menu

const MyMenu = (props: any) => {
  const [collapsed, setCollapsed] = useState(false)
  const [menuList, setMenuList] = useState(_menuList)
  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
  }
  const iteratorMenu = item => {
    return (
      <Menu.Item key={item.id}>
        <span>
          <Link to={item.route} className='linkitem'>
            {item.name}
          </Link>
        </span>
      </Menu.Item>
    )
  }
  const renderMenu = list => {
    return list.map(item => {
      if (item.children.length > 0) {
        return (
          <SubMenu title={item.name} key={item.id}>
            {renderMenu(item.children)}
          </SubMenu>
        )
      }
      return (
        <Menu.Item title={item.title} key={item.id}>
          <Link to={item.route}>{item.name}</Link>
        </Menu.Item>
      )
    })
  }

  return (
    <div style={{ width: '10%', background: '#001529' }}>
      {menuList.length > 0 ? (
        <Menu defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']} mode='inline' theme='dark' inlineCollapsed={collapsed}>
          {renderMenu(menuList)}
        </Menu>
      ) : (
        <Menu defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']} mode='inline' theme='dark' inlineCollapsed={collapsed}>
          <Menu.Item key='1'>
            <span>首页</span>
          </Menu.Item>
        </Menu>
      )}
    </div>
  )
}

export default MyMenu
