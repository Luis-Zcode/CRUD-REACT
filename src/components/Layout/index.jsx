import { Route, Routes } from "react-router-dom";
import Navbar from "../Navbar";
import Estudiantes from "../Estudiantes";
import Materias from "../Materias";
import Auth from "../Auth";

const Layout = () => {
    return (
        <>
            <Auth>
                <Navbar />
                <div className="container">
                    <Routes>
                        <Route path="/estudiantes" element={<Estudiantes />} />
                        <Route path="/materias" element={<Materias />} />
                    </Routes>
                </div>
            </Auth>

        </>
    )
}

export default Layout