import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


function App() {
  const [todo, setTodo]= useState('');
  const [showFinished, setShowFinished]= useState(false);
  const [todos, setTodos]= useState([]);

  const handleChange= (e)=>{
setTodo(e.target.value);
  }
  const handleAdd=()=>{
setTodos([...todos, {id:uuidv4(), todo, isCompleted:false}])
setTodo('');
  }
  const toggleFinished=()=>{
setShowFinished(!showFinished)
  }

  const handleCheckbox=(e)=>{
    let id = e.target.name;
    let index = todos.findIndex(i=>{
      return i.id ===id;
    })
    let newTodos= [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
  }
  const handleEdit=(e, id)=>{
    let t= todos.filter(i=>i.id ===id)
    setTodo(t[0].todo);
    let newTodos= todos.filter(item=>{
      return item.id!==id;
    })
    setTodos(newTodos);
  }


  const handleDelete=(e, id)=>{
    let newTodos = todos.filter(item=>{
      return item.id!==id;
    });
    setTodos(newTodos);

  }

  return (
    <>
      <Navbar />
      <div className="mx-9 my-10 rounded-xl p-5 bg-green-100 h-screen">
        <h1 className=' font-bold text-center text-3xl'>Do-It -Your Task Manager</h1>
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className='text-2xl font-bold '>Add a Todo</h2>
          <div className="flex">

            <input type="text" onChange={handleChange} value={todo} className='w-full rounded-full px-5 py-1' />
            <button onClick={handleAdd} disabled={todo.length<3} className='bg-green-800 mx-2 rounded-xl hover: bg-green-950 disabled:bg-green-500 p-4 text-sm font-bold text-white' >Add</button>
          </div>
        </div>

        <input type="checkbox" className='my-4' id='show' onChange={toggleFinished} checked={showFinished} />
        <label htmlFor='show'className='mx-2'>Show Finished</label>

      <div className=' h-[1px] bg-black opacity-15 w-[90%] mx-auto my-2'></div>
      <h2 className="text-2xl font-bold">Your Todos</h2>
      <div className="todos">
{todos.length===0 && <div className='m-5'>
  No Todos to display</div>}

{todos.map(item=>{
  return  (showFinished || !item.isCompleted)&& <div key={item.id} className=' todo flex my-3 justify-between'>
    <div className="flex gap-5">
      <input type="checkbox" name= {item.id} onChange={handleCheckbox} checked={item.isCompleted}  id= ""/>
      <div className={item.isCompleted?"line-through": ""}>{item.todo}</div>
      </div>
    <div className="buttons flex h-full">

      <button onClick={(e)=>handleEdit(e, item.id)} className='bg-green-800 hover:bg-green-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'><FaEdit/></button>
      <button onClick={(e)=>handleDelete(e, item.id)} className='bg-green-800 hover:bg-green-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'><MdDelete/></button>



    </div>
    </div>
})}
      </div>


      </div>
    </>
  )
}

export default App
