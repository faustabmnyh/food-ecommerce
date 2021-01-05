import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Pagination.css";

const Pagination = ({ postsPerPage, totalPosts, paginate, linkPage }) => {
  const [link, setLink] = useState("");
  const [pageNav, setPageNav] = useState(1);
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  useEffect(() => {
    setLink(linkPage);
    paginate(pageNav);
  }, [linkPage, pageNav, paginate]);
  const handlePaginate = (pageNumber) => {
    setPageNav(pageNumber);
  };
  return (
    <div className="pagination">
      <ul className="pagination__nav">
        <div className="pagination__container">
          {pageNav > 1 && (
            <li className="paginate__pageItem">
              <Link
                onClick={() => setPageNav(pageNav - 1)}
                to={link}
                className="nav__pageLink"
              >
                prev
              </Link>
            </li>
          )}
          {pageNumbers.map((pageNumber) => (
            <li className="paginate__pageItem" key={pageNumber}>
              <Link
                onClick={() => handlePaginate(pageNumber)}
                to={link}
                className="nav__pageLink"
              >
                {pageNumber}
              </Link>
            </li>
          ))}
          {pageNav < pageNumbers.length && (
            <li className="paginate__pageItem">
              <Link
                onClick={() => setPageNav(pageNav + 1)}
                to={link}
                className="nav__pageLink"
              >
                next
              </Link>
            </li>
          )}
        </div>
      </ul>
    </div>
  );
};

export default Pagination;
