




import './App.css';
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function App() {
  const [users, setUsers] = useState([]);
  const API = "http://localhost:3000/data";

  const [open, setOpen] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const response = await axios.get(API);
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteUser(id) {
    try {
      await axios.delete(`${API}/${id}`);
      setUsers(users.filter(user => user.id !== id));
    } catch (error) {
      console.log(error);
    }
  }

  function handleAdd() {
    setOpen(true);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      name: e.target["Name"].value,
      email: e.target["Email"].value,
      phone: e.target["Phone"].value,
      city: e.target["City"].value,
      status: e.target["Status"].value == true?"Active":"Inactive",
      img: e.target["Avatar"].value,
    };
    try {
      await axios.post(API, newUser);
      await loadData();
      setOpen(false);
      e.target.reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {open && (
        <dialog open>
          <form onSubmit={handleSubmit}>
            <input type="text" name="Name" placeholder="Имя" />
            <input type="email" name="Email" placeholder="Email" />
            <input type="text" name="Phone" placeholder="Телефон" />
            <input type="text" name="City" placeholder="Город" />
            <input type="text" name="Avatar" placeholder="Ссылка на аватар" />
         
            <select name="Status" id="">
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
            <div style={{ marginTop: "10px" }}>
              <button type="submit">Сохранить</button>
              <button type="button" onClick={() => setOpen(false)}>Отмена</button>
            </div>
          </form>
        </dialog>
      )}

      <button className='addBtn' onClick={handleAdd}>+ADD</button>

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
                <img src={el.img} alt={el.name} width="50" height="50" style={{ borderRadius: "50%", marginRight: "10px" }} />
                <div>
                  <p>{el.name}</p>
                  <p>{el.email}</p>
                </div>
              </td>
              <td>{el.phone}</td>
              <td>{el.city}</td>
              <td>{el.status == true ? "Active" : "Inactive"}</td>
              
              <td>
                <button onClick={() => deleteUser(el.id)}>dele</button>
                <button>edit</button>
                {/* <button>dele</button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
