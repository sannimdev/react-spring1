import React, { useReducer, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import BoardList from "../Components/BoardList";
import { withRouter } from "react-router-dom";

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

function Board({ match, location }) {
  const {
    params: { command },
  } = match;
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

        {!command && <BoardList data={data} />}
        {command && !isNaN(command) && <div>게시글</div>}
      </ArticleWrapper>
    </Wrapper>
  );
}

export default withRouter(Board);
