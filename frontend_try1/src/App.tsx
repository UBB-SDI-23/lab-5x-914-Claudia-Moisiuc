import './App.css'
import {LocationShowAll} from "./components/location/LocationShowAll";
import {AddLocation} from "./components/location/AddLocation";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {LocationDelete} from "./components/location/LocationDelete";
import {LocationDetails} from "./components/location/LocationDetails";
import {LocationEdit} from "./components/location/LocationEdit";
import {ArtFilter} from "./components/art/ArtFilter";
import {AppMenu} from "./components/AppMenu";


function App() {
  return (

      <>
          <BrowserRouter>
              <AppMenu />
              <Routes>
                  <Route path ="/location/" element = {<LocationShowAll/>}/>
                  <Route path ="/location/add/" element = {<AddLocation/>}/>
                  <Route path="/location/:locationId/delete" element={<LocationDelete/>} />
                  <Route path="/location/:locationId/details" element={<LocationDetails />} />
                  <Route path="/location/:locationId/edit" element={<LocationEdit />} />
                  <Route path="/art-filter/" element={<ArtFilter />} />
              </Routes>
          </BrowserRouter>
      </>
  );
}

export default App;

/*<Route path ="/location/add/" element = {<AddLocation/>}/>
*/