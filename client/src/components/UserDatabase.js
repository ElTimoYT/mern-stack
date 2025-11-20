import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomAlert from './CustomAlert';

function UserDatabase() {

    const [listOfUsers, setListOfUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [modal, setModal] = useState({ show: false, title: '', text: '', icon: '', onConfirm: null });
    
    const [idToDelete, setIdToDelete] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true);
        axios.get("http://localhost:3001/getUsers").then((response) => {
            setListOfUsers(response.data);
            setIsLoading(false);
        }).catch(() => {
            setIsLoading(false);
        });
    }, []);

    const closeModal = () => {
        setModal({ ...modal, show: false });
        setIdToDelete(null); // Limpiamos el ID pendiente
    };

    const handleUpdate = (userId) => {
        // Redirigir al componente de actualización con el ID
        navigate(`/update/${userId}`);
    };

    const initiateDelete = (userId) => {
        setIdToDelete(userId);
        setModal({
            show: true,
            title: "¿Estás seguro?",
            text: "Esta acción eliminará al usuario permanentemente. ¿Deseas continuar?",
            icon: "warning",
            type: "confirm" // <--- CAMBIO: Usamos un string para identificar el tipo
        });
    };

    const executeDelete = () => {
        if (!idToDelete) return;
        
        axios.delete(`http://localhost:3001/deleteUser/${idToDelete}`)
            .then(() => {
                setListOfUsers((prevUsers) => 
                    prevUsers.filter((user) => {
                        const currentId = user._id || user.id || user.username;
                        return currentId !== idToDelete;
                    })
                );

                setModal({
                    show: true,
                    title: "¡Eliminado!",
                    text: "El usuario ha sido eliminado correctamente.",
                    icon: "success",
                    type: "alert" // <--- CAMBIO: Ahora es una alerta normal
                });
            })
            .catch((err) => {
                console.log(err);
                setModal({
                    show: true,
                    title: "Error",
                    text: "Hubo un problema al intentar eliminar el usuario.",
                    icon: "error",
                    type: "alert" // <--- CAMBIO
                });
            });
    };

return (
        <div className="app-container p-4 md:p-8 min-h-screen bg-gray-50">
            
            {/* Renderizamos el CustomAlert aquí */}
            <CustomAlert 
                show={modal.show}
                title={modal.title}
                text={modal.text}
                icon={modal.icon}
                onClose={closeModal}
                onConfirm={modal.type === "confirm" ? executeDelete : null}
            />

            <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-700 mb-6 text-center">User Dashboard</h1>

            <div className="flex justify-center mb-10">
                <button 
                    onClick={() => navigate('/create')}
                    className="bg-indigo-500 text-white font-bold px-6 py-2 rounded-lg hover:bg-indigo-600 transition-colors shadow-lg flex items-center space-x-2"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                    <span>Create new User</span>
                </button>
            </div>

            {isLoading && <div className="text-center text-xl text-gray-500 mt-10">Cargando datos de usuarios...</div>}
            {!isLoading && listOfUsers.length === 0 && <div className="text-center text-xl text-gray-500 mt-10">No se encontraron usuarios.</div>}

            <div className="users-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                {listOfUsers.map((user) => (
                    <div 
                        className="user-card bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 border-t-4 border-indigo-500 transform hover:translate-y-[-2px]" 
                        key={user._id || user.id || user.username}
                    >
                        <h3 className="text-2xl font-semibold mb-3 text-indigo-600 border-b pb-2">{user.name}</h3>
                        <p className="text-gray-700 text-sm mb-1"><strong className="font-medium text-gray-800">Age:</strong> {user.age}</p>
                        <p className="text-gray-700 text-sm mb-1"><strong className="font-medium text-gray-800">Email:</strong> <span className="text-blue-500">{user.email}</span></p>
                        <p className="text-gray-700 text-sm"><strong className="font-medium text-gray-800">Username:</strong> <span className="font-mono text-gray-600">{user.username}</span></p>
                        
                        <div className="mt-4 flex justify-end space-x-3">
                            <button 
                                onClick={() => handleUpdate(user._id || user.id || user.username)}
                                className="bg-green-500 text-white text-xs px-3 py-1 rounded-full hover:bg-green-600 transition-colors shadow-md"
                            >
                                Update
                            </button>
                            
                            {/* Aquí llamamos a initiateDelete en lugar de handleDelete directo */}
                            <button 
                                onClick={() => initiateDelete(user._id || user.id || user.username)}
                                className="bg-red-500 text-white text-xs px-3 py-1 rounded-full hover:bg-red-600 transition-colors shadow-md"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default UserDatabase;