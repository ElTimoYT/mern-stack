import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CustomAlert from './CustomAlert';

function CreateUserForm() {
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [modal, setModal] = useState({ show: false, title: '', text: '', icon: '', callback: null });

    const navigate = useNavigate();

    const handleCloseModal = () => {
        setModal({ show: false, title: '', text: '', icon: '', callback: null });
        if (modal.callback) {
            modal.callback();
        }
    };

    const showAlert = (title, text, icon, callback = null) => {
        setModal({ show: true, title, text, icon, callback });
    };

    const createUser = (e) => {
        e.preventDefault();
        
        const ageNumber = Number(age);

        if (!name.trim() || !email.trim() || !username.trim() || !password || ageNumber <= 0 || isNaN(ageNumber)) {
            showAlert(
                "Error de Validación",
                "Por favor, completa todos los campos correctamente (la edad debe ser un número positivo).",
                "warning"
            );
            return;
        }

        axios
            .post("http://localhost:3001/createUser", {
                name,
                age: ageNumber,
                email,
                username,
                password,
            })
            .then(() => {
                showAlert(
                    "Usuario Creado Exitosamente",
                    "El nuevo usuario ha sido añadido al sistema.",
                    "success",
                    () => navigate("/users")
                );
            })
            .catch((error) => {
                const errorMessage = error.response?.data?.message || "Ocurrió un error de conexión con el servidor.";
                showAlert(
                    "Error al crear usuario",
                    errorMessage,
                    "error"
                );
            });
    };

    return (
        <div className="p-4 md:p-8 min-h-screen bg-gray-50 flex justify-center pt-10">
            <CustomAlert {...modal} onClose={handleCloseModal} />
            <div className="form-card bg-white max-w-lg w-full p-8 rounded-xl shadow-2xl border-t-4 border-green-500">
                <h2 className="text-3xl font-bold text-green-600 mb-8 text-center">Crear Nuevo Usuario</h2>

                <form onSubmit={createUser} className="space-y-5">
                    <input
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition-colors"
                        type="text"
                        placeholder="Nombre completo"
                        onChange={(e) => setName(e.target.value)}
                        required
                    />

                    <input
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition-colors"
                        type="number"
                        placeholder="Edad"
                        onChange={(e) => setAge(e.target.value)}
                        min="1"
                        required
                    />

                    <input
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition-colors"
                        type="email"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <input
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition-colors"
                        type="text"
                        placeholder="Username"
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />

                    <input
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition-colors"
                        type="password"
                        placeholder="Contraseña"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button 
                        type="submit" 
                        className="
                            w-full bg-green-500 text-white font-bold py-3 rounded-lg 
                            hover:bg-green-600 transition-colors shadow-lg
                        "
                    >
                        Crear Usuario
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

export default CreateUserForm;