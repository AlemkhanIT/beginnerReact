import { useEffect } from 'react';
import { useState } from 'react'
import { Success } from './components/Success';
import { Users } from './components/Users';

// Тут список пользователей: https://reqres.in/api/users

function App() {
  const [users, setUsers] = useState([]);
  const [isLoading,setLoading] = useState(true);
  useEffect(()=>{
    fetch('https://reqres.in/api/users')
    .then((res) => res.json())
    .then((json)=>{
      setUsers(json.data);
    })
    .catch((err)=>{
      console.warn(err);
      alert("Error while trying to get information from DB");
    })
    .finally(()=>(setLoading(false)));
  },[]);

  return (
    <div className="App">
      <Users items={users} isLoading={isLoading}/>
      {/* <Success /> */}
    </div>
  )
}

export default App
