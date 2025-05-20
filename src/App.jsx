import './App.css';
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function App() {
  const [users, setUsers] = useState([]);
  const API = "http://localhost:3000/data";

  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const [editUserData, setEditUserData] = useState(null)
  const [theme, setTheme] = useState("light")
  const [searchTerm , setSearchTerm]=useState("")


  useEffect(() => {
    get();
  }, []);

  useEffect(() => {
    document.body.className = theme
  }, [theme])



  async function get() {
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
    setEditUserData(null)
    setOpen(true);
  }

  function handleEdit(user) {
    setEditUserData(user)
    setOpenEdit(true)
  }

  async function addUser(newUser) {
    try {
      await axios.post(API, newUser)
       get()
    } catch (error) {
      console.log(error);
    }
  }

  async function editUser(id, updateUser) {
    try {
      await axios.put(`${API}/${id}`, updateUser)
     get()
    } catch (error) {
      console.log(error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      name: e.target["Name"].value,
      email: e.target["Email"].value,
      phone: e.target["Phone"].value,
      city: e.target["City"].value,
      status: e.target["Status"].value == true ? "Active" : "Inactive",
      img: e.target["Avatar"].value,
    };

    if (editUserData) {
      await editUser(editUserData.id, newUser)
    }
    else {
      await addUser(newUser)
    }
    form.reset()
    setOpen(false)
    setEditUserData(null)
  };

  const filteredUsers = users.filter((user)=>{
    const search = searchTerm.toLowerCase();
    return(
      user.name.toLowerCase().includes(search)||
      user.email.toLowerCase().includes(search)||
      user.city.toLowerCase().includes(search)
    )
  })


  return (
    <>



           {open && (
        <dialog open>
          <form className='form' onSubmit={handleSubmit}>
            <h2>Добавить пользователя</h2>
            <input type="text" name="Name" placeholder="Имя" required />
            <input type="email" name="Email" placeholder="Email" required />
            <input type="text" name="Phone" placeholder="Телефон" />
            <input type="text" name="City" placeholder="Город" />
            <input type="text" name="Avatar" placeholder="Ссылка на аватар" />
            <select name="Status" defaultValue="Active">
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            <div style={{ marginTop: "10px" }}>
              <button type="submit">Добавить</button>
              <button type="button" onClick={() => { setOpen(false); setEditUserData(null); }}>Отмена</button>
            </div>
          </form>
        </dialog>
      )}

      {openEdit && (
        <dialog open>
          <form className='form' onSubmit={handleSubmit}>
            <h2>Редактировать пользователя</h2>
            <input type="text" name="Name" placeholder="Имя" defaultValue={editUserData?.name || ""} required />
            <input type="email" name="Email" placeholder="Email" defaultValue={editUserData?.email || ""} required />
            <input type="text" name="Phone" placeholder="Телефон" defaultValue={editUserData?.phone || ""} />
            <input type="text" name="City" placeholder="Город" defaultValue={editUserData?.city || ""} />
            <input type="text" name="Avatar" placeholder="Ссылка на аватар" defaultValue={editUserData?.img || ""} />
            <select name="Status" defaultValue={editUserData?.status || "Active"}>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            <div style={{ marginTop: "10px" }}>
              <button type="submit">Сохранить изменения</button>
              <button type="button" onClick={() => { setOpenEdit(false); setEditUserData(null); }}>Отмена</button>
            </div>
          </form>
        </dialog>
      )}


      <header>
        <div className='header'>

        <h1>User List</h1>
        <div style={{ display: "flex", gap: "20px" }}>

          <button className='addBtn' onClick={handleAdd}>+ADD</button>
         

        
          <div className="dark_light">
            <button className="toggle-btn" onClick={() => setTheme("light")}>☀️ Light Mode</button>
            <button className="toggle-btn" onClick={() => setTheme("dark")}>🌙 Dark Mode</button>
          </div>

        </div>
        </div>


        <div className='search_select'>


          <div className='select'>
            <p style={{color:"gray"}}>Status</p>
            <select name="" id="">
              <option value="all">All</option>
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
          </div>
          <div className='search'>
            <p>Search</p>
            <input type="text" placeholder='Search...' onChange={(e)=> setSearchTerm(e.target.value)} />
          </div>
        </div>
      </header>

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
          {filteredUsers.map((el) => (
            <tr key={el.id}>
              <td style={{ display: "flex", alignItems: "center", textAlign: "start" }}>
                <img src={el.img} alt={el.name} width="50" height="50" style={{ borderRadius: "50%", marginRight: "10px" }} />
                <div>
                  <p style={{ fontSize: "20px" }}>{el.name}</p>
                  <p style={{ color: "gray" }}>{el.email}</p>
                </div>
              </td>
              <td>{el.phone}</td>
              <td>{el.city}</td>
              <td>{el.status == true ? "Active" : "Inactive"}</td>

              <td>
                <button onClick={() => deleteUser(el.id)}>dele</button>
                <button onClick={() => handleEdit(el)}>edit</button>
                {/* <button>dele</button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

