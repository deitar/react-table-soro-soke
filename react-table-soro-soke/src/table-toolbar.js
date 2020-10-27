import React, { Component } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import TableToolbarRefresh from './table-toolbar-refresh';
import TableToolbarColumns from "./table-toolbar-columns";
import TableToolbarExport from "./table-toolbar-export";
import './utils';


class TableToolbar extends Component {

  constructor(props) {
    super(props);
    // this.state = {
    //   tableOptions: this.props.tableOptions,
    //   columns: this.props.shownColumns
    // };
  }

  componentDidMount() {
    this.customToolBarConstruction();
  }

  customToolBarConstruction() {
    var toolbarId = this.props.tableOptions["data-toolbar-id"];
    if (toolbarId) {
      var toolbarElem = document.getElementById(toolbarId);
      var parentElem = document.getElementById("toolbar-soro-soke");
      if (toolbarElem && parentElem) {
        parentElem.appendChild(toolbarElem);
      }
    }
  }

  render() {
    return (
      <div class="fixed-table-toolbar">
        <div class="bs-bars float-left">
          <div id="toolbar-soro-soke"></div>
        </div>

        <div class="columns columns-right btn-group float-right">
          <TableToolbarRefresh show={this.props.tableOptions["data-show-refresh"]} refresh={this.props.refresh} />

          <TableToolbarColumns show={this.props.tableOptions["data-show-columns"]} 
          showToggleAll = {this.props.tableOptions["data-show-columns-toggle-all"]} 
          allColumns={this.props.allColumns} setColumnVisibility={this.props.setColumnVisibility} />

          <TableToolbarExport shownColumns={this.props.shownColumns} displayColumns={this.props.displayColumns}
          show={this.props.tableOptions["data-show-export"]} getDataUrl={this.props.getDataUrl} />
          {/* export={this.props.export} */}
        </div>

        {this.props.tableOptions["data-search"] && (
          <div class="float-right search btn-group">
            <input class="form-control search-input" type="search" placeholder="Search" autocomplete="off" onChange={(e)=>this.props.search(e.target.value)} />
          </div>
        )}
      </div>
    );
  }
}

export default TableToolbar;


