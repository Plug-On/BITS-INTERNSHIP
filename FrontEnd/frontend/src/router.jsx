import {Routes, Route} from 'react-router-dom';
import Home from './home';
import Login from './login';
import Register from './register';
import Dashboard from './dashboard';
import Header from './header';
import Footer from './footer';
import Companies from './companies/show';
import Users from './users/show';
import Show from './companies/show';
import Create from './companies/create';
import Edit from './companies/edit';
import UShow from './users/show';
import UEdit from './users/edit';
import UCreate from './users/create';
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
            <Route path="/users" element={<Users/>}/>

            <Route path="/companies/show" element={<Show/>}/>
            <Route path="/companies/create" element={<Create/>}/>
            <Route path="/companies/edit" element={<Edit/>}/>

            <Route path="/users/show" element={<UShow/>}/>
            <Route path="/users/create" element={<UCreate/>}/>
            <Route path="/users/edit/:id" element={<UEdit/>}/>



            {/* <Route path="/sidebar" element={<Sidebar/>}/> */}
        </Routes>
    );
};

export default RouterComponent;