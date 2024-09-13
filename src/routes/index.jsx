import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "../components/Login"
import Layout from "../components/Layout"
import { EstudiantesProvider } from "../Context"

const Router = () => {
    return (
        <BrowserRouter>
            <EstudiantesProvider>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/*" element={<Layout />} />
                </Routes>
            </EstudiantesProvider>
        </BrowserRouter>
    )
}

export default Router