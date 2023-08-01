import { useEffect } from 'react';
import { useState } from 'react'
import { Success } from './components/Success';
import { Users } from './components/Users';

// Тут список пользователей: https://reqres.in/api/users

function App() {
  const [users, setUsers] = useState([]);
  const [isLoading,setLoading] = useState(true);
  const [success,setSuccess] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [invites,setInvites] = useState([]);

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
  
  const onChangeSearchValue = (event) =>{
    setSearchValue(event.target.value);
  }

  const onClickInvite = (id) =>{
    if(invites.includes(id)){
      setInvites(prev => prev.filter(_id=>_id!==id))
    }else{
      setInvites(prev => [...prev,id]);
    }
  }

  const onClickSendInvite = () =>{
    setSuccess(true);
  }

  return (
    <div className="App">
      {success 
      ?<Success count={invites.length} />
      :<Users 
        onChangeSearchValue={onChangeSearchValue}
        searchValue={searchValue} 
        items={users} 
        isLoading={isLoading}
        invites={invites}
        onClickInvite={onClickInvite}
        onClickSendInvite={onClickSendInvite}/>}
    </div>
  )
}

export default App
