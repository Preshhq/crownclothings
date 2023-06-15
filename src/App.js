import {Routes, Route} from 'react-router-dom'
import Home from "./routes/home/home.components";
import Navigation from './routes/navigation/navigation.components';
import Signin from './routes/signin/signin.components';


const Shop = () =>{
return <h1>I am the shop page</h1>
}; 


const App =() => {
return (
  <Routes>
   <Route path='/' element={<Navigation />} >
     <Route  index element={<Home />} />
     <Route path='shop' element={<Shop />} />
     <Route path='signin' element={<Signin />} />
   </Route> 

  </Routes>
);

};

export default App;
