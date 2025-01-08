import { useLocation } from "react-router-dom"

const Project = () => {
  const location = useLocation();
  console.log(location.state);
  
   return (
    <main className="flex w-screen h-screen ">
        <section className="flex flex-col h-full bg-slate-200 left min-w-80">

            <header className="flex justify-end w-full p-4 bg-slate-400">
           <button className="p-4 ">
           <i className="ri-group-line"></i>
          </button>
            </header>

            <div className="flex flex-col flex-grow conversationArea">
                <div className="flex flex-col flex-grow gap-1 messageBox w-fit">
                    
                    <div className="flex flex-col p-2 border rounded-md incoming border-slate-50 ">
                        <small
                        className="opacity-70"
                        >ex@ex.com</small>
                        <p>Lorem ipsum dolor sit amet.</p>
                    </div>

                    <div className="flex flex-col p-2 mr-auto border rounded-md incoming border-slate-50 ">
                        <small
                        className="opacity-70"
                        >ex@ex.com</small>
                        <p>Lorem ipsum dolor sit amet.</p>
                    </div>
                </div>
                <div className="flex w-full inputField ">
                    <input className="p-2 m-2 border-none rounded-md outline-none" type="text" placeholder="Enter message" /><button className="flex-grow">
                    <i className="ri-send-plane-2-fill"></i>
                    </button>
                </div>
            </div>
        </section>
    </main>
   )
}

export default Project