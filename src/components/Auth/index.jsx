import { Navigate } from "react-router-dom";
const Auth = ({ children }) => {
    const user = JSON.parse(localStorage.getItem('user'))
    return (
        <>
            {user ? children : <Navigate to={'/'} />}
        </>

    )
}

export default Auth;