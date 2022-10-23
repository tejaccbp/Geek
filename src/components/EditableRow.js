import React from 'react';

export default function ({editFormData,handleEditFormChange,handleCancelClick}) {
  return (
    <div className='listItem'>
     <input type='checkbox' style={{"visibility":"hidden"}} />
     <input value={editFormData.name} type="text" placeholder='Enter name' name='name' required='required' onChange={handleEditFormChange}/>
     <input value={editFormData.email} type="email" placeholder='Enter email' name='email' required='required' onChange={handleEditFormChange}/>
     <input value={editFormData.role} type="text" placeholder='Enter role' name='role' required='required' onChange={handleEditFormChange}/>
    <div>
        <button type='submit'>SAVE</button>
        <button type='button' onClick={handleCancelClick}>CANCEL</button>
    </div>
    </div>
  )
}
