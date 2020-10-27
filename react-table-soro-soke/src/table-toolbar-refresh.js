import React from "react";


export default function TableToolbarRefresh(props){
 return (props.show && (
    <button
      class="btn btn-secondary"
      type="button"
      name="refresh"
      aria-label="Refresh"
      title="Refresh"
      onClick={()=>props.refresh()}
    >
      <i class="fa fa-sync"></i>
    </button>
  )
 )||''
 

}