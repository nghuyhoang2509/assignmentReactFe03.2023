import { useState, useEffect } from 'react'
import './App.css'

function App() {
  // Start Countdown section
  const [activeTimeline, setActiveTimeline] = useState(false);
  const [timeline, setTimeline] = useState(0);
  let countInterval

  useEffect(()=>{
    if (activeTimeline){
      countInterval = setInterval(() => {
        setTimeline((prev)=>
          prev-1
        )
      }, 1000);
    }else{
      clearInterval(countInterval)
    }
    return ()=>{
      clearInterval(countInterval)
    }
  },[activeTimeline])

  useEffect(() => {
    if (timeline ==0){
      setActiveTimeline(false)
    }
  }, [timeline])
  
  const startOnClick = ()=>{
    setActiveTimeline(true)
  }
  const resetOnClick = ()=>{
    setTimeline(0)
  }
  // End Countdown section

  //Start Form section
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [studentID, setStudentID] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState({name: false, email: false, studentID: false, phone: false});
  const checkName = ()=>{
    if (name.length <2){
      setError({...error,name: true})
    }else{
      setError({ ...error,name: false})
    }
  }
  const checkEmail = ()=>{
    const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!regexEmail.test(email)){
      setError({...error,email: true})
    }else{
      setError({ ...error,email: false})
    }
  }
  const checkStudentID = ()=>{
    if (studentID.length !=8){
      setError({...error,studentID: true})
    }else{
      setError({ ...error,studentID: false})
    }
  }
  const checkPhone = ()=>{
    if (phone.length !=10){
      setError({...error,phone: true})
    }else{
      setError({ ...error,phone: false})
    }
  }
  const onSubmit = ()=>{
    if (!(error.name || error.email || error.studentID || error.phone)){
      alert(JSON.stringify({name, email, studentID, phone}))
    }else{
      alert("Invalid Form")
    }
  }
  //End Form section

  //Start Todo section
  const [status,setStatus] = useState("add") 
  const [todoList, setTodoList] = useState([])
  const [inputTodo, setInputTodo] = useState("")
  const [indexEdit, setIndexEdit] = useState(null)

  const todoButtonClick = ()=>{
    if (status == "add" && inputTodo.length >0){
      localStorage.setItem('todo', JSON.stringify([inputTodo,...todoList]))
      setTodoList([inputTodo,...todoList])
    }
    if (status =="edit" && inputTodo.length >0){
      todoList[indexEdit] = inputTodo
      localStorage.setItem('todo', JSON.stringify([...todoList]))
      setTodoList([...todoList])
      setStatus("add")
      setIndexEdit(null)

    }
    if (status =="edit" && inputTodo.length ==0){
      setStatus("add")
      setIndexEdit(null)
    }
    setInputTodo("")

  }
  useEffect(() => {
    let list = []
    if (!localStorage.getItem("todo")){
      list = []
    }else{
      list = JSON.parse(localStorage.getItem("todo"))
    }
    setTodoList(list)
  },[])

  const onEditTodo = (index)=>{
    setStatus("edit")
    setInputTodo(todoList[index])
    setIndexEdit(index)
  }

  function onDeleteTodo(index){
    todoList.splice(index,1)
    localStorage.setItem('todo', JSON.stringify(todoList))
    setTodoList([...todoList])
  }

  //End Todo section

  //Start call Api section
    const [listUser,setlistUser] = useState([])
    useEffect(()=>{
      fetch("https://jsonplaceholder.typicode.com/users")
      .then((res)=>res.json())
      .then(res=> setlistUser(res))
      .catch(()=> console.log("fail"))
    },[])
  //End call Api section

  return (
    <div className='container'>
      <div className='task'>
        <h1>1.Countdown</h1>
        <div className='time-line'>
          <input type='number' value={Math.floor(timeline/60)} onChange={(e)=> setTimeline(prev => prev+60)}/>
          <h5>mins</h5>
          <input type='number' value={timeline%60} onChange={(e)=> setTimeline(prev=> prev+1)}/>
          <h5>secs</h5>
        </div>
        <div className='control'>
          <input type="button" onClick={startOnClick} value={"start"}/>
          <input type="button" onClick={resetOnClick} value={"reset"} />
        </div>
      </div>
      <div className='task'>
        <h1>2. K18 Recruitment</h1>
          <div className='field'>
            <h5>Name</h5>
            <input type='text' onBlur={checkName} value={name} onChange={(e)=> setName(e.target.value) }/>
            {error.name ?<i>Name must be at least 2 characters</i>:<></> }
            
          </div>
          <div className='field'>
            <h5>Email</h5>
            <input type='email' onBlur={checkEmail} value={email} onChange={(e)=> setEmail(e.target.value)}/>
            {error.email ?<i>Invalid Email</i>:<></> }
          </div>
          <div className='field'>
            <h5>Student ID</h5>
            <input type='text' onBlur={checkStudentID} value={studentID} onChange={(e)=> setStudentID(e.target.value)}/>
            {error.studentID ?<i>Invalid Student ID</i>:<></> }
          </div>
          <div className='field'>
            <h5>Phone number</h5>
            <input type='text' onBlur={checkPhone} value={phone} onChange={(e)=> setPhone(e.target.value)}/>
            {error.phone ?<i>Invalid Phone</i>:<></> }
          </div>
          <input type='button' value={"Submit"} onClick={onSubmit}/>   
      </div>
      <div className='task'>
        <h1>3. Todo list</h1>
        <div className='add-todo'>
          <input type='text' value={inputTodo} onChange={(e)=> setInputTodo(e.target.value)}/>
          <input type='button' value={status} onClick={todoButtonClick}/>
        </div>
        <ul className='todo-list'>
          {todoList?.map((todo,index)=>
          <li key={index} className='todo'>
            <h5>{todo}</h5>
            <input type='button' onClick={()=>onDeleteTodo(index)} value={"x"}/>
            <input type='button' onClick={()=>onEditTodo(index)}value={"Edit"}/>
          </li>
          )}
        </ul>
      </div>
      <div className='task'>
        <h1>4. Call API</h1>
        <ul>
          {listUser.map((user)=><li key={user.id}><h5>Name: {user.name}</h5><h5>Email: {user.email}</h5></li>)}
        </ul>
      </div>
    </div>
  )
}

export default App
