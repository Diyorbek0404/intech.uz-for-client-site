import React, {createContext, useReducer} from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import ComeHistory from './screens/ComeHistory';
import Dasturchi from './screens/Dasturchi';
import Home from './screens/Home';
import Login from './screens/Login';
import Messages from './screens/Messages';
import PayHistory from './screens/PayHistory';
import SingleMessage from './screens/SingleMessage';
import SingleStudent from './screens/SingleStudent';
import SingleTeacher from './screens/SingleTeacher';
import Student from './screens/Student';
import StudentAdd from './screens/StudentAdd';
import Teacher from './screens/Teacher';
import Teachertable from './screens/Teachertable';
import { reducer, initialState } from './reducer/userReducer'
import Course from './screens/Course';
import CourseSingle from './screens/CourseSingle';
import News from './screens/News';
import SingleNews from './screens/SingleNews';
import NotFound from './screens/NotFound';

export const UserContext = createContext()
export const axiosUrl = "https://oquvmarkaz.vercel.app/api";
export const jwt = localStorage.getItem("jwt")
// console.log(jwt)
const Routing = () => {
  const user = localStorage.getItem("user")
  return (
    <Routes>
      <Route path='/' exact element={user ? <Home /> : <Login />} />
      <Route path='/login' exact element={<Login />} />
      <Route path='/teacheradd' exact element={user ? <Teacher /> : <Login />} />
      <Route path='/teacher' exact element={user ?<Teachertable /> : <Login />} />
      <Route path='/singleteacher/:dataId' exact element={ user ? <SingleTeacher /> : <Login />} />
      <Route path='/student' exact element={user ? <Student /> : <Login />} />
      <Route path='/studentadd' exact element={user ? <StudentAdd /> : <Login />} />
      <Route path='/dasturchi' exact element={<Dasturchi />} />
      <Route path='/payhistory/:payId' exact element={user ? <PayHistory /> : <Login />} />
      <Route path='/messages/' exact element={user ? <Messages /> : <Login />} />
      <Route path='/messages-single/:messageId' exact element={user ? <SingleMessage /> : <Login />} />
      <Route path='/comehistory/:studentId' exact element={user ? <ComeHistory /> : <Login />} />
      <Route path='/singlestudent/:studentId' exact element={user ? <SingleStudent /> : <Login />} />
      <Route path='/course/' exact element={user ? <Course /> : <Login />} />
      <Route path='/course/:id' exact element={user ? <CourseSingle /> : <Login />} />
      <Route path='/news/' exact element={user ? <News /> : <Login />} />
      <Route path='/news/:id' exact element={user ? <SingleNews /> : <Login />} />
      <Route path='*' exact element={<NotFound />} />
    </Routes>
  )
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <Routing />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
