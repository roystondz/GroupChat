import { useLocation } from "react-router-dom"
import { useState } from "react"
const Project = () => {
  const location = useLocation();
  console.log(location.state);
  
    const [isPanelOpen, setIsPanelOpen] = useState(false);


   return (
    <main className="flex w-screen h-screen">
      {/* Left Chat Section */}
      <section className="flex flex-col h-full bg-slate-200 min-w-[24rem] max-w-[24rem]">
        <header className="flex justify-end w-full p-4 bg-slate-400">
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
        className={`absolute left-0 top-0 w-96 bg-red-50 h-full transform transition-transform duration-300 ${
          isPanelOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <header className="flex justify-end w-full p-4 bg-slate-400">
          <button className="p-4" onClick={() => setIsPanelOpen(!isPanelOpen)}>
          <i className="ri-close-large-line"></i>
          </button>
        </header>
        <ul className="p-4 space-y-2">
          <li className="p-2 hover:bg-red-100">Menu Item 1</li>
          <li className="p-2 hover:bg-red-100">Menu Item 2</li>
          <li className="p-2 hover:bg-red-100">Menu Item 3</li>
        </ul>
      </div>
      </section>

      {/* Sidebar */}
      
    </main>
   )
}

export default Project