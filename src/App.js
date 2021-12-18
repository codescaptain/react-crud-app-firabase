import './App.css';
import React, {useState, useEffect} from 'react'
import {db} from './firebase-config';
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore'

function App() {
  const [users, setUsers] = useState([]);
  const [newName, setNewName] = useState("")
  const [newAge, setNewAge] = useState(0)
  const usersCollectionRef = collection(db, "users");

  const createUser = async () => {
    await addDoc(usersCollectionRef,{name: newName, age: Number(newAge)})
    setNewName("")
    setNewAge(0)
  }

  const updateUser = async (id, age) => {
    const userDoc = doc(db, "users", id)
    const newFields = {age: age + 1}
    updateDoc(userDoc, newFields)
  }

  const deleteUser = async (id) => {
    const userDoc = doc(db, "users", id)
    await deleteDoc(userDoc)
  }

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map(doc => ({...doc.data(), id: doc.id})))
    }
    getUsers();
  }, [])

  return (
    <div className="App">

      <input 
      name="name"
      placeholder="Name..."
      value={newName}
      onChange={(e) => setNewName(e.target.value)}
      type="text" />

      <input 
      name="number"
      placeholder="Age"
      value={newAge}
      onChange={(e) => setNewAge(e.target.value)}
      type="number" />

      <button onClick={createUser}>Create User</button>
      {users.map((user, key) => (
        <div key={key}> 
          <h1>Name: {user.name}</h1>
          <h2>Age: {user.age}</h2>
          <button onClick={() => updateUser(user.id, user.age)}>Increase Age</button>
          <button onClick={() => deleteUser(user.id)}>Delere User</button>
        
        </div>

      ) )}
    </div>
  );
}

export default App;
