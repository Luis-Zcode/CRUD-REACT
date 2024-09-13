import { useContext } from "react"
import { EstudiantesContext } from "../../Context"

const MyModal = ({ tittle, children, cerrarModal, aceptarCambios, textButtonSucces }) => {
    const { isEdit, errorLogin, errores } = useContext(EstudiantesContext)

    return (
        <>

            <div className="d-flex justify-content-center align-items-center"
                style={{
                    zIndex: 1, position: 'fixed', left: 0, top: 0, width: '100%', height: '100%',
                    backgroundColor: 'rgba(34,34,34,0.90)'
                }}>

                <div className=" p-2 bg-info w-50" style={{ zIndex: 1, position: 'absolute' }} >
                    <div className="modal-dialog">
                        <div className="modal-content">

                            <div className="modal-header d-flex justify-content-lg-between">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">{tittle}</h1>
                                <button type="button" className="btn-close" onClick={() => cerrarModal(false)}></button>
                            </div>
                            <div className={errorLogin ? 'alert alert-danger' : 'hidden'} role="alert">
                                <ul>
                                    {
                                        errores.map(error => (
                                            <li key={error}>{error}</li>
                                        ))
                                    }
                                </ul>
                            </div>
                            <div className="modal-body">
                                {children}
                            </div>
                            <div className="modal-footer gap-4">
                                <button type="button" className="btn btn-secondary" onClick={() => cerrarModal(false)}>Cerrar</button>
                                <button type="button"
                                    onClick={aceptarCambios}
                                    // () => isEdit ? updateStudent(id, form) : saveUser() 
                                    className="btn btn-primary"

                                >
                                    {textButtonSucces}
                                    {textButtonSucces ? '' : isEdit ? 'actualizar' : 'crear'}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default MyModal