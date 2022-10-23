import React,{useState,useEffect, Fragment} from 'react'
import axios from 'axios';
import './userList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRemove, faEdit } from '@fortawesome/free-solid-svg-icons'
import EditableRow from './EditableRow';
import Pagination from './Pagination';

export default function UserList() {
    const [list,setList]=useState([]);
    const [checkAll,setCheckAll]=useState(false);
    const [editFormData,setEditFormData]=useState({
        name:"",
        email:"",
        role:"",
    });
    const [editContactId,setEditContactId]=useState(null);
    const [userSelectedList,setUserSelectedList]=useState([]);
    const [search,setSearch]=useState('')
    const [currentPage, setCurrentPage] = useState(1);
    const [employeesPerPage] = useState(10)

    const indexOfLastEmployee = currentPage * employeesPerPage;
    const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
    const currentEmployees = list.slice(indexOfFirstEmployee, indexOfLastEmployee);
    const totalPagesNum = Math.ceil(list.length / employeesPerPage);



    useEffect(()=>{
        axios.get("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json").then(res=>{setList(res.data)})
            },[] )

        const handleChange=(e)=>{
                const {name, checked ,value}=e.target;
                console.log(name , checked , "SAIBABA")
                if(name==="checkAll"){
                    setCheckAll(checked)
                    let tempList=list.map((user)=>{
                        return {...user ,isChecked:checked};                        
                    });
                    console.log(tempList,"Hanumannnnn")
                    setList(tempList);
                }else{
                    setUserSelectedList([...userSelectedList,value])
                    let tempList=list.map((user)=>
                    user.name===name?{...user,isChecked:checked}:user)
        
                    setList(tempList);
                    // setCheckAll(list.every(item=>item.isChecked))
                    let sampleList=list.filter((each)=>each.isChecked===false)
                    console.log(sampleList) 
                    setCheckAll(sampleList.length>=1 && false)      
                };
            }

        const handleEditFormChange=(event)=>{
                event.preventDefault();
                const fieldName=event.target.getAttribute("name");
                const fieldValue=event.target.value;

                const newFormData={...editFormData}
                newFormData[fieldName]=fieldValue;
                setEditFormData(newFormData)
            }

        const handleEditClick=(event,contact)=>{
            event.preventDefault();
            console.log(contact.name)
            console.log(event.target.id,"evennnnnnnnnnntttt")
            setEditContactId(contact.id)

            const formValues={
                name:contact.name,
                email:contact.email,
                role:contact.role,
            }
            setEditFormData(formValues)
        }

        const handleEditFormSubmit=(e)=>{
            e.preventDefault();
            const editedContact={
                id:editContactId,
                name:editFormData.name,
                email:editFormData.email,
                role:editFormData.role,
            }
            const newContacts=[...list]
            const index=list.findIndex((contact)=>contact.id===editContactId)
            newContacts[index]=editedContact;
            setList(newContacts)
            setEditContactId(null)
        }

        const handleCancelClick=()=>{
            setEditContactId(null)
        }

        const deleteListItem=(e)=>{
            console.log(e.target.id)
            const singleItemDeletedList=list.filter((each)=>{return each.id!==e.target.id})
            setList(singleItemDeletedList)
        }

        const deleteAllHandler=()=>{
            const multiDeletedList=list.filter(eachRecord=>{return !userSelectedList.includes(eachRecord.id)})
            setList(multiDeletedList)
        }

        const searchHandler=(e)=>{
            setSearch(e.target.value);
            // const searchedList=list.filter((item)=>item.name.toLowerCase().includes(search))
            //  setList(searchedList)
        }

  return (
    <center>
    <input type='search' placeholder='search by name, email or role' onChange={searchHandler} style={{"width":"100%" ,"padding":"9px"}}/>

    <h1>SAIBABA</h1>
    <div className='fixed-top'>
      <input type="checkbox" name="checkAll" id="selectAll" checked={checkAll} onChange={handleChange}/>
      <label htmlFor='selectAll'>Name</label>
      <label htmlFor='selectAll'>Email</label>
      <label htmlFor='selectAll'>Role</label>
      <label htmlFor='selectAll'>Actions</label>
    </div>
    <ul className='user-list'>
        {list.length>=1?
        <div>
         {currentEmployees.filter((item)=>item.name.toLowerCase().includes(search)).map((item)=>(
            <Fragment>
                {editContactId===item.id? (<form onSubmit={handleEditFormSubmit}>
            <EditableRow handleEditFormChange={handleEditFormChange} handleCancelClick={handleCancelClick} editFormData={editFormData}/>
            </form>) :
            
           ( <li className='listItem' key={item.id} >
            <input type='checkbox' name={item.name} value={item.id} id={item.id} checked={item.isChecked}  onChange={handleChange}/>
            <label >{item.name}</label>
            <label htmlFor={item.id}>{item.email}</label>
            <label htmlFor={item.id}>{item.role}</label>

            <div className='icons'>
            <button className='icon1' id={item.id} onClick={deleteListItem}><FontAwesomeIcon id={item.id} onClick={deleteListItem} icon={faRemove} color="red"  /> </button>
                <button onClick={(e)=>handleEditClick(e,item)} type="button" id={item.id}  ><FontAwesomeIcon id={item.id} icon={faEdit} color="black"  /> </button>
            </div>

            </li>)}
            </Fragment>
        ))}

        <div className='btm-container'>
           {userSelectedList.length>=1 &&  <button className='btn-delete' onClick={deleteAllHandler}>Delete Selected</button>}
            <Pagination pages = {totalPagesNum} setCurrentPage={setCurrentPage} currentEmployees ={currentEmployees} sortedEmployees = {list} />
        </div>
    </div>:<p>No data Found</p>}
    </ul>
    </center>

    )
}
