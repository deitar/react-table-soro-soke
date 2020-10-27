import React, { Component } from "react";
import Dropdown from "react-bootstrap/Dropdown";
// import { CSVLink } from "react-csv";
// import { CSVDownload } from "react-csv";
// import axios from 'axios';

class TableToolbarExport extends Component {

  constructor(props) {
    super(props)
    // this.csvlink=useRef(null);
    this.state = {
      csvFilename: "table_export.csv"
    }
  }

  getCsvContent(rows){
    var prefix = "data:text/csv;charset=utf-8" 
    var csv = []
    var header = this.props.displayColumns.map((arr)=>{
      return arr.map((col)=>{ return col["title"] })
    })
    // tranform rows into nested arrays
    rows.forEach((row)=>{
      var csvrow=[]
      this.props.shownColumns.forEach(col=>{
        var val = row[col['field']]
        val = val!=undefined && val!=null? val: ''
        csvrow.push(val)
      })
      csv.push(csvrow)
    })
    // add header to csv if it has value
    csv = header && header.length>0? header.concat(csv) : csv
    return prefix+","+csv.map(e => Object.values(e).join(",")).join("\n");
  }

  csvDownload() {
    this.exportDataFromUrl((rows)=>{
      let csvContent = this.getCsvContent(rows)
      var encodedUri = encodeURI(csvContent);
      var link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", this.state.csvFilename);
      document.body.appendChild(link); 
      link.click();
    })
    
  };

  exportDataFromUrl(callback){
    fetch(this.props.getDataUrl(false))
    .then((res)=>res.json())
    .then((res) => { 
      console.log('res.rows: ', res.rows)
      callback(res.rows)
    },
    (error) => {
      alert(error)
    })
  }

  render() {
    return (this.props.show && (
      <React.Fragment>
        {/* <CSVLink id="csvlink" data={this.state.td}></CSVLink> */}
        {/* <CSVDownload data={this.state.td} target="_blank" /> */}

        <Dropdown className="btn-group" alignRight="true">
          <Dropdown.Toggle variant="secondary" id="dropdown-basic">
            <i class="fa fa-download"></i>
          </Dropdown.Toggle>

          <Dropdown.Menu className="dropdown-menu-right">
            <Dropdown.Item as='button' onClick={() => this.csvDownload()}>CSV</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </React.Fragment>

    )) || ''

  }

}

export default TableToolbarExport