import {BrowserRouter, Route, Routes} from "react-router-dom"
import MenuSubida from "./plantillas/MenuSubida"
import MenuAdmin from "./plantillas/MenuAdmin"
import MenuEdit from "./plantillas/MenuEdit"
import MenuGraph from "./plantillas/MenuGraph"

function App() {
  return (
    <div >
     <BrowserRouter>
     <Routes>
     <Route exact path="/" element={<MenuSubida />}></Route>
     <Route exact path="/menu" element={<MenuAdmin />}></Route>
     <Route exact path="/edit/:id" element={<MenuEdit />}></Route>
     <Route exact path="/graph" element={<MenuGraph />}></Route>
      </Routes>
     </BrowserRouter>
    </div>
  )
}

export default App;
