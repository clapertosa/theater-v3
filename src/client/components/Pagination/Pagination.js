import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import qs from "query-string";
import ReactPaginate from "react-paginate";
import styles from "./Pagination.scss";

class Pagination extends Component {
  componentDidMount = () => {
    const params = qs.parse(this.props.location.search);
    if (params.page > this.props.totalPages) {
      window.location.href = `${this.props.location.pathname}?page=${
        this.props.totalPages
      }`;
    } else if (params.page < 1) {
      window.location.href = `${this.props.location.pathname}?page=${1}`;
    }
  };

  changePage = e => {
    const params = qs.parse(this.props.location.search);
    console.log("params", params.page);
    console.log("selected", e.selected);
    window.location.href = `${this.props.location.pathname}?page=${e.selected +
      1}`;
  };

  onHrefBuilder = page => {
    return `${this.props.location.pathname}?page=${page}`;
  };

  render() {
    return (
      <div className={styles.container}>
        <ReactPaginate
          disableInitialCallback
          onPageChange={e => this.changePage(e)}
          hrefBuilder={page => this.onHrefBuilder(page)}
          previousLabel="<"
          nextLabel=">"
          pageCount={this.props.totalPages}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          previousClassName={styles.previousClassName}
          nextClassName={styles.nextClassName}
          breakClassName={styles.breakClassName}
          containerClassName={styles.containerClassName}
          pageClassName={styles.pageClassName}
          activeClassName={styles.activeClassName}
          disabledClassName={styles.disabledClassName}
          initialPage={this.props.page}
        />
      </div>
    );
  }
}

export default withRouter(Pagination);
