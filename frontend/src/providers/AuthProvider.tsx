import { axiosInstence } from "@/lib/axios";
import { useAuthStore } from "@/stores/useAuthStore";
import { useAuth } from "@clerk/clerk-react";
import { Loader} from "lucide-react";
// import { get } from "node_modules/axios/index.d.cts";
// import axios from "axios"
import { useEffect, useState } from "react";

const updateApiToken = (token: string | null) => {
  if (token) {
    axiosInstence.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axiosInstence.defaults.headers.common["Authorization"];
  }
};

const AuthPRovider = ({children}: {children: React.ReactNode}) => {
  const { getToken } = useAuth();
  const [loading, setLoading] = useState(true);
  const {checkAdminStatus} = useAuthStore();  

  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = await getToken();
        updateApiToken(token);
        if(token){
          await checkAdminStatus();
        }
      } catch (error) {
        updateApiToken(null);
        console.log("error in initAuth", error);
      }finally{
        setLoading(false);
      }
    };
    initAuth();
  }, [getToken]);

  if(loading){
    return (
    <div className="h-screen w-full flex items-center justify-center">
        <Loader className="size-8 text-emerald-500 animate-spin"></Loader>
    </div>
    )
  }else{
    return <div>{children}</div>
  }

 
};

export default AuthPRovider;
