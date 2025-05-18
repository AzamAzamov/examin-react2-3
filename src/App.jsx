import './App.css';
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function App() {
  const [users, setUsers] = useState([]);
  const API = "http://localhost:3000/data";

  useEffect(() => {
    async function get() {
      try {
        const response = await axios.get(API);
        setUsers(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    get();
  }, []);


  async function deleteUser(id) {
    try {
      await axios.delete(`${API}/${id}`)
      setUsers(users.filter(user => user.id !== id));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>

    <dialog>
      <form action="">
        <input type="text" name='addName'  />
        <input type="text"  />
      </form>
    </dialog>
      <button style={{width:"100px",height:"42px",borderRadius:"10px",backgroundColor:"#2196F3",color:"white",border:"0"}}>+ADD</button>
      <h1 style={{ textAlign: "center" }}>Список пользователей</h1>
      <table border="1" cellPadding="10" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>

            <th>Имя</th>

            <th>Телефон</th>
            <th>Город</th>
            <th>Статус</th>
            <th>Движуха</th>
          </tr>
        </thead>
        <tbody>
          {users.map((el) => (
            <tr key={el.id}>
              <td style={{ display: "flex", alignItems: "center", textAlign: "start" }}>

                <img src={el.img} alt={el.name} width="50" height="50" style={{ borderRadius: "50%" }} />

                <div><p>{el.name}</p>  <p>{el.email}</p> </div></td>

              <td>{el.phone}</td>
              <td>{el.city}</td>
              <td>{el.status == true ? "Active" : "Inactive"}</td>
              <td>
                <button onClick={()=>deleteUser(el.id)}>dele</button>
                <button>edit</button>
                <button>dele</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
