// import {ToastContainer} from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';



// const Notification = () =>{
//     return <ToastContainer autoClose={300} position="top-right"/>
// };

// export default Notification;
import { toast } from 'react-toastify';

export const successNotification = (message) => {
    toast.success(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
  };

  export const errorNotification = (message) => {
    toast.error(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
  };