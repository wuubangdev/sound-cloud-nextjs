import { Input, Modal, notification, Form, FormProps, InputNumber, Select } from "antd";

interface IProps {
    access_token: string;
    getData: any;
    setIsCreateModalOpen: (v: boolean) => void;
    isCreateModalOpen: boolean;
}

const CreateUserModel = (props: IProps) => {
    const { access_token, getData,
        isCreateModalOpen, setIsCreateModalOpen } = props;
    const [form] = Form.useForm();

    const handleCloseCreateModal = () => {
        setIsCreateModalOpen(false);
    }

    const onFinish: FormProps['onFinish'] = async (values) => {
        console.log('Success:', values);
        const res = await fetch("http://localhost:8000/api/v1/users", {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${access_token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...values })
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
    return (
        <>
            <Modal
                title="Create new user"
                open={isCreateModalOpen}
                onOk={() => form.submit()}
                onCancel={() => { handleCloseCreateModal() }}
                maskClosable={false}
            >
                <Form
                    form={form}
                    name="basic"
                    layout="vertical"
                    onFinish={onFinish}
                >
                    <Form.Item
                        style={{ marginBottom: 5 }}
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input your name!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        style={{ marginBottom: 5 }}
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please input your email!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        style={{ marginBottom: 5 }}
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        style={{ marginBottom: 5 }}
                        label="Age"
                        name="age"
                        rules={[{ required: true, message: 'Please input your age!' }]}
                    >
                        <InputNumber style={{ width: "100%" }} />
                    </Form.Item>
                    <Form.Item
                        style={{ marginBottom: 5 }}
                        label="Address"
                        name="address"
                        rules={[{ required: true, message: 'Please input your address!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Gender"
                        name={"gender"}
                        style={{ marginBottom: 5 }}
                        rules={[{ required: true, message: 'Please input your gender!' }]}
                    >
                        <Select>
                            <Select.Option value="male">Male</Select.Option>
                            <Select.Option value="female">Female</Select.Option>
                            <Select.Option value="other">Other</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Role"
                        name={"role"}
                        style={{ marginBottom: 5 }}
                        rules={[{ required: true, message: 'Please input your role!' }]}
                    >
                        <Select>
                            <Select.Option value="ADMIN">ADMIN</Select.Option>
                            <Select.Option value="USER">USER</Select.Option>
                            <Select.Option value="OTHER">OTHER</Select.Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default CreateUserModel;