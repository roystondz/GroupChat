//import { UserContext } from '../context/user.context';
import {  useState,useEffect } from 'react';
import axiosInstance from '../config/axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  //const user = useContext(UserContext);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [projectName, setProjectName] = useState(""); // Initialize with an empty string
  const [projects,setProjects]=useState([]);

    const navigate = useNavigate();
  useEffect(()=>{
    axiosInstance.get("/projects/all").then((res)=>{
      console.log(res.data);
      setProjects(res.data.allUserProjects);
    }).catch((err)=>{
      console.log((err.res.message));
      
    })
    
  },[])

  const createProject = (e) => {
    e.preventDefault(); // Prevent form's default submission behavior
    console.log("Creating project with name:", projectName);

    axiosInstance
      .post('projects/create', { name: projectName })
      .then((res) => {
        console.log("Project created successfully:", res.data);
        setProjectName(""); // Clear the input field
        setIsFormOpen(false); // Close the modal
      })
      .catch((err) => {
        console.error("Error creating project:", err.message);
      });
  };

  return (
    <main>
      <div className="p-6">
        <div className="flex flex-wrap gap-1 projects">
          <button
            onClick={() => setIsFormOpen(true)}
            className="flex items-center p-5 border rounded-md border-slate-400"
          >
            <p className="text-xl">New Project</p>
            <i className="ml-2 text-3xl ri-add-circle-line"></i>
          </button>
          {
            projects.map((project)=>
              <div key={project._id}
              onClick={()=>navigate(`/project`,{
                state:{project}
              })}
              className='p-6 border rounded-md cursor-pointer border-slate-400 project min-w-52 hover:bg-blue-100'>
                <h1 className='font-semibold'>{project.name}</h1>
                <div className='flex gap-2'>
                <i className="ri-user-line"> Collaborators : </i>
                  {project.users.length}
                </div>
              </div>
            )
          }
        </div>

        {isFormOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
            <div className="relative p-8 bg-white shadow-xl rounded-xl w-96">
              <h2 className="mb-6 text-2xl font-bold text-gray-800">Create New Project</h2>
              <form onSubmit={createProject}>
                <input
                  type="text"
                  placeholder="Enter Project Name"
                  className="w-full p-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => setProjectName(e.target.value)}
                  value={projectName}
                />
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setIsFormOpen(false)}
                    className="px-5 py-2 text-gray-700 transition bg-gray-300 rounded-lg hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-white transition rounded-lg bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700"
                  >
                    Save
                  </button>
                </div>
              </form>
              <button
                onClick={() => setIsFormOpen(false)}
                className="absolute text-gray-500 transition top-3 right-3 hover:text-gray-700"
              >
                <i className="text-2xl ri-close-circle-line"></i>
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Home;
