import React, { useReducer, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

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
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 80px;
  background-color: #f0f0f0;
  & > * + * {
    margin-left: 20px;
  }
`;

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
/////TODO: 리듀서 나중에 모듈로 빼 내기
const ACTION_LOADING = "LOADING";
const ACTION_SUCCESS = "SUCCESS";
const ACTION_ERROR = "ERROR";

function reducer(state, action) {
  switch (action.type) {
    case ACTION_LOADING:
      return {
        loading: true,
        data: null,
        error: null,
      };
    case ACTION_SUCCESS:
      return {
        loading: false,
        data: action.data,
        error: null,
      };
    case ACTION_ERROR:
      return {
        loading: false,
        data: null,
        error: action.error,
      };
    default:
      throw new Error(`Unhandled Action Error: ${action.type}`);
  }
}

const initialState = {
  loading: false,
  data: null,
  error: null,
};

function Board() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const fetchData = async () => {
    dispatch({ type: ACTION_LOADING });
    try {
      const response = await axios.get("http://localhost:9090/spring1/board/list");
      console.log(response);
      dispatch({ type: ACTION_SUCCESS, data: response.data });
    } catch (error) {
      dispatch({ type: ACTION_ERROR, error });
    }
  };

  useEffect(() => {
    fetchData();
    console.log("실행");
  }, []);

  const { loading, data, error } = state;
  if (loading) return "로딩 중";
  if (error) return "오류 " + error;

  return (
    <Wrapper>
      <ArticleWrapper>
        <TitleType>게시판</TitleType>
      </ArticleWrapper>
      <ArticleWrapper>
        <SearchBoxInner>
          <select>
            <option defaultValue="titlecontent">제목+내용</option>
            <option value="title">제목</option>
            <option value="content">내용</option>
            <option value="nickname">작성자</option>
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
              {data &&
                data.items &&
                data.items.map((item, idx) => (
                  <tr key={item.no}>
                    <td>{idx + 1}</td>
                    <td>{item.title}</td>
                    <td>{item.created}</td>
                    <td>{item.views}</td>
                    <td>{item.nickname}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </BoardContainer>
      </ArticleWrapper>
    </Wrapper>
  );
}

export default Board;
