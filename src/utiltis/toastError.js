// toastUtils.js
import toast from 'react-hot-toast';

export const showSuccesToast = (message) => {
    console.log("🚀 ~ showSuccesToast ~ message:", message)
    toast.success(`${message?message:""}`, {
        position: "top-right",
        style: {
          backgroundColor: "red",
          color:"#fff",
          fontSize:"16px",
          fontWeight:"600",

        }})
};

