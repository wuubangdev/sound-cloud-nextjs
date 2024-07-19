import { Input, Modal, notification } from "antd"
import { useEffect, useState } from "react";
import { IUsers } from "./users.table";


interface IProps {
    access_token: string;
    getData: any;
    setIsUpdateModalOpen: (v: boolean) => void;
    isUpdateModalOpen: boolean;
    dataUpdate: null | IUsers;
    setDataUpdate: (v: null | IUsers) => void;
}

const UpdateUserModel = (props: IProps) => {
    const { access_token, getData,
        dataUpdate, setDataUpdate,
        isUpdateModalOpen, setIsUpdateModalOpen } = props;
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [address, setAddress] = useState("");
    const [role, setRole] = useState("");

    // console.log(dataUpdate);
    useEffect(() => {
        if (dataUpdate) {
            setName(dataUpdate.name);
            setEmail(dataUpdate.email);
            setPassword(dataUpdate.password);
            setAge(dataUpdate.age);
            setGender(dataUpdate.gender);
            setAddress(dataUpdate.address);
            setRole(dataUpdate.role);
        }
    }, [dataUpdate])

    const handleOk = async () => {
        if (dataUpdate) {
            const data = {
                _id: dataUpdate._id, name, email, age, gender, address, role
            }
            const res = await fetch("http://localhost:8000/api/v1/users", {
                method: "PATCH",
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
                    message: "Cap nhat user thanh cong",
                })
                handleCloseCreateModal();
            } else {
                notification.error({
                    message: "Co loi xay ra",
                    description: JSON.stringify(d.message)
                })
            }
        }

    };

    const handleCloseCreateModal = () => {
        setIsUpdateModalOpen(false);
        setName("");
        setEmail("");
        setPassword("");
        setAge("");
        setGender("");
        setAddress("");
        setRole("");
        setDataUpdate(null);
    }
    return (
        <>
            <Modal
                title="Update a user"
                open={isUpdateModalOpen}
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
                        disabled
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

export default UpdateUserModel;