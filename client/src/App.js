import React, { useEffect, useState } from 'react';
import Routes from "./components/Routes";
import { UidContext } from './components/AppContext';
import axios from 'axios';
import Navbar from './components/Navbar';
import { useDispatch } from 'react-redux';
import { getUser } from './actions/user.actions';

const App = () => {
  const [uid, setUid] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchToken = async() => {
    await axios({
      methode: "get",
      url: `${process.env.REACT_APP_API_URL}jwtid`,
      withCredentials: true
    })
    .then((res) => setUid(res.data))
    .catch((err) => console.log("No Token"))
    }
    fetchToken();

    if (uid) dispatch(getUser(uid));
  }, [uid, dispatch]) 

  return (
    <UidContext.Provider value={uid}>
      <Navbar />
      <Routes />
    </UidContext.Provider>
  )
}

export default App 