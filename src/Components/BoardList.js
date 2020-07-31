import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const BoardContainer = styled.div`
  & > table {
    margin-top: 40px;
    width: 100%;
    border-top: 2px solid #343a40;
    border-bottom: 1px solid #343a40;
    & thead tr {
      border-bottom: 1px solid #e0e0e0;
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

function BoardList({ data }) {
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
          {data &&
            data.items &&
            data.items.map((item, idx) => (
              <tr key={item.no}>
                <td>{idx + 1}</td>
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
    </BoardContainer>
  );
}

export default BoardList;