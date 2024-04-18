import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home';
import About from './components/About';
import Services from './components/Services';
import Contact from './components/Contact';
import Login from './components/Login';
import Signup from './components/Signup';
import Header from './components/Header';
import AdminPage from './layouts/AdminPage';
import AdminStudents from './components/AdminStudents';
import AdminContacts from './components/AdminContacts';
import Error from './components/Error';
import AdminServices from './components/AdminServices';
import AdminDeleteServices from './components/AdminDeleteServices';

function App() {
  return (
    <>
      <BrowserRouter>
        {/* <Header /> */}
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/about' element={<About />}></Route>
          <Route path='/services' element={<Services />}></Route>
          <Route path='/contact' element={<Contact />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/register' element={<Signup />}></Route>
          <Route path='/admin' element={<AdminPage />}>
            <Route path='students' element={<AdminStudents />}></Route>
            <Route path='students/edit' element={<AdminStudents />}></Route>
            <Route path='students/delete' element={<AdminStudents />}></Route>
            <Route path='contacts' element={<AdminContacts />}></Route>
            <Route path='service' element={<AdminServices />}></Route>
            <Route path='service/delete' element={<AdminDeleteServices />}></Route>
          </Route>
          <Route path='*' element={<Error />}></Route>
          


        </Routes>

      </BrowserRouter>
      


    </>
  );
}

export default App;
