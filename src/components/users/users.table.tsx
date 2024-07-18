import { useEffect, useState } from "react";
import { Table, Button } from 'antd';
import type { TableProps } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import CreateUserModel from "./create.user.model";
import UpdateUserModel from "./update.user.model";
interface IUsers {
    _id: string;
    email: string;
    name: string;
    role: string
}

const UserTable = () => {
    const [listUsers, setListUsers] = useState([]);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

    const access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0b2tlbiBsb2dpbiIsImlzcyI6ImZyb20gc2VydmVyIiwiX2lkIjoiNjY5NjU3ZWUyNmI5YzVhZjk2NWIyNmIzIiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJhZGRyZXNzIjoiVmlldE5hbSIsImlzVmVyaWZ5Ijp0cnVlLCJuYW1lIjoiSSdtIGFkbWluIiwidHlwZSI6IlNZU1RFTSIsInJvbGUiOiJBRE1JTiIsImdlbmRlciI6Ik1BTEUiLCJhZ2UiOjY5LCJpYXQiOjE3MjEyNjY2NzUsImV4cCI6MTgwNzY2NjY3NX0.XLFr2meUIgTOLvHgX3Vn8U4WY3BPpianqqmxghavLHk"

    useEffect(() => {
        console.log("check user effect");
        getData();
    }, [])

    const getData = async () => {

        const res = await fetch("http://localhost:8000/api/v1/users/all", {
            headers: {
                'Authorization': `Bearer ${access_token}`,
                "Content-Type": "application/json",
            }
        })
        const d = await res.json();
        setListUsers(d.data.result);

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
                                setIsUpdateModalOpen(true);
                            }}
                        >
                            Update
                        </Button>
                        <Button
                            type="primary"
                        >
                            Delete
                        </Button>
                    </div>
                )
            },
        },
    ]
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
            />
        </>
    )
}

export default UserTable;