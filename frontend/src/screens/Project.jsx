import { useLocation } from "react-router-dom"

const Project = () => {
  const location = useLocation();
  console.log(location.state);
  
   
}

export default Project