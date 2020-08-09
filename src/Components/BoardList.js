import React, { useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Constant from "../Constant";
import Pager from "../Pager";
import { MemberContext } from "../App";

const palette = Constant.palette;

const BoardContainer = styled.div`
  & > table {
    width: 100%;
    border-top: 2px solid ${palette.darkGray};
    border-bottom: 1px solid ${palette.darkGray};
    & thead tr {
      border-bottom: 1px solid ${palette.lightGray};
      height: 70px;
      font-weight: 600;
      line-height: 70px;
    }
    & tbody tr {
      height: 50px;
      line-height: 50px;
      border-bottom: 1px solid #e0e0e0;
      &:hover {
        background-color: #f8f9fa;
      }
    }
  }
`;

function BoardList({ data, page, history }) {
  const [memberInfo] = useContext(MemberContext);
  if (!data) return null;
  const { items, result, current_page, page_count } = data;
  if (!result || result !== "ok" || !items) return null;
  const pages = Pager.paging(current_page, page_count);
  const onClick = (e) => {
    history.push("/board/write");
  };

  return (
    <BoardContainer>
      <table>
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>작성일</th>
            <th>조회수</th>
            <th>작성자</th>
          </tr>
        </thead>
        <tbody>
          {items &&
            items.map((item, idx) => (
              <tr key={item.no}>
                <td>{Pager.getPageStartNumber(page) + idx}</td>
                <td>
                  <Link to={`/board/${item.no}`}>{item.title}</Link>
                </td>
                <td>{item.created}</td>
                <td>{item.views}</td>
                <td>{item.nickname}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <div>
        {pages && (
          <ul>
            {pages.map((p) => (
              <li key={p} style={{ display: "inline-block" }}>
                <Link to={`/board?page=${p}`}>{p}&nbsp;</Link>
              </li>
            ))}
          </ul>
        )}
      </div>
      {memberInfo && memberInfo.memberNo && (
        <div>
          <button type="button" onClick={(e) => onClick(e)}>
            글쓰기
          </button>
        </div>
      )}
    </BoardContainer>
  );
}

export default BoardList;
