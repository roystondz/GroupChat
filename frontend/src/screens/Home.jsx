//import { UserContext } from '../context/user.context';
import {  useState } from 'react';
import axiosInstance from '../config/axios';

const Home = () => {
  //const user = useContext(UserContext);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [projectName, setProjectName] = useState(""); // Initialize with an empty string

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
        <div className="projects">
          <button
            onClick={() => setIsFormOpen(true)}
            className="border border-slate-400 rounded-md p-5 flex items-center"
          >
            <p className="text-xl">New Project</p>
            <i className="ri-add-circle-line text-3xl ml-2"></i>
          </button>
        </div>

        {isFormOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center">
            <div className="bg-white rounded-xl shadow-xl p-8 w-96 relative">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Create New Project</h2>
              <form onSubmit={createProject}>
                <input
                  type="text"
                  placeholder="Enter Project Name"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
                  onChange={(e) => setProjectName(e.target.value)}
                  value={projectName}
                />
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setIsFormOpen(false)}
                    className="px-5 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-lg hover:from-green-500 hover:to-green-700 transition"
                  >
                    Save
                  </button>
                </div>
              </form>
              <button
                onClick={() => setIsFormOpen(false)}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition"
              >
                <i className="ri-close-circle-line text-2xl"></i>
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Home;
