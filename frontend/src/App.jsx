import {UserProvider} from './context/user.context'
import AppRoutes from './routes/AppRoutes'

const App = () => {
  return (
    //user provider is set up for ensuring secure routess
    <UserProvider>
    <AppRoutes/>
    </UserProvider>
  )
}

export default App
