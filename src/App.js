import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import Navbar from './Components/Layout/Navbar';
import Footer from './Components/Layout/footer';
import Home from './Pages/Home';
import About from './Pages/About';
import NotFound from './Pages/NotFound';
import { GithubProvider } from './context/github/GithubContext';
import {AlertProvider} from './context/alert/AlertContext';
import Alert from './Components/Layout/Alert';
import User from './Pages/User';

function App() {
  return (
    <GithubProvider>
    <AlertProvider>
    <Router>
    <div className="flex flex-col justify-between h-screen">
     <Navbar title="Github Finder"/>
     <main className='container mx-auto px-3 pb-12'>
       <Alert/>
       <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/about' element={<About/>}></Route>
        <Route path='/user/:login' element={<User/>}></Route>
        <Route path='/notfound' element={<NotFound/>}></Route>
        <Route path='/*' element={<NotFound/>}></Route>
       </Routes>
     </main>
     <Footer/>
      
    </div>
    </Router>
    </AlertProvider>
    </GithubProvider>
  );
}

export default App;
