import { Outlet } from "react-router-dom";
import Header from "./header";
import { useEffect } from "react";

const Layout = () => {

    const getData = async () => {

        const res = await fetch("http://localhost:8000/api/v1/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: "admin@gmail.com",
                password: "123456"
            }),
        })
        const d = await res.json();
        if (d.data) {
            localStorage.setItem("access_token", d.data.access_token);
        }

    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <>
            <Header />
            <Outlet />
        </>
    )
}

export default Layout;