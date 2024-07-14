import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import './App.css'
import Navbar from './components/navbar'

function App() {
  const [todo, setTODO] = useState('');
  const [showFinished, setShowFinished] = useState(false);
  const [todos, setTodos] = useState([]);

  const handleChange = (e) => {
    setTODO(e.target.value);
  }

  const handleAdd =()=> {
    setTodos([...todos,{id:uuidv4(), todo, isCompleted:false}])
    setTODO('');
  }

  const toggleFinished = ()=>{
    setShowFinished(!showFinished)
  }

  const handleCheckbox = (e)=>{
    let id = e.target.name;
    let index = todos.findIndex(i=>{return i.id ===id;})
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos); 
  }

  const handleEdit = (e,id)=>{
    let t = todos.filter(i=>i.id === id )
    setTODO(t[0].todo);
    let newTodos = todos.filter(item=>{
      return item.id!== id;
    });
    setTodos(newTodos);

  }

  const handleDelete = (e,id) => {
    let newTodos = todos.filter(item=> {
      return item.id!==id;
    } );
    setTodos(newTodos);
  }
  



  return (
    <>
      <Navbar />
      <div className="mx-9 my-10 rounded-xl p-5 bg-blue-100 h-screen">
        <h1 className='font-bold text-center text-2xl '>Your Task Manager</h1>
        <div className="add-to-do my-5 flex-col gap-4">
          <h2 className="text-2xl font-bold"> Add a Task</h2>
          <div className="flex">
            <input type="text" className="w-full rounded-full px-5 py-1" onChange={handleChange} value={todo} />
            <button onClick={handleAdd} disabled={todo.length<3} className='bg-blue-800 mx-2 rounded-xl hover: bg-blue-950 disabled: bg-blue-500 p-4 text-sm font-bold text-white'>Add </button>
          </div>
        </div>

        <input type="checkbox" name="" id="show" className='my-4' onChange={toggleFinished} checked={showFinished} />
        <label htmlFor='show' className='mx-2'>Show Finished</label>

        <div className="bg-black h-[1px] w-[90%] mx-auto my-2 opacity-15 "> </div> 

        <h2 className="text-2xl font-bold"> Your ToDO's</h2>

        <div className="todos">
          {todos.length === 0 && <div className='m-5'> NO TODOS to display</div> } 

          {todos.map(item=>{return (showFinished || !item.isCompleted) && <div key={item.id} className='todo flex my-3 justify-between' >
              <div className='flex gap-5 '>
                <input type="checkbox" name={item.id} id="" onChange={handleCheckbox} checked= {item.isCompleted} />
                <div className={item.isCompleted?"line-through":""}>{item.todo}</div>

              </div>
              <div className="buttons flex h-full ">
                <button onClick={()=> handleEdit(e,item.id)} className='bg-blue-800 hover:bg-blue-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'> 
                  Edit
                </button>
                <button onClick={()=> handleDelete(e,item.id)} className='bg-blue-800 hover:bg-blue-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'> 
                  Delete
                </button>
              </div>

          </div>})}

        </div>
      
      </div>
     
    </>
  )
}

export default App

