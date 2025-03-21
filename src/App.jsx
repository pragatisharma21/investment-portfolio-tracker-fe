import { Bounce, ToastContainer } from 'react-toastify'
import './App.css'
import Navbar from './components/custom/Navbar'
import { Button } from './components/ui/button'
import Landing from './Pages/Landing/Landing'
import AllRoutes from './Routes/AllRoutes'

function App() {
  return (
    <>
      <Navbar />
      <AllRoutes/>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  )
}

export default App
