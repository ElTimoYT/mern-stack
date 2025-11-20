const CustomAlert = ({ show, title, text, icon, onClose, onConfirm }) => {
    if (!show) return null;

    let iconClasses = "";
    let borderClasses = "";

    switch (icon) {
        case "success":
            iconClasses = "text-green-500";
            borderClasses = "border-green-500";
            break;
        case "error":
            iconClasses = "text-red-500";
            borderClasses = "border-red-500";
            break;
        case "warning":
        default:
            iconClasses = "text-yellow-500";
            borderClasses = "border-yellow-500";
            break;
    }

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-[100]">
            <div className={`bg-white p-6 rounded-xl shadow-2xl max-w-sm w-full border-t-8 ${borderClasses} transform transition-all`}>
                <div className="flex flex-col items-center">
                    {/* Icono */}
                    <svg className={`w-12 h-12 mb-3 ${iconClasses}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {icon === "success" && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />}
                        {icon === "error" && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />}
                        {(icon === "warning" || !icon) && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />}
                    </svg>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
                    <p className="text-sm text-gray-600 text-center mb-4">{text}</p>
                    
                    <div className="flex space-x-3 w-full">
                        {onConfirm ? (
                            <>
                                <button
                                    onClick={onClose}
                                    className="flex-1 bg-gray-300 text-gray-800 font-bold py-2 rounded-lg hover:bg-gray-400 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={onConfirm}
                                    className="flex-1 bg-red-500 text-white font-bold py-2 rounded-lg hover:bg-red-600 transition-colors"
                                >
                                    Delete
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={onClose}
                                className={`w-full bg-indigo-500 text-white font-bold py-2 rounded-lg hover:bg-indigo-600 transition-colors`}
                            >
                                Ok
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomAlert;