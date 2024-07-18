import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
    {
        label: <Link to={'/'} >Home</Link>,
        key: 'home',
        icon: <HomeOutlined />,
    },
    {
        label: <Link to={'/users'} >Manage Users</Link>,
        key: 'users',
        icon: <UserOutlined />,
    },
];
const Header = () => {
    const [current, setCurrent] = useState('home');
    const onClick: MenuProps['onClick'] = (e) => {
        setCurrent(e.key);
    };
    return (
        <>
            <Menu
                onClick={onClick}
                selectedKeys={[current]}
                mode="horizontal"
                items={items}
            />
        </>
    )
}

export default Header;