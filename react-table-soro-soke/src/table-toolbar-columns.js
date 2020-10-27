import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownPersist from "./dropdownPersist";
import Form from "react-bootstrap/Form";


function DropdownItem(props) {
  var name = props.name
  var field = props.field
  var label = props.label
  var visibilityDict ={}

  function callBack(e){
    var checked = e.target.checked
    if(field=="all"){
      props.allColumns.forEach((item)=>{
        visibilityDict[item['field']]=checked
      })
      props.setColumnVisibility(visibilityDict)
    }
    else{
      visibilityDict[field]=checked
      props.setColumnVisibility(visibilityDict)
    }
    
  }

  return <Dropdown.Item as="div" className="form-check pr-0">
    <Form.Check id={name} checked={props.show} type="checkbox" label={label} onChange={(e)=>callBack(e)} />
  </Dropdown.Item>
}

export default function TableToolbarColumns(props) {

  return (
    props.show && (
      <DropdownPersist className="btn-group" alignRight="true">
        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
          <i class="fa fa-th-list"></i>
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {
            props.showToggleAll &&
            (
              <React.Fragment>
                <DropdownItem field="all" allColumns={props.allColumns} name="column-check-toggle-all" label="Toggle All" setColumnVisibility={props.setColumnVisibility} />
                <Dropdown.Divider />
              </React.Fragment>
            )
          }

          {
            props.allColumns.map((col) => {
              return (
                <DropdownItem field={col['field']} show={col["show"]} name={"column-check-" + col["field"]} label={col["title"]} setColumnVisibility={props.setColumnVisibility} />
              );
            })
          }
        </Dropdown.Menu>
      </DropdownPersist>
    )
  ) || ''


}