import { useLocation } from "react-router-dom"
import { useState } from "react"
const Project = () => {
  const location = useLocation();
  console.log(location.state);
  
    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const [isAddOption, setIsAddOption] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState([]);

    const users = [
      { id: 1, email: "user1@example.com" },
      { id: 2, email: "user2@example.com" },
      { id: 3, email: "user3@example.com" },
      { id: 4, email: "user4@example.com" },
    ];
    
   return (
    <main className="flex w-screen h-screen">
      {/* Left Chat Section */}
      <section className="flex flex-col h-full bg-slate-200 min-w-[24rem] max-w-[24rem]">
        <header className="flex justify-end w-full p-4 bg-slate-400">
          <button className="flex flex-row items-center gap-2 mr-auto" onClick={() => setIsAddOption(!isAddOption)}>
          <i className="ri-user-add-line"></i>
          <p>Add collaborator</p>
          </button>
          <button className="p-4" onClick={() => setIsPanelOpen(!isPanelOpen)}>
            <i className="ri-group-line"></i>
          </button>
        </header>

        <div className="flex flex-col flex-grow p-2 conversationArea">
          <div className="flex flex-col flex-grow gap-1 chatArea">
            <div className="flex flex-col flex-grow gap-1 messageBox">
              {/* Incoming Message */}
              <div className="flex flex-col self-start p-2 border rounded-md incoming border-slate-50 min-w-[5rem] max-w-[14rem]">
                <small className="opacity-70">user1@example.com</small>
                <p>Hello! How can I help you today? wesgtqeawrhqea5rhjethjet</p>
              </div>
              {/* Outgoing Message */}
              <div className="flex flex-col self-start p-2 ml-auto border rounded-md outgoing border-slate-50 min-w-[5rem] max-w-[14rem]">
                <small className="opacity-70">user2@example.com</small>
                <p>Hi! I have a question about my project.  ta nisi, pariatur obcaecati accusantium similique atque inventore voluptatum cum vitae sequi laboriosam ullam maiores tempora at dolorum optio officia?</p>
              </div>
            </div>

            {/* Input Field */}
            <div className="flex w-full inputField">
              <input
                className="flex-grow p-2 m-2 border-none rounded-md outline-none"
                type="text"
                placeholder="Enter message"
              />
              <button className="p-3 m-2 text-white bg-blue-500 rounded-md">
                <i className="ri-send-plane-2-fill"></i>
              </button>
            </div>
          </div>
        </div>
        <div
        className={` flex flex-col gap-2 absolute left-0 top-0 w-96 bg-slate-200 h-full transform transition-transform duration-300 ${
          isPanelOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <header className="flex justify-end w-full p-4 bg-slate-300">
          <button className="p-4" onClick={() => setIsPanelOpen(!isPanelOpen)}>
          <i className="ri-close-large-line"></i>
          </button>
        </header>
        <div className="flex flex-col items-center gap-2 cursor-pointer users hover:bg-slate-400 hover:rounded-lg">
          <div className="flex gap-2 p-2 user">
            <div className="flex items-center justify-center p-6 rounded-full h-fit w-fit aspect-square bg-slate-400 hover:bg-transparent"> 
            <i className="absolute ri-user-3-line"></i>
            </div>
            <div className="flex items-center ">
              <h1>Username</h1>
            </div>
          </div>
        </div>
      </div>
      </section>
      
        {isAddOption && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-1/3 p-6 bg-white rounded-lg shadow-lg">
              <header className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Add Collaborator</h2>
                <button onClick={() => setIsAddOption(false)}>
                  <i className="text-xl ri-close-line"></i>
                </button>
              </header>
              

              
                <ul className="flex flex-col gap-2 p-3 mt-4 overflow-auto max-h-96">
                  {users.map((user) => (
                    <li key={user.id} className={`flex items-center justify-between p-2 rounded-md cursor-pointer ${selectedUserId.indexOf(user.id)!==-1 ? 'bg-slate-200' : '' } hover:bg-gray-100` } onClick={() => setSelectedUserId([...selectedUserId, user.id])}>
                      <span>{user.email}</span>
                    </li>
                  ))}
                </ul>
              
              
              <div className="flex flex-col gap-4">
          
                <button className="p-2 text-white bg-blue-500 rounded-md">
                  Add as Collaborator
                </button>
              </div>
            </div>
          </div>
        )}
      
      
    </main>
   )
}

export default Project