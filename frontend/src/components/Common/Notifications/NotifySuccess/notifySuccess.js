import {toast} from 'react-toastify';

const notifySuccess = (message) => {
    toast.success(message, {
        position: "top-center",
        autoClose: 8000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}

export default notifySuccess;