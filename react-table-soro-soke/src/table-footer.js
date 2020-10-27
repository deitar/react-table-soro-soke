import React, { Component } from "react";
import Pagination from 'react-bootstrap/Pagination'
import Dropdown from "react-bootstrap/Dropdown";
// import './paginate';
import paginate from "./paginate";



class TableFooter extends Component {

  constructor(props) {
    super(props)
    this.state = {
        minlimit: this.props.offset+1,
        maxlimit: this.props.offset+this.props.limit,
    }
  }

  render() {

    var paginated = paginate(this.props.total, this.props.page, this.props.limit, 5)
    console.log('paginated: ', paginated)
    const paginationItems=paginated.pages.map((page)=>{
        return <Pagination.Item active={this.props.page==page} onClick={()=>this.props.paginate(page, this.props.limit)}>{page}</Pagination.Item>
    })

    return (
    <div class="fixed-table-pagination">
        <div class="float-left pagination-detail">
            <span class="pagination-info">Showing {this.state.minlimit} to {this.state.maxlimit} of 800 rows</span>
            <span class="page-list">
                <Dropdown as="btn-group" class="mr-1 ml-3">
                    <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                        {this.props.limit}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {
                            this.props.pageList.map((pageSize)=>{
                                return <Dropdown.Item onClick={()=>this.props.paginate(this.state.page, pageSize)}>{pageSize}</Dropdown.Item>
                            })
                        }
                    </Dropdown.Menu>
                </Dropdown>
                rows per page
            </span>
        </div>

        <div class="float-right pagination">
            <Pagination>
                <Pagination.First onClick={()=>this.props.paginate(1, this.props.limit)} />
                <Pagination.Prev onClick={()=>this.props.paginate((this.props.page<=1?1:this.props.page-1), this.props.limit)}/>
                {paginationItems}
                <Pagination.Next onClick={()=>this.props.paginate((this.props.page>=paginated.totalPages?paginated.totalPages:this.props.page+1), this.props.limit)}/>
                <Pagination.Last  onClick={()=>this.props.paginate(paginated.totalPages, this.props.limit)} />
            </Pagination>
        
        </div>
    </div>
    )

  }

}

export default TableFooter










// import React, { Component } from "react";
// import Pagination from 'react-bootstrap/Pagination'
// import Dropdown from "react-bootstrap/Dropdown";
// // import './paginate';
// import paginate from "./paginate";



// class TableFooter extends Component {

//   constructor(props) {
//     super(props)
//     this.state = {
//         minlimit: this.props.offset+1,
//         maxlimit: this.props.offset+this.props.limit,
//     }
//   }

//   render() {

//     var paginated = paginate(this.props.total, this.props.page, this.props.limit, 5)
//     console.log('paginated: ', paginated)
//     const paginationItems=paginated.pages.map((page)=>{
//         return <Pagination.Item active={this.props.page==page} onClick={()=>this.props.paginate(page, this.props.limit)}>{page}</Pagination.Item>
//     })

//     return (this.props.show && (
//     <div class="fixed-table-pagination">
//         <div class="float-left pagination-detail">
//             <span class="pagination-info">Showing {this.state.minlimit} to {this.state.maxlimit} of 800 rows</span>
//             <span class="page-list">
//                 <Dropdown as="btn-group" class="mr-1 ml-3">
//                     <Dropdown.Toggle variant="secondary" id="dropdown-basic">
//                         {this.props.limit}
//                     </Dropdown.Toggle>
//                     <Dropdown.Menu>
//                         {
//                             this.props.pageList.map((pageSize)=>{
//                                 return <Dropdown.Item onClick={()=>this.props.paginate(this.state.page, pageSize)}>{pageSize}</Dropdown.Item>
//                             })
//                         }
//                     </Dropdown.Menu>
//                 </Dropdown>
//                 rows per page
//             </span>
//         </div>

//         <div class="float-right pagination">
//             <Pagination>
//                 <Pagination.First onClick={()=>this.props.paginate(1, this.props.limit)} />
//                 <Pagination.Prev onClick={()=>this.props.paginate((this.props.page<=1?1:this.props.page-1), this.props.limit)}/>
//                 {paginationItems}
//                 <Pagination.Next onClick={()=>this.props.paginate((this.props.page>=paginated.totalPages?paginated.totalPages:this.props.page+1), this.props.limit)}/>
//                 <Pagination.Last  onClick={()=>this.props.paginate(paginated.totalPages, this.props.limit)} />
//             </Pagination>
        
//         </div>
//     </div>

//     )) || ''

//   }

// }

// export default TableFooter