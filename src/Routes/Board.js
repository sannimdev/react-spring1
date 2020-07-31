import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  padding: 50px 0;
`;

const ArticleWrapper = styled.div`
  width: 100%;
  & > div {
    margin: 0 auto;
    max-width: 1280px;
  }
  & + & {
    margin-top: 30px;
  }
`;

const TitleType = styled.h1`
  display: inline-block;
  position: relative;
  font-size: 2rem;
  font-weight: 700;
  &::after {
    position: absolute;
    content: "";
    clear: both;
    display: block;
    width: 100%;
    height: 15px;
    bottom: -5px;
    z-index: -1;
    background-color: #dcebfb;
  }
`;

const SearchBoxInner = styled.div`
  width: 100%;
  height: 80px;
  background-color: #f0f0f0;
`;

const BoardContainer = styled.div`
  & > table {
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

function Board() {
  return (
    <Wrapper>
      <ArticleWrapper>
        <TitleType>게시판</TitleType>
      </ArticleWrapper>
      <ArticleWrapper>
        <SearchBoxInner>
          <select>
            <option selected>제목+내용</option>
            <option>제목</option>
            <option>내용</option>
            <option>작성자</option>
          </select>
          <input type="text" />
          <button type="submit">검색</button>
        </SearchBoxInner>
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
              <tr>
                <td>1</td>
                <td>제목을 씁니다.</td>
                <td>2020.07.28.</td>
                <td>1</td>
                <td>홍길동</td>
              </tr>
              <tr>
                <td>2</td>
                <td>제목을 씁니다.</td>
                <td>2020.07.28.</td>
                <td>1</td>
                <td>홍길동</td>
              </tr>
              <tr>
                <td>3</td>
                <td>제목을 씁니다.</td>
                <td>2020.07.28.</td>
                <td>1</td>
                <td>홍길동</td>
              </tr>
            </tbody>
          </table>
        </BoardContainer>
      </ArticleWrapper>
    </Wrapper>
  );
}

export default Board;
