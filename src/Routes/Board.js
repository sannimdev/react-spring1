import React, { useReducer, useEffect, useState, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import BoardList from "../Components/BoardList";
import { withRouter } from "react-router-dom";
import BoardContent from "../Components/BoardContent";
import qs from "qs";
import Pager from "../Pager";

const Wrapper = styled.div`
  padding: 50px 0;
`;

const ArticleWrapper = styled.div`
  width: 100%;
  & > div {
    margin: 30px auto;
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
  const query = qs.parse(location.search, { ignoreQueryPrefix: true });
  const page = useRef(1);
  const [state, dispatch] = useReducer(reducer, initialState);
  const fetchData = async (uri) => {
    dispatch({ type: ACTION_LOADING });
    try {
      const response = await axios.get(uri);
      dispatch({ type: ACTION_SUCCESS, data: response.data });
    } catch (error) {
      dispatch({ type: ACTION_ERROR, error });
    }
  };

  useEffect(() => {
    if (query && query.page) page.current = query.page;

    console.log("command:", command);
    if (!command) {
      //게시글 목록
      fetchData(`http://localhost:9090/spring1/board/list?page=${page.current}`);
    } else if (!isNaN(command)) {
      //게시글 조회
      fetchData(`http://localhost:9090/spring1/board/${command}`);
    }
    console.log("useEffect 구문 실행", page);
  }, [command, page]);

  const { loading, data, error } = state;
  if (loading) return "로딩 중";
  if (error) return "오류 " + error;

  return (
    <Wrapper>
      <ArticleWrapper>
        <TitleType>게시판</TitleType>
      </ArticleWrapper>
      <ArticleWrapper>
        {(!command || isNaN(command)) && (
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
        )}

        {!command && <BoardList data={data} />}
        {command && !isNaN(command) && <BoardContent data={(data, page)} />}
      </ArticleWrapper>
    </Wrapper>
  );
}

export default withRouter(Board);
