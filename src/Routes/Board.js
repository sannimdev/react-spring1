import React, { useReducer, useEffect, useRef, useContext, useState } from "react";
import styled from "styled-components";
import qs from "qs";
import axios from "axios";
import { MemberContext } from "../App";
import BoardList from "../Components/BoardList";
import { withRouter } from "react-router-dom";
import BoardContent from "../Components/BoardContent";
import BoardWrite from "../Components/BoardWrite";

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

function Board({ match, location, history }) {
  const {
    params: { command },
  } = match;
  const query = qs.parse(location.search, { ignoreQueryPrefix: true });
  const { page } = query;
  const [currentPage, setCurrentPage] = useState(1);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [memberInfo] = useContext(MemberContext);
  const fetchData = async (uri) => {
    dispatch({ type: ACTION_LOADING });
    try {
      const response = await axios.get(uri);
      dispatch({ type: ACTION_SUCCESS, data: response.data });
    } catch (error) {
      dispatch({ type: ACTION_ERROR, error });
    }
  };
  //글쓰기 상태정보
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  useEffect(() => {
    if (query && page) {
      // console.log(query.page + "변경");
      // savedPage.current = query.page;
      setCurrentPage(page);
    }
  }, [page, query]);

  useEffect(() => {
    //페이지 파라미터가 넘어오면...
    // console.log(memberInfo);

    // console.log("command:", command, "page=", savedPage.current, ", query.page=", page);
    if (!command) {
      //게시글 목록
      fetchData(`http://localhost:9090/spring1/board/list?page=${currentPage}`);
    } else if (!isNaN(command)) {
      //게시글 조회
      fetchData(`http://localhost:9090/spring1/board/${command}`);
    }
    // console.log("useEffect 구문 실행", page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [command, currentPage]);

  //글 삭제
  const onDelete = (boardNo) => {
    const { data } = axios.delete(`http://localhost:9090/spring1/board/${boardNo}`);
    history.push("/board");
    //게시글을 삭제하고 페이지 값에 변화를 주어야 페이지를 새로 렌더링한다.(=> 게시글을 새로 불러온다)
    setCurrentPage(1);
  };

  //글쓰기버튼 클릭
  const submitData = async () => {
    const body = { title, content };
    const { data } = await axios.post("http://localhost:9090/spring1/board/write", { ...body });
    if (data.result && data.result === "ok") {
      setTitle("");
      setContent("");
      history.push("/board");
    }
  };
  const onWrite = (e) => {
    console.log("글쓰기 버튼 클릭");
    submitData();
  };
  //글쓰기 취소버튼 클릭
  const onCancel = (e) => {
    history.push("/board");
  };

  const { loading, data, error } = state;
  if (loading) return "로딩 중";
  if (error) return "오류 " + error;
  return (
    <Wrapper>
      <ArticleWrapper>
        <TitleType>게시판</TitleType>
      </ArticleWrapper>
      <ArticleWrapper>
        {!command && (
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
        {!command && <BoardList data={data} page={currentPage} history={history} />}
        {command === "write" && (
          <BoardWrite
            onWrite={onWrite}
            onCancel={onCancel}
            title={title}
            setTitle={setTitle}
            content={content}
            setContent={setContent}
          />
        )}
        {command && !isNaN(command) && (
          <BoardContent data={data} page={currentPage} onDelete={onDelete} />
        )}
      </ArticleWrapper>
    </Wrapper>
  );
}

export default withRouter(Board);
