
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import TableToolbar from "./table-toolbar";
import "./table.css";
import Loader from "./loader";
import Error from "./error";
import TableFooter from "./table-footer";

class ReactTableSoroSoke extends React.Component {
  constructor(props) {
    super(props);
    window.reactTableSoroSoke = this;
    this.state = {
      tableOptions: props.tableOptions,
      data: {},
      offset: 0,
      limit: props.tableOptions["data-page-list"][0],
      page: 1,
      search: "",
      loading: true,
      displayColumns:[]
    };
  }

  componentDidMount() {
    this.initColumnSelection(); //determine columns to show based on property "show"
    this.getData();
  }

  initColumnSelection(){

    var cc = [...this.state.tableOptions.columns]
    cc.map((arr)=>{
      arr.map((col)=>{
        if(col['show']==undefined||col['show']==null){
          col['show']=true
        }
      })
    })

    console.log('cc: ',cc)

    this.setState({tableOptions:{
      ...this.state.tableOptions,
      columns: cc
    }}, ()=>{console.log(this.state.tableOptions.columns)})

    this.getDisplayColumns()
    
  }
  
  getDataUrl(pagination=true){
    // add search to url
    var url = this.state.tableOptions["data-url"] + `?search=${this.state.search}`;
    // add sorting and ordering to url
    this.state.tableOptions.columns.forEach((arr) => {
      arr.forEach((col) => {
        if (col.sortable && col.order) {
          url = url + `&sort=${col.field}&order=${col.order}`;
        }
      });
    });
    // add pagination to url
    if (pagination && this.state.tableOptions["data-pagination"]) {
      url = url + `&offset=${this.state.offset}&limit=${this.state.limit}`;
    }
    return url
  }

  async getData() {
    
    this.setState({ loading: true, error:null }, async () => {
      await fetch(this.getDataUrl(true))
        .then((res) => res.json())
        .then(
          (result) => {
              this.setState(
                {
                  data: result,
                  loading: false
                }             
              );  
          },
          (error) => {
            this.setState({
              data: [],
              loading: false,
              error
            });
          }
        );
    });

  }

  refresh() {
    this.setState({page:1, offset:0},()=>{this.getData()})
  }

  get fields() {
    return this.shownColumns.map((col) => {
      return col["field"];
    });
  }

  get shownColumns() {
    var cols = []
    this.allColumns.forEach((column)=>{
      if(this.showColumn(column)){
        cols.push(column)
      }
    })
    return cols
  }

  get allColumns(){
    var cols = []
    this.state.tableOptions.columns.forEach((arr)=>{
      arr.forEach((col)=>{
        if ("field" in col) {
          cols.push(col);
        }
      })
    })
    return cols;
  }

  showColumn(column){
    // return column["show"]==undefined||column["show"]==null||column["show"]==true
    return column["show"]==true
  }

  getDisplayColumns(){
    var ret=[]
    for (let i = 0; i < this.state.tableOptions.columns.length; i++) {
      const arr = this.state.tableOptions.columns[i];
      var innerArr=[]
      for (let j = 0; j < arr.length; j++) {
        const column = arr[j];
        if(this.showColumn(column)){
          innerArr.push(column)
        }
      }
      if(innerArr.length>0){
        ret.push(innerArr)
      }
    }

    this.setState({displayColumns: ret})
    console.log('display Columns: ', ret)
  }

  get rows() {
    return this.state.data["rows"] ? this.state.data["rows"] : [];
  }

  get total() {
    return this.state.data["total"] ? this.state.data["total"] : 0;
  }

  removeRows(field) {
    //field determines what field name to use for removing rows in api call; likely a primary key
    alert("bread");
  }

  addRows() {
    alert("rice");
  }

  sortColumn(columnField) {
    var cols = Object.assign([], this.state.tableOptions.columns);
    cols = cols.map((arr) => {
      return arr.map((col) => {
        var order = null;
        if (col.field === columnField) {
          order = col.order === "desc" ? "asc" : "desc";
        }
        col.order = order;
        return col;
      });
    });
    this.setState({ columns: cols }, () => this.getData());
  }

  setColumnVisibility(fieldsVisibilityDict){
    // debugger;
    var cc = [...this.state.tableOptions.columns]
    cc.map((arr)=>{
      arr.map((col)=>{
        Object.keys(fieldsVisibilityDict).map((field)=>{
          if(col['field']==field){
            col['show']=fieldsVisibilityDict[field]
          }
        })
      })
    })

    this.setState({tableOptions:{
      ...this.state.tableOptions,
      columns: cc
    }})

    this.getDisplayColumns()
  }

  paginate(page, pageSize){
    var offset = (page-1) * pageSize
    var limit = pageSize
    this.setState({offset:offset, limit:limit, page:page}, 
      ()=>this.getData())
  }

  search(searchText){
    this.setState({search:searchText}, ()=>this.getData())
  }

  render() {
    return (
      <div className="react-table-soro-soke">
        <TableToolbar
          refresh={this.refresh.bind(this)}
          shownColumns={this.shownColumns}
          allColumns={this.allColumns}
          displayColumns={this.state.displayColumns}
          tableOptions={this.state.tableOptions}
          getDataUrl={this.getDataUrl.bind(this)}  
          search={this.search.bind(this)}
          setColumnVisibility={this.setColumnVisibility.bind(this)} 
        />
        <table className={"table table-bordered "+ (`table-${this.state.size}`)}>
          <thead>
            {this.state.displayColumns.map((row) => {
              return (
                <tr>
                  {row.map((col) => {
                    return (
                      <th colSpan={col.colspan ? col.colspan : 1} rowSpan={col.rowspan ? col.rowspan : 1}
                        style={{"text-align": col["align"] ? col["align"] : "",
                          "vertical-align": col["valign"] ? col["valign"] : ""}}>
                        {col.sortable ? (
                          <div className={"th-inner sortable both " + (col.order ? col.order : "")}
                            onClick={this.sortColumn.bind(this, col.field)}>
                            {col.title}
                          </div>
                        ) : (
                          col.title
                        )}
                      </th>
                    );
                  })}
                </tr>
              );
            })}
          </thead>
          <tbody>
            
          {
            this.state.error==true ? (
              <tr>
                <td colspan={this.fields.length}>
                  <Error />
                </td>
              </tr>
            ) : 
            (
              <React.Fragment>
                {
                  this.state.loading && (<tr><td colspan={this.fields.length}><Loader /></td></tr>)
                }
                {
                  this.rows.map((item, rowindex) => {
                    return (
                      <tr>
                        {
                        this.shownColumns.map((col, colindex) => {
                          var field = col["field"];
                          var val = item[field];

                          return (
                            <td>
                              {col.formatter ? (
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html: col.formatter(val, rowindex, colindex)
                                  }}
                                ></div>
                              ) : (
                                val
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })
                }
              </React.Fragment>

            )
            
            }
          </tbody>
        </table>
        <TableFooter limit={this.state.limit} offset={this.state.offset} page={this.state.page} pageList={this.state.tableOptions["data-page-list"]} 
        show={this.state.tableOptions["data-pagination"]} paginate={this.paginate.bind(this)} total={this.total} />
      </div>
    );
  }
}

export default ReactTableSoroSoke;




