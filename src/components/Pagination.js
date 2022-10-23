// import React from 'react'

// export default function Pagination({data ,pageHandler}) {
//     const pageNumbers=[];
//     for(let i=1; i<Math.ceil(data.length/10)+1 ;i++){
//         pageNumbers.push(i);
//     }
//   return (
//     <div> 
//         <center>
//             {pageNumbers.map(page=>{
//                   return <span style={{"border":"1px solid black","padding":"4px","margin":"4px","cursor":"pointer","borderRadius":"5rem"}} onClick={()=>{pageHandler(page)}}>{page}</span>})} 
//         </center>
//     </div>
//   )
// }


import { useEffect, useState } from "react";

const Pagination = ({pages, setCurrentPage, currentEmployees, sortedEmployees}) => {


    const numOfPages = [];

    for (let i=1; i <= pages; i++) {
        numOfPages.push(i);
    }

    const [currentButton, setCurrentButton] = useState(1);

    useEffect(() => {
        setCurrentPage(currentButton);
    }, [currentButton, setCurrentPage])

    return (
        <div className="clearfix">
        <div className="hint-text">Showing <b>{currentEmployees.length}</b> out of <b>{sortedEmployees.length}</b> entries</div>
        <ul className="pagination">
            <li className={`${currentButton === 1 ? 'page-item disabled' : 'page-item' }`}><a href="#!"
                onClick = { () => setCurrentButton((prev) => prev === 1 ? prev : prev - 1)}
            >Previous</a></li>
{
            numOfPages.map((page, index) => {
                return (
                    <li key={index} className={`${currentButton === page ? 'page-item active' : 'page-item' }`}><a href="#!" className="page-link"
                        onClick = {()=>setCurrentButton(page)}
                    >{page}</a></li> 
                )
            })

}

<li className={`${currentButton === numOfPages.length ? 'page-item disabled' : 'page-item' }`}><a href="#!"
                onClick = { () => setCurrentButton((next) => next === numOfPages.length ? next : next + 1)}
            >Next</a></li>
        </ul>
    </div>
    )
}

export default Pagination;

