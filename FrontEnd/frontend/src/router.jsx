import {Routes, Route} from 'react-router-dom';
import Home from './home';
import Login from './login';
import Register from './register';
import Dashboard from './dashboard';
import Header from './header';
import Footer from './footer';
// import Sidebar from '../common/Sidebar';

const RouterComponent = () =>{
    return (

        <Routes>
            <Route path="/header" element={<Header/>}/>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/footer" element={<Footer/>}/>

            {/* <Route path="/sidebar" element={<Sidebar/>}/> */}
        </Routes>
    );
};

export default RouterComponent;