import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { EstudiantesContext } from "../../Context"

const Login = () => {
    const { login, errorLogin } = useContext(EstudiantesContext)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem('user'))
    useEffect(() => { 
        if (user) {
            navigate('/estudiantes')
        }
    }, [])
    return (
        <>
            {
                user && <p>Loading</p>
            }
            {
                !user && <div className="bg-ligth mt-4 py-3 py-md-5">
                    <div className="container">
                        <div className="row justify-content-md-center">
                            <div className="col-12 col-md-11 col-lg-8 col-xl-7 col-xxl-6">
                                <div className="bg-white p-4 p-md-5 rounded shadow-sm">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="mb-5">
                                                <h3>Log in</h3>
                                            </div>
                                            {(errorLogin &&
                                                <div className="alert alert-danger" role="alert">
                                                    Usuario o contrasenia incorrecta
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <form >
                                        <div className="row gy-3 gy-md-4 overflow-hidden">
                                            <div className="col-12">
                                                <label className="form-label">Email <span className="text-danger">*</span></label>
                                                <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" className="form-control" name="email" id="email" placeholder="name@example.com" />
                                            </div>
                                            <div className="col-12">
                                                <label className="form-label">Password <span className="text-danger">*</span></label>
                                                <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="****" className="form-control" name="password" id="password" />
                                            </div>
                                            <div className="col-12">
                                                <div className="d-grid">
                                                    <button type="submit" onClick={(event) => login(event, email, password)} className="btn btn-lg btn-primary" >Log in now</button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }

        </>
    )
}

export default Login