import { useContext, useEffect, useState } from "react"
import { UserContext } from "../context/user.context"
import {useNavigate} from "react-router-dom";

// eslint-disable-next-line react/prop-types
const UserAuth = ({children}) => {
    const {user} = useContext(UserContext);
    const [load,setload] = useState(true);
    const token = localStorage.getItem('token');

    const navigate = useNavigate();

    

    

    useEffect(()=>{
        if(user){
            setload(false);
        }

        if(!token){
            navigate('/login');
        }
        if(!user){
            navigate('/login');
        }
     },[])


     if(load){
        return <div>Loading...</div>
    }

  return (
    <>
      {children}
    </>
  )
}

export default UserAuth