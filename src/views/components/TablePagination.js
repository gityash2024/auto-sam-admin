import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

const TablePagination = ({ totalPages = 1, currentPage = 1, pageUrl = "" }) => {
  const location = useLocation();
  const [buttonOut, setButtonOut] = useState([]);

  const history = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const parameters = {};
  for (let [key, value] of searchParams) {
    parameters[key] = value;
  }

  useEffect(() => {
    //console.log("totalPages - >",totalPages);
    let startPage = 1;
    if (currentPage - 2 > 1) {
      startPage = currentPage - 2;
    }

    let lastPage = startPage + 5;
    if (lastPage > totalPages) {
      lastPage = totalPages;
    }

    const renderedItems = [];
    for (let i = startPage; i <= lastPage; i++) {
      let isActive = "";
      if (i === currentPage) {
        isActive = "active";
      }
      renderedItems.push(
        <PaginationItem className={isActive} key={`pageNo${i}`}>
          <PaginationLink
            onClick={() => handlePageChange(i)}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
    setButtonOut(renderedItems);
  }, [location]);

  const handlePageChange = (curPage) => {
    //setCurrentPage(pageNumber);
    parameters.page = curPage;
    let newUrl = "";
    let cur = "";
    for (const key in parameters) {
      cur = key + "=" + parameters[key];
      if (newUrl === "") {
        newUrl = pageUrl + cur;
      } else {
        newUrl += "&" + cur;
      }
      //console.log(`${key}: ${parameters[key]}`);
      history(newUrl);
    }
  };
  return (
    <>
      <nav aria-label="...">
        <Pagination
          className="pagination justify-content-end mb-0"
          listClassName="justify-content-end mb-0"
        >
          {currentPage !== 1 && (
            <>
              <PaginationItem className="" key="prevKey">
                <PaginationLink
                  onClick={() => handlePageChange(currentPage - 1)}
                  tabIndex="-1"
                >
                  <i className="fas fa-angle-left" />
                  <span className="sr-only">Previous</span>
                </PaginationLink>
              </PaginationItem>
            </>

          )}
          {buttonOut}
          {currentPage !== totalPages && (
            <>
              <PaginationItem key="nextKey">
                <PaginationLink
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  <i className="fas fa-angle-right" />
                  <span className="sr-only">Next</span>
                </PaginationLink>
              </PaginationItem>
            </>
          )}
        </Pagination>
      </nav>
    </>
  );
};

export default TablePagination;