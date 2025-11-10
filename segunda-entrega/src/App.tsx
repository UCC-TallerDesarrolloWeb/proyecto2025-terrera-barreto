import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "@pages/Home";

import '@styles/index.css';
import PageLayout from "@/layout/PageLayout";
import Purchases from "@pages/Purchases";

const App = () => (
    <BrowserRouter>
        <Routes>
            <Route element={<PageLayout/>}>
                <Route path="/purchases" element={<Purchases/>} />
                <Route path="/" element={<Home/>} />
            </Route>
        </Routes>
    </BrowserRouter>
);

export default App
