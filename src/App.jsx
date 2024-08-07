//import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import { CodeProvider } from './context/CodeContext.jsx';
import { AuthProvider } from '././pages/Profile/authContext.jsx';
import DashboardMain from "./pages/dashboard/DashboardMain.jsx";
import CodePreview from "./pages/dashboard/CodePreview.jsx";
import LoginDeveloper from "./pages/Login/LoginDeveloper.jsx";
import LoginManager from "./pages/Login/LoginManager.jsx";
import LoginBoth from "./pages/Login/LoginBoth.jsx";
import SignUpDemo from "./pages/Login/SignUpDemo.jsx";
import QAEHelpRequests from "./pages/HelpDesk/QAEHelpRequests.jsx";
import Landing from "./pages/Landing/Landing.jsx";
import UserHelpRequests from "./pages/HelpDesk/UserHelpRequests.jsx";
import CreateOrg from "./pages/Login/OrganizationCreateAccount.jsx";
import EditProfile from "./pages/Profile/EditProfile.jsx";
import Createorg2 from "./pages/CreateOrg/Createorg2.jsx";
import ManageStaff from "./pages/ManageStaff/ManageStaff.jsx";
import CodeReview from "./pages/dashboard/CodeReview.jsx";
import ContactUs from "./pages/Profile/ContactUs.jsx";
import CodeSubmissions from "./pages/dashboard/CodeSubmissions.jsx";
import ForgotPasswordAndReset from "./pages/Login/ForgotPasswordAndReset.jsx";
import VerifyEmail from "./pages/Login/VerifyEmail.jsx";
import AskHelp from "./pages/HelpDesk/AskHelp.jsx";
import ManagerProfile from "./pages/MangerProfile/ManagerProfile.jsx";
import AccSuccess from "./pages/CreateOrg/AccSuccess.jsx";
import InvalidPage from "./pages/CreateOrg/Invalidpage.jsx";
import Settings from "./pages/Profile/Settings.jsx";
import LoginFace from "./pages/Login/FaceLogin.jsx";
import RegisterFace from "./pages/Login/FaceRegister.jsx";
import ChangePassword from "./pages/Profile/ChangePassword.jsx";
import Orgnizationpage from "./pages/Organization_2/organizationpage.jsx";
import SignUpInvite from "./pages/Login/SignUpInvitaion.jsx";
import ForgotPassword from "./pages/Login/ForgotPassword.jsx";
import ForgotPasswordmanager from "./pages/Login/ForgotPasswordmanager.jsx";
import ForgotPasswordAndResentmanager from "./pages/Login/ForgotPasswordAndResetmanager.jsx";
import ChangePasswordManager from "./pages/ManageStaff/ChangePasswordManager.jsx";
import LoginBlocked from "./pages/Login/LoginBlockedpage.jsx";
import ContactUsManager from "./pages/ManageStaff/Contact_Us_Manager.jsx";
import ContactManager from "./pages/Profile/ContactManager.jsx";



export default function App() {
    return (
    <>
        <BrowserRouter>
            <CodeProvider>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<Landing/>}/>
                    <Route path="/db" element={<DashboardMain/>}/>
                    <Route path="/cp" element={<CodePreview/>}/>
                    <Route path="/qhr" element={<QAEHelpRequests/>} />
                    <Route path="/uhr" element={<UserHelpRequests/>} />
                    <Route path="/login-developer" element={<LoginDeveloper/>}/>
                    <Route path="/login-manager" element={<LoginManager/>}/>
                    <Route path="/login-both" element={<LoginBoth/>}/>
                    <Route path="/su" element={<SignUpDemo/>}/>
                    <Route path="/fp" element={<ForgotPassword/>}/>
                    <Route path="/fpm" element={<ForgotPasswordmanager/>}/>
                    <Route path="/oa" element={<CreateOrg/>}/>
                    <Route path="/verify-email" element={<VerifyEmail/>}/>
                    <Route path="/edit-profile" element={<EditProfile userId="123"/>}/>
                    <Route path="/co2" element={<Createorg2/>}/>               
                    <Route path="/ms" element={<ManageStaff/>}/>
                    <Route path="/cr" element={<CodeReview/>}/>
                    <Route path="/cu" element={<ContactUs/>}/>
                    <Route path="/Contact-us-manager" element={<ContactUsManager/>}/>
                    <Route path="/cs" element={<CodeSubmissions/>}/>
                    <Route path="/ah" element={<AskHelp/>}/>
                    <Route path="/mp" element={<ManagerProfile/>}/>
                    <Route path="/successpage" element={<AccSuccess/>}/>
                    <Route path="/invalidpage" element={<InvalidPage/>}/>
                    <Route path="/fpr" element={<ForgotPasswordAndReset/>}/>
                    <Route path="/fprm" element={<ForgotPasswordAndResentmanager/>}/>
                    <Route path="/settings" element={<Settings/>}/>
                    <Route path="/face-login" element={<LoginFace/>}/>
                    <Route path="/face-register" element={<RegisterFace/>}/>
                    <Route path="/change-password" element={<ChangePassword/>}/>
                    <Route path="/change-password-m" element={<ChangePasswordManager/>}/>
                    <Route path="/change-password-m" element={<ChangePasswordManager/>}/>
                    <Route path="/opage" element={<Orgnizationpage/>}/>
                    <Route path="/login-blocked" element={<LoginBlocked/>}/>
                    <Route path="/SignUpInvite" element={<SignUpInvite/>}/>
                    <Route path="/contact-manager" element={<ContactManager/>}/>
                </Routes>
                </AuthProvider>
            </CodeProvider>
        </BrowserRouter>
    </>
  )
}

