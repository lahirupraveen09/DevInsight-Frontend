//import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import DashboardMain from "./pages/dashboard/DashboardMain.jsx";
import CodePreview from "./pages/dashboard/CodePreview.jsx";
import SignInDemo from "./pages/Login/SignInDemo.jsx";
import SignUpDemo from "./pages/Login/SignUpDemo.jsx";
import HelpRequests from "./pages/QAE/HelpRequests.jsx";
import Landing from "./pages/Landing/Landing.jsx";
import Createorg1 from "./pages/CreateOrg/Createorg1.jsx";
function App() {
    return (
    <>
        <BrowserRouter>
            <Routes>
                <Route path="/db" element={<DashboardMain/>}/>
                <Route path="/cp" element={<CodePreview/>}/>
                <Route path="/hr" element={<HelpRequests/>}/>
                <Route path="/si" element={<SignInDemo/>}/>
                <Route path="/su" element={<SignUpDemo/>}/>
                <Route path="/ld" element={<Landing/>}/>
                <Route path="/co" element={<Createorg1/>}/>
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
