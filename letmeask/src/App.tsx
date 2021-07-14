//Imports
import {
  BrowserRouter,
  Route,
  Switch,
} from 'react-router-dom'

//Components
import { Home } from './Pages/Home'
import { NewRoom } from "./Pages/NewRoom";
import { Room } from './Pages/Room';
import { AuthContextProvider } from './Contexts/AuthContext';

//Render
function App() {

  return (
    <div>
      <BrowserRouter>
        <AuthContextProvider>
          <Switch>
            <Route path='/' exact component={Home}/>
            <Route path='/rooms/new' component={NewRoom}/>      
            <Route path='/rooms/:id' component={Room}/>
          </Switch>
        </AuthContextProvider>
      </BrowserRouter>
      
    </div> 
  );
}

export default App;
