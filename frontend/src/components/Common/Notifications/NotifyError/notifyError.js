import { toast } from 'react-toastify';

const notifyError = (message) => {
    toast.error(message, {
        position: "top-center",
        autoClose: 8000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}

export default notifyError;