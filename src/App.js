import logo from './logo.svg';
import './App.css';
import SignUpPage from './sign';
//import TeacherDashboard from './TeacherDashboard';
import TeacherDashv2 from './TeacherDashvTwo';
import TeachDashv3 from './TeachDashv3';
import NavbarTwo from './NavbarTwo';
import Navbar from './Navbar';
import TeacherDashboard from './components/TeacherDashboard/TeacherDashboard';
import { BrowserRouter, Switch, Route,Routes } from 'react-router-dom';
import ClassHeader from './components/ClassHeader/ClassHeader';
import ClassDefault from './components/ClassDefault/ClassDefault';
import TopicsBoard from './components/TopicsMainPage/TopicsBoard';
import AssignmentPage from './components/AssignmentPage/AssignmentPage'
import SignUp from './components/LogInSignUp/SignUp'
import SignIn from './components/LogInSignUp/SignIn'
import LoginNav from './components/Navigations/LoginNav'
import nav from './components/Navigations/nav'
import Sidebar from './components/Navigations/Sidebar'


function App() {
  return (
    <div className="App">
      <AssignmentPage/>
      {/* <SignUp/> */}
      
      {/* <nav></nav>
      <SignIn></SignIn> */}

      <BrowserRouter>
        <Routes>
        <Route path="/" element={<TeacherDashboard />} />
        <Route path="/user/:userId/class/:classId" element={<ClassDefault />} />
        <Route path="/user/:userId/class/:classId/week/:weekId/:weekNumber" element={<TopicsBoard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
