import { Input, Modal, notification } from "antd"
import { useState } from "react";


interface IProps {
    access_token: string;
    getData: any;
    setIsCreateModalOpen: (v: boolean) => void;
    isCreateModalOpen: boolean;
}

const CreateUserModel = (props: IProps) => {
    const { access_token, getData,
        isCreateModalOpen, setIsCreateModalOpen } = props;
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [address, setAddress] = useState("");
    const [role, setRole] = useState("");

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
    };


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

export default CreateUserModel;