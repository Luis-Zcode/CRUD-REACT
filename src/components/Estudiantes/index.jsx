import { useContext, useEffect } from 'react'
import MyModal from '../MyModal'
import { EstudiantesContext } from '../../Context'


function Estudiantes() {

    const { form, next, users, back, saveUser, setIsModalOpen, deleteUser, modalEliminar, setModalEliminar, updateUser, handleForm, estudiantes, handleEdit, resetForm, handleDelete, setSearchStudent, searchStudent, ObtenerUsers, succesCreateUser, isModalOpen } = useContext(EstudiantesContext)
    useEffect(() => {
        ObtenerUsers()
    }, [updateUser, modalEliminar])


    const searchEstudent = estudiantes.filter(element => element.name.toLowerCase().includes(searchStudent.toLowerCase()))
    let cont = 0
    return (
        <>
            {isModalOpen && <MyModal tittle={'Crear Usuario'} cerrarModal={setIsModalOpen} aceptarCambios={saveUser}>
                <>
                    <div className="mb-3 text-start">
                        <input onChange={(event) => handleForm(event)} name='name' type='text' className="form-control" placeholder="Nombre" value={form.name} />
                    </div>
                    <div className="mb-3 text-start">
                        <input onChange={(event) => handleForm(event)} name='email' type='email' className="form-control" placeholder="Email" value={form.email} />
                    </div>
                    <div className="mb-3 text-start">
                        <input onChange={(event) => handleForm(event)} name='password' type='password' className="form-control" placeholder="password" value={form.password} />
                    </div>
                    <div className="mb-3 text-start">
                        <input onChange={(event) => handleForm(event)} name='avatar' type='text' className="form-control" placeholder="avatar" value={form.avatar} />
                    </div>
                </>
            </MyModal>}

            {modalEliminar &&
                <MyModal tittle={'eliminar'} cerrarModal={setModalEliminar} aceptarCambios={(deleteUser)} textButtonSucces={'Eliminar'}>
                    <div className='text-center mb-5'>
                        <h1>Are you sure?</h1>
                    </div>
                    <div className='gap-3 d-flex justify-content-center'>
                        {/* <button onClick={() => deleteUser()} className=' btn btn-danger'>Si</button>
                        <button onClick={() => setModalEliminar(false)} className=' btn btn-success'>No</button> */}
                    </div>

                </MyModal>}

            <div className='container-fluid text-center'>
                <div className='d-flex justify-content-end pt-4'>
                    <input type="text" placeholder='Buscar Usuario' className='form-control' onChange={((event) => setSearchStudent(event.target.value))} />
                    <button type="button" className="btn btn-primary"
                        onClick={resetForm}
                    >
                        Crear Usuario
                    </button>
                </div>
                <div className={succesCreateUser || updateUser ? "alert alert-success" : 'hidden'} role="alert">
                    {updateUser && <p>Se ha actualizado correctamente</p>}
                    {succesCreateUser && <p>Se ha guardado correctamente</p>}
                </div>
                <table className="table table-striped">
                    <thead >
                        <tr className='text-center'>
                            <th>#</th>
                            <th>Nombre</th>
                            <th>role</th>
                            <th>email</th>
                            <th>password</th>
                            <th>avatar</th>
                            <th>Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            searchEstudent.map((item, index) => (
                                <tr key={index}>
                                    <td >{index + 1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.role}</td>
                                    <td>{item.email}</td>
                                    <td>{item.password}</td>
                                    <td><img className='rounded-circle' width='90' heigth='90' src={item.avatar} /></td>
                                    <td>
                                        <button
                                            className="btn btn-info me-md-2"
                                            onClick={(() => handleEdit(item.id))}
                                        >Editar</button>
                                        <button onClick={() => handleDelete(item.id)} className="btn btn-danger">ELiminar</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        <li className="page-item"><a className="page-link" onClick={back}>Anterior</a></li>
                        {
                            users.map((item, index) => {
                                if (index % 10 == 0) {
                                    return <li className="page-item" key={index}><a className="page-link">{cont += 1}</a></li>
                                }
                            })
                        }
                        <li className="page-item"><a className="page-link" onClick={next}>Siguiente</a></li>
                    </ul>
                </nav>
            </div>
        </>
    )
}

export default Estudiantes