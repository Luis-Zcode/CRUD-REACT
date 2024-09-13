import axios from "axios";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const EstudiantesContext = createContext()

export const EstudiantesProvider = ({ children }) => {
    const [estudiantes, setEstudiantes] = useState([])
    const [isEdit, setIsEdit] = useState(false)
    const [id, setId] = useState(null)
    const [searchStudent, setSearchStudent] = useState('')
    const navigate = useNavigate()
    const [errorLogin, setErrorLogin] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [succesCreateUser, setSuccesCreateUser] = useState(false)
    const [updateUser, setUpdateUser] = useState(false)
    const [modalEliminar, setModalEliminar] = useState(false)
    const [errores, setErrores] = useState([])
    const [users, setUsers] = useState([])

    const [form, setForm] = useState(
        { name: '', email: '', password: '', avatar: '' }
    )

    const handleForm = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const [itemsBypage, setItemsBypage] = useState(10)

    const ObtenerUsers = async () => {
        const response = await axios.get(`https://api.escuelajs.co/api/v1/users`)
        setUsers(response.data)
        setEstudiantes(response.data.slice(0, itemsBypage))
    }

    const next = () => {
        setEstudiantes(users.slice(itemsBypage, itemsBypage +10))
        setItemsBypage(itemsBypage + 10)
        
    }

    const back = () => {
        setEstudiantes(users.slice(itemsBypage-20, itemsBypage - 10))
        setItemsBypage(itemsBypage - 10)
    }

    const handleEdit = async (id) => {
        setErrores([])
        const response = await axios.get(`https://api.escuelajs.co/api/v1/users/${id}`)
        setErrorLogin(false)
        setIsModalOpen(true)
        setForm(response.data)
        setIsEdit(true)
        setId(id)
    }

    const updateStudent = async (id, data) => {
        try {
            await axios.put(`https://api.escuelajs.co/api/v1/users/${id}`, data)
            setIsModalOpen(false)
            setErrores([])
            setUpdateUser(true)
            setSuccesCreateUser(false)
            setErrorLogin(false)
        } catch (err) {
            if (err.status != 400) {
                setErrores(['ocurrio un error en el servidor, intenta de nuevo'])
                setErrorLogin(true)
            } else {
                setErrores(err.response.data.message)
                setErrorLogin(true)
            }
        }
    }

    const saveUser = async () => {
        try {
            if (isEdit) {
                try {
                    await axios.put(`https://api.escuelajs.co/api/v1/users/${id}`, form)
                    setIsModalOpen(false)
                    setErrores([])
                    setUpdateUser(true)
                    setSuccesCreateUser(false)
                    setErrorLogin(false)
                } catch (err) {
                    if (err.status != 400) {
                        setErrores(['ocurrio un error en el servidor, intenta de nuevo'])
                        setErrorLogin(true)
                    } else {
                        setErrores(err.response.data.message)
                        setErrorLogin(true)
                    }
                }
            } else {
                await axios.post('https://api.escuelajs.co/api/v1/users/', form)
                setSuccesCreateUser(true)
                setIsModalOpen(false)
                setUpdateUser(false)
                setErrorLogin(false)
                setErrores([])
            }

        } catch (err) {
            setSuccesCreateUser(false)
            setIsModalOpen(true)
            setErrorLogin(true)
            setErrores(err.response.data.message)
        }
    }

    const resetForm = () => {
        setIsModalOpen(true)
        setIsEdit(false)
        setErrorLogin(false)
        setErrores([])
        setForm({ name: '', email: '', password: '', avatar: '' })
    }

    const handleDelete = (id) => {
        setModalEliminar(true)
        setErrorLogin(false)
        setErrores([])
        setId(id)
    }

    const deleteUser = async () => {
        try {
            await axios.delete(`https://api.escuelajs.co/api/v1/users/${id}`)
            setId(null)
            setModalEliminar(false)
        } catch (err) {
            setId(null)
            setErrorLogin(true)
            setErrores([err.response.data.message])
        }
    }

    const login = async (event, email, password) => {
        event.preventDefault()
        try {
            const user = await axios.post('https://api.escuelajs.co/api/v1/auth/login',
                { email, password });

            if (user.status == 201) {
                navigate('/estudiantes')
                localStorage.setItem('user', JSON.stringify(user.data))
            }
        } catch (error) {
            setErrorLogin(true)
        }
    }

    return (
        <EstudiantesContext.Provider value={{
            form,
            handleForm,
            saveUser,
            estudiantes,
            setEstudiantes,
            handleEdit,
            resetForm,
            updateStudent,
            isEdit,
            id,
            handleDelete,
            searchStudent,
            setSearchStudent,
            login,
            errorLogin,
            ObtenerUsers,
            succesCreateUser,
            isModalOpen,
            errores,
            setIsModalOpen,
            updateUser,
            setModalEliminar,
            modalEliminar,
            deleteUser,
            setErrorLogin,
            next,
            back,
            users
        }} >
            {children}
        </EstudiantesContext.Provider>
    )
}