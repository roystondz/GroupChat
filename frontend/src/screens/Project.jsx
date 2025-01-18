import { useLocation } from "react-router-dom"
import { useEffect, useState ,useContext, createRef } from "react"
import ReactDOMServer from 'react-dom/server';
import axiosInstance from "../config/axios";
import { intializeSocket ,receiveMessage,sendMessage} from "../config/socket";
import { UserContext } from "../context/user.context";
//import markDown from 'markdown-to-jsx';
import Markdown from "markdown-to-jsx";

const Project = () => {
  const location = useLocation();
  
  
    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const [isAddOption, setIsAddOption] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState([]);
    const [message,setMessage] = useState('');

    //making use of useRef
    const messageBox = createRef()


    const [fileTree,setFileTree] = useState({
      
      
    });
  
      
    const [currentFile,setCurrentFile] = useState(null);
    const [openFile,setOpenFile] = useState([]);

    const {user} = useContext(UserContext);

    const [project,setProject] = useState(location.state.project);
    
    const [users,setUser]  = useState([]);
    
    const handleSubmmit = (id) => {
      
      setSelectedUserId([...selectedUserId,id])
    }
    
    const handleClose = () => {
      setIsAddOption(false);
      setSelectedUserId([]);
    }

    useEffect(() => {

      intializeSocket(project._id);

      receiveMessage('project-message',(message) => {
        
        if(message.sender._id === 'ai'){
          const messageObject = JSON.parse(message.message);
          if(messageObject.fileTree){
            setFileTree(messageObject.fileTree);  
          }
        }
        
        appendIncomingMessage(message);
      })

      

      const projectIds = location.state.project._id;
      axiosInstance.get(`/projects/get-project/${projectIds}`).then((res) => {
        setProject(res.data.Project)
        console.log(res.data.Project);
      }).catch((err) => {console.log(err)});


      
      axiosInstance.get('/users/all').then((res) => {
        setUser(res.data.AllUsers);
      }).catch((err) => {
        console.log(err);
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])


    function send(){
      sendMessage('project-message',{
        message,
        sender:user.email
      
    })
    appendOutgoingMessage(message);
    setMessage("");
  }
  
    
    function addCollaborators()
    {
      axiosInstance.put('/projects/add-user',{
        projectId:location.state.project._id,
        users:selectedUserId
      }).then((res)=>{
        console.log(res.data);
        setIsAddOption(false);
      }).catch((err)=>{
        console.log(err.res.data);
      })
    }
    
    function appendIncomingMessage(message){
      const messageBox = document.querySelector('.messageBox');
      const incomingMessage = document.createElement('div');
      
      if(message.sender._id === 'ai'){
        console.log(message.message);
        const messageObject = JSON.parse(message.message);
        console.log(messageObject);
        const markdown = ReactDOMServer.renderToString(<Markdown>{messageObject.text}</Markdown>);
        //const markdown = (<Markdown>{message.message}</Markdown>);
        console.log(markdown);
        
        //const mk = JSON.parse(markdown);
        incomingMessage.className = ' flex flex-col self-start p-2 border rounded-md incoming border-slate-50 min-w-[10rem] max-w-[14rem] ';
        incomingMessage.innerHTML = `<small class="opacity-70 ">AI</small><p class="">${markdown}</p>`;
      }
      else{ 
      
      incomingMessage.className = 'flex flex-col self-start p-2 border rounded-md incoming border-slate-50 min-w-[5rem] max-w-[14rem]';
      incomingMessage.innerHTML = `<small class="opacity-70">${message.sender}</small><p>${message.message}</p>`;
      }
      messageBox.appendChild(incomingMessage);  
      scrollToBottom();
      
    }

    function appendOutgoingMessage(message){
      const messageBox = document.querySelector('.messageBox');
      const outgoingMessage = document.createElement('div');
      outgoingMessage.className = 'flex flex-col self-start p-2 ml-auto border rounded-md outgoing border-slate-50 min-w-[5rem] max-w-[14rem]';
      outgoingMessage.innerHTML = `<small class="opacity-70">${user.email}</small><p>${message}</p>`;
      messageBox.appendChild(outgoingMessage);

      scrollToBottom();
      
    }

    function scrollToBottom(){
      const chatArea = document.querySelector('.chatArea');
      chatArea.scrollTop = chatArea.scrollHeight;
    }
    
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
      <div className="flex flex-col flex-grow w-full overflow-auto">
        <div className="flex flex-col flex-grow max-h-full p-2 overflow-auto conversationArea">
          
          <div className="flex flex-col flex-grow gap-1 overflow-auto chatArea">
            <div 
            ref={messageBox}
            className="flex flex-col flex-grow max-h-full gap-1 messageBox">
              {/* Incoming Message */}
              {/* <div className="flex flex-col self-start p-2 border rounded-md incoming border-slate-50 min-w-[5rem] max-w-[14rem]">
                <small className="opacity-70">user1@example.com</small>
                <p>Hello! How can I help you today? wesgtqeawrhqea5rhjethjet</p>
              </div> */}
              {/* Outgoing Message */}
              {/* <div className="flex flex-col self-start p-2 ml-auto border rounded-md outgoing border-slate-50 min-w-[5rem] max-w-[14rem]">
                <small className="opacity-70">user2@example.com</small>
                <p>Hi! I have a question about my project.  ta nisi, pariatur obcaecati accusantium similique atque inventore voluptatum cum vitae sequi laboriosam ullam maiores tempora at dolorum optio officia?</p>
              </div> */}
            </div>
            </div>
            {/* Input Field */}
            <div className="flex w-full inputField">
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-grow p-2 m-2 border-none rounded-md outline-none"
                type="text"
                placeholder="Enter message"
              />
              <button onClick={send} className="p-3 m-2 text-white bg-blue-500 rounded-md">
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
        <header className="flex items-center w-full p-4 bg-slate-300">
          <div className="mr-auto ">
          <h1>Collaborators</h1>
          </div>
          <button className="p-4" onClick={() => setIsPanelOpen(!isPanelOpen)}>
          <i className="ri-close-large-line"></i>
          </button>
        </header>
        <div className="flex flex-col items-center gap-2 cursor-pointer users">
          {project.users && project.users.map((user) => {
            return(
            <div className="flex gap-2 p-2 user " key={user._id}>
              <div  className="flex items-center justify-center p-6 rounded-full h-fit w-fit aspect-square bg-slate-400 hover:bg-transparent"> 
              <i className="absolute flex items-center ri-user-3-line"></i>
              </div>
              <div className="flex items-center " key={user._id}>
                <h1>{user.email}</h1>
              </div>
            </div>)
          })}
        </div>
      </div>
      </section>
      
      {/* Right Chat Section */}
      <section className="flex flex-row w-full h-full">
  {/* File Manager Section */}
  <div className="w-56 h-full p-4 bg-slate-300 file-manager">
    <div className="flex flex-col gap-4 p-2 file-tree">
      <div className="flex flex-col gap-2 rounded-md tree-elements">
        {Object.keys(fileTree).map((file, index) => (
          <button
            key={index}
            onClick={() => {setCurrentFile(file)
            setOpenFile([...new Set([...openFile, file])])
            }}
            className="p-2 text-left rounded-md shadow-md bg-green-50 hover:bg-green-100"
          >
            <p className="text-lg font-semibold">{file}</p>
          </button>
        ))}
      </div>
    </div>
  </div>

  {/* Editor Section */}
  
  {currentFile ? (
  
    <div className="flex flex-col flex-grow h-full p-4 bg-slate-100 editor">
      
      {/* File Title */}
      <div className="mb-4">
        {openFile.map((file,index) => {
          return <button key={index} onClick={()=>setCurrentFile(file)} className="p-2 text-left rounded-md shadow-md bg-green-50 hover:bg-green-100">{file}</button>
        })}
        <h1 className="w-full text-2xl font-bold text-gray-700">{currentFile}</h1>
      </div>

      {/* Editor Area */}
      <div className="flex-grow w-full">
        <textarea
          className="w-full h-full p-4 border rounded-md resize-none bg-gray-50"
          value={fileTree[currentFile].content}
          readOnly
        />
      </div>
      
    </div>
  
) : (
  <div className="flex items-center justify-center h-full text-gray-400">
    <p className="text-xl">Select a file to view its content</p>
  </div>
)}

  
</section>


        {isAddOption && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-1/3 p-6 bg-white rounded-lg shadow-lg">
              <header className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Add Collaborator</h2>
                <button onClick={() => handleClose()}>
                  <i className="text-xl ri-close-line"></i>
                </button>
              </header>
              

              
                <ul className="flex flex-col gap-2 p-3 mt-4 overflow-auto max-h-96">
                  {users.map((user) => (
                    <li key={user._id} className={`flex items-center justify-between p-2 rounded-md cursor-pointer ${selectedUserId.indexOf(user._id)!==-1 ? 'bg-slate-200' : '' }` } onClick={()=>handleSubmmit(user._id)}>
                      <span>{user.email}</span>
                    </li>
                  ))}
                </ul>
              
              
              <div className="flex flex-col gap-4">
          
                <button className="p-2 text-white bg-blue-500 rounded-md" onClick={addCollaborators}>
                  Add as Collaborator
                </button>
              </div>
            </div>
          </div>
        )}
      
      
    </main>
   )
}

export default Project;