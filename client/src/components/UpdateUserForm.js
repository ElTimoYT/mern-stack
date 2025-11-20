import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import CustomAlert from './CustomAlert';


function UpdateUserForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    
    // Estado para los datos del usuario, inicializado vacío
    const [userData, setUserData] = useState({ 
        name: '', 
        age: '', 
        email: '', 
        username: '' 
    });
    
    // Estado para manejar la carga y las alertas
    const [isLoading, setIsLoading] = useState(true);
    const [modal, setModal] = useState({ show: false, title: '', text: '', icon: '', callback: null });


    const handleCloseModal = () => {
        setModal({ show: false, title: '', text: '', icon: '', callback: null });
        if (modal.callback) {
            modal.callback();
        }
    };

    const showAlert = (title, text, icon, callback = null) => {
        setModal({ show: true, title, text, icon, callback });
    };

    // 1. useEffect: Carga REAL de datos del usuario por ID
    useEffect(() => {
        setIsLoading(true);
        
        // --- LLAMADA A LA API REAL ---
        axios.get(`http://localhost:3001/getUser/${id}`)
            .then((response) => {
                const user = response.data;
                setUserData({ 
                    name: user.name, 
                    age: user.age, 
                    email: user.email, 
                    username: user.username 
                });
                setIsLoading(false);
            })
            .catch((error) => { 
                console.error("Error al cargar datos del usuario:", error);
                // Mostrar alerta y redirigir si falla la carga
                showAlert(
                    "Error de Carga", 
                    `No se pudo cargar el usuario con ID: ${id}. Intenta más tarde.`, 
                    "error", 
                    () => navigate('/users')
                );
                setIsLoading(false);
            });
            
    }, [id, navigate]); 

    // 2. Manejador de cambios en los inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    // 3. Manejador de envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();

        const ageNumber = Number(userData.age);
        
        if (!userData.name.trim() || !userData.email.trim() || !userData.username.trim() || ageNumber <= 0 || isNaN(ageNumber)) {
            showAlert("Error de Validación", "Por favor, revisa todos los campos obligatorios.", "warning");
            return;
        }

        // Lógica de actualización: Se envían solo los campos editables
        const dataToUpdate = {
            name: userData.name,
            age: ageNumber,
            email: userData.email,
            username: userData.username,
        };

        axios
            .put(`http://localhost:3001/updateUser/${id}`, dataToUpdate) // Usamos PUT para actualizar
            .then(() => {
                showAlert(
                    "Actualización Exitosa",
                    `Los datos del usuario ${userData.name} han sido guardados.`,
                    "success",
                    () => navigate("/users") // Vuelve a la lista de usuarios
                );
            })
            .catch((error) => {
                const errorMessage = error.response?.data?.message || "Ocurrió un error al intentar actualizar el usuario.";
                showAlert("Error de Actualización", errorMessage, "error");
            });
    };

    if (isLoading) {
        return (
            <div className="p-8 text-center mt-16 text-xl text-gray-500">Cargando datos del usuario ID: {id}...</div>
        );
    }

    return (
        <div className="p-4 md:p-8 min-h-screen bg-gray-50 flex justify-center pt-10">
            <CustomAlert {...modal} onClose={handleCloseModal} />
            <div className="form-card bg-white max-w-lg w-full p-8 rounded-xl shadow-2xl border-t-4 border-green-500">
                <h2 className="text-3xl font-bold text-green-600 mb-8 text-center">Actualizar Usuario</h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                    
                    {/* Campo Nombre */}
                    <label className="block text-sm font-medium text-gray-700">Nombre Completo</label>
                    <input
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition-colors"
                        type="text"
                        name="name"
                        value={userData.name}
                        onChange={handleChange}
                        required
                    />

                    {/* Campo Edad */}
                    <label className="block text-sm font-medium text-gray-700">Edad</label>
                    <input
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition-colors"
                        type="number"
                        name="age"
                        value={userData.age}
                        onChange={handleChange}
                        min="1"
                        required
                    />

                    {/* Campo Email */}
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition-colors"
                        type="email"
                        name="email"
                        value={userData.email}
                        onChange={handleChange}
                        required
                    />

                    {/* Campo Username */}
                    <label className="block text-sm font-medium text-gray-700">Username</label>
                    <input
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition-colors"
                        type="text"
                        name="username"
                        value={userData.username}
                        onChange={handleChange}
                        required
                    />
                    
                    {/* Campo Contraseña (Deshabilitado o no mostrado) */}
                    <div className="text-sm text-gray-500 pt-2">
                        La contraseña no puede ser modificada desde este formulario.
                    </div>

                    <button 
                        type="submit" 
                        className="
                            w-full bg-green-500 text-white font-bold py-3 rounded-lg 
                            hover:bg-green-600 transition-colors shadow-lg mt-5
                        "
                    >
                        Guardar Cambios
                    </button>
                    <button 
                        type="button"
                        onClick={() => navigate('/users')} 
                        className="
                            w-full bg-gray-300 text-gray-800 font-bold py-3 rounded-lg 
                            hover:bg-gray-400 transition-colors shadow-md mt-3
                        "
                    >
                        Cancelar
                    </button>
                </form>
            </div>
        </div>
    );
}

export default UpdateUserForm;