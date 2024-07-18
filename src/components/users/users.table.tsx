import { useEffect, useState } from "react";
import { Table, Button, Modal, Input, notification } from 'antd';
import type { TableProps } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
interface IUsers {
    _id: string;
    email: string;
    name: string;
    role: string
}

const UserTable = () => {
    const [listUsers, setListUsers] = useState([]);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [address, setAddress] = useState("");
    const [role, setRole] = useState("");
    const access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0b2tlbiBsb2dpbiIsImlzcyI6ImZyb20gc2VydmVyIiwiX2lkIjoiNjY5NjU3ZWUyNmI5YzVhZjk2NWIyNmIzIiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJhZGRyZXNzIjoiVmlldE5hbSIsImlzVmVyaWZ5Ijp0cnVlLCJuYW1lIjoiSSdtIGFkbWluIiwidHlwZSI6IlNZU1RFTSIsInJvbGUiOiJBRE1JTiIsImdlbmRlciI6Ik1BTEUiLCJhZ2UiOjY5LCJpYXQiOjE3MjEyNjY2NzUsImV4cCI6MTgwNzY2NjY3NX0.XLFr2meUIgTOLvHgX3Vn8U4WY3BPpianqqmxghavLHk"

    useEffect(() => {
        console.log("check user effect");
        getData();
    }, [])

    const handleOk = async () => {
        const data = {
            name, email, password, age, gender, address, role
        }
        const res = await fetch("http://localhost:8000/api/v1/users", {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${access_token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...data })
        })
        const d = await res.json();
        if (d.data) {
            await getData();
            notification.success({
                message: "Tao moi user thanh cong",
            })
            handleCloseCreateModal();
        } else {
            notification.error({
                message: "Co loi xay ra",
                description: JSON.stringify(d.message)
            })
        }
        console.log(">>>check d: ", d)
    };


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
    ]
    const handleCloseCreateModal = () => {
        setIsCreateModalOpen(false);
        setName("");
        setEmail("");
        setPassword("");
        setAge("");
        setGender("");
        setAddress("");
        setRole("");
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
            />
            <Modal
                title="Create new user"
                open={isCreateModalOpen}
                onOk={handleOk}
                onCancel={() => { handleCloseCreateModal() }}
                maskClosable={false}
            >
                <div>
                    <label>Name</label>
                    <Input
                        value={name}
                        onChange={(e) => { setName(e.target.value) }}
                        placeholder="Basic usage"
                    />
                </div>
                <div>
                    <label>Email</label>
                    <Input
                        value={email}
                        onChange={(e) => { setEmail(e.target.value) }}
                        placeholder="Basic usage"
                    />
                </div>
                <div>
                    <label>Password</label>
                    <Input
                        value={password}
                        onChange={(e) => { setPassword(e.target.value) }}
                        placeholder="Basic usage"
                    />
                </div>
                <div>
                    <label>Age</label>
                    <Input
                        value={age}
                        onChange={(e) => { setAge(e.target.value) }}
                        placeholder="Basic usage"
                    />
                </div>
                <div>
                    <label>Gender</label>
                    <Input
                        value={gender}
                        onChange={(e) => { setGender(e.target.value) }}
                        placeholder="Basic usage"
                    />
                </div>
                <div>
                    <label>Address</label>
                    <Input
                        value={address}
                        onChange={(e) => { setAddress(e.target.value) }}
                        placeholder="Basic usage"
                    />
                </div>
                <div>
                    <label>Role</label>
                    <Input
                        value={role}
                        onChange={(e) => { setRole(e.target.value) }}
                        placeholder="Basic usage"
                    />
                </div>
            </Modal>
        </>
    )
}

export default UserTable;