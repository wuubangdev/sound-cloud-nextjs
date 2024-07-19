import { useEffect, useState } from "react";
import { Table, Button, notification, Popconfirm } from 'antd';
import type { TableProps } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import CreateUserModel from "./create.user.model";
import UpdateUserModel from "./update.user.model";
export interface IUsers {
    _id: string;
    email: string;
    name: string;
    password: string;
    age: string;
    gender: string;
    address: string;
    role: string
}

const UserTable = () => {
    const [listUsers, setListUsers] = useState([]);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [dataUpdate, setDataUpdate] = useState<null | IUsers>(null);

    const access_token = localStorage.getItem("access_token") as string;

    const [meta, setMeta] = useState({
        current: 1,
        pageSize: 3,
        pages: 0,
        total: 0
    })

    useEffect(() => {
        getData();
    }, [])

    const getData = async () => {

        const res = await fetch(`http://localhost:8000/api/v1/users?current=${meta.current}&pageSize=${meta.pageSize}`, {
            headers: {
                'Authorization': `Bearer ${access_token}`,
                "Content-Type": "application/json",
            }
        })
        const d = await res.json();
        if (!d.data) {
            notification.error({
                message: JSON.stringify(d.message),
            })
        }
        setListUsers(d.data.result);
        setMeta({
            current: d.data.meta.current,
            pageSize: d.data.meta.pageSize,
            pages: d.data.meta.pages,
            total: d.data.meta.total,
        })

    }
    const columns: TableProps<IUsers>['columns'] = [
        {
            title: 'Email',
            dataIndex: 'email',
            render: (value) => {
                return (
                    <a>{value}</a>
                )
            },
        },
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Role',
            dataIndex: 'role',
        },
        {
            title: 'Actions',
            render: (value, record) => {
                return (
                    <div style={{ display: "flex", gap: 5 }}>
                        <Button
                            type="primary"
                        >
                            Show
                        </Button>
                        <Button
                            type="primary"
                            onClick={() => {
                                setDataUpdate(record);
                                setIsUpdateModalOpen(true);
                            }}
                        >
                            Update
                        </Button>
                        <Popconfirm
                            title={`Delete the user`}
                            description={`Are you sure to delete: ${record.name} ?`}
                            onConfirm={() => confirm(record)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button
                                danger
                            >
                                Delete
                            </Button>
                        </Popconfirm>

                    </div>
                )
            },
        },
    ]

    const confirm = async (user: IUsers) => {
        const res = await fetch(`http://localhost:8000/api/v1/users/${user._id}`, {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${access_token}`,
                "Content-Type": "application/json",
            }
        })
        const d = await res.json();
        if (d.data) {
            notification.success({
                message: "Xoa user thanh cong",
            })
            await getData();
        } else {
            notification.error({
                message: JSON.stringify(d.message),
            })
        }
    };

    const handleOnChange = (page: number, pageSize: number) => {
        console.log(page, pageSize);
    }
    return (
        <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h2>Table Users</h2>
                <Button
                    type="primary"
                    icon={<PlusCircleOutlined />}
                    onClick={() => { setIsCreateModalOpen(true) }}
                >Add new user
                </Button>
            </div>
            <Table
                columns={columns}
                dataSource={listUsers}
                rowKey={"_id"}
                pagination={{
                    current: meta.current,
                    pageSize: meta.pageSize,
                    total: meta.total,
                    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                    onChange: (page, pageSize) => handleOnChange(page, pageSize)
                }}
            />
            <CreateUserModel
                access_token={access_token}
                getData={getData}
                isCreateModalOpen={isCreateModalOpen}
                setIsCreateModalOpen={setIsCreateModalOpen}
            />
            <UpdateUserModel
                access_token={access_token}
                getData={getData}
                isUpdateModalOpen={isUpdateModalOpen}
                setIsUpdateModalOpen={setIsUpdateModalOpen}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
            />
        </>
    )
}

export default UserTable;