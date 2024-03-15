// toastUtils.js
import toast from 'react-hot-toast';

export const ShowErrorToast = (message,ErrorMessageApi) => {
  toast.error(`${message?message:""}    ${ErrorMessageApi?ErrorMessageApi:""}  `, {
    position: "bottom-right",
    style: {
      backgroundColor: "#DF2E38",
      width: '500px',
      fontWeight:"600",
      fontSize:"16px"
    },
   duration: 3000,
  },

  );

};
