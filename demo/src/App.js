import React from "react";
// import "./styles.css";
import ReactTableSoroSoke from "react-table-soro-soke";

export default function App() {
  let tableOptions = {
    "data-url":
      "https://examples.wenzhixin.net.cn/examples/bootstrap_table/data",

    "data-show-refresh": true,
    "data-show-columns": true,
    "data-show-columns-toggle-all": true,
    "data-show-export": true,
    "data-toolbar-id": "toolbar",
    "data-search": true,
    "data-pagination": true,
    size: "sm",
    columns: [
      [
        {
          title: "ID", //compulsory
          field: "id",
          sortable: true,
          align: "left",
          valign: "middle",
          rowspan: 2,
          show: false
        },
        {
          title: "Cover Up",
          colspan: 2,
          align: "center",
          valign: "middle"
        }
      ],
      [
        {
          title: "Name",
          field: "name",
          sortable: true,
          formatter: sampleFormatter
        },
        {
          title: "Price",
          field: "price"
        }
      ],
      // [
      //   {
      //     title: "Tank",
      //     field: "tank",
      //     sortable: true,
      //     formatter: sampleFormatter
      //   },
      //   {
      //     title: "Cool",
      //     field: "cool"
      //   }
      // ]
    ],
    "data-page-list": [10, 25, 50, 100, "all"]
  };

  function sampleFormatter(value, row, index) {
    return "<strong>" + value + "</strong>";
  }

  function rr() {
    window.reactTableSoroSoke.removeRows();
  }

  function ss() {
    window.reactTableSoroSoke.addRows();
  }

  return (
    <div className="App container">
      <div id="toolbar">
        <button
          id="remove"
          onClick={() => rr()}
          class="btn btn-danger"
          disabled=""
        >
          <i class="fa fa-trash"></i> Delete
        </button>
        <button id="" onClick={() => ss()} class="btn btn-success" disabled="">
          <i class="fa fa-plus"></i> Add
        </button>
      </div>
      <ReactTableSoroSoke tableOptions={tableOptions} />
    </div>
  );
}
