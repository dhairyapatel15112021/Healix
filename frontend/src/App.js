import './App.scss';
import { useEffect,createContext, useState } from 'react';
import { Header } from './Components/OuterComponents/Header/Header';
import { Footer } from './Components/OuterComponents/Footer/Footer';
import { Outlet } from 'react-router-dom';
import { useDisplay } from './Components/Hooks/useDisplay';
import { CheckRefresh } from './Components/HelperFunction/CheckRefresh';
export const userContext = createContext();
export const toggleContext = createContext();
function App() {
  const [userLoginData, setUserLoginData] = useState({ Name: "", UserId: "", IsDoctor: false, IsLogin: false });
  const [isOpen, setIsopen] = useState(true);
  const [display] = useDisplay();
  useEffect(() => {
      const checkRefresh = async()=>{
        try {
          const checkRefreshResponse = await CheckRefresh();
          if (checkRefreshResponse.isAuthenticated) {
            const user = checkRefreshResponse.user;
            if(user._id != userLoginData.UserId){
              console.log(user._id);
              console.log(userLoginData.UserId);
              setUserLoginData({ Name: checkRefreshResponse.user.name, UserId: checkRefreshResponse.user._id, IsDoctor: checkRefreshResponse.user.isDoctor, IsLogin: true });
            }
          }
          else{
            setUserLoginData({ Name: "", UserId: "", IsDoctor: false, IsLogin: false });
          }
        }
        catch (err) {
          alert("Error While Refresh");
        }
      }
      checkRefresh();
  }, []);

  return (
    <div className="App">
      <userContext.Provider value={{ userLoginData, setUserLoginData }}>
        {display && <Header />}
        <toggleContext.Provider value={{ isOpen, setIsopen }}>
          <Outlet />
        </toggleContext.Provider>
        {display && <Footer />}
      </userContext.Provider>

    </div>
  );
}

export default App;
