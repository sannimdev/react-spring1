import React, { useReducer, useState, useContext } from "react";
import axios from "axios";
import styled from "styled-components";
import LoginInput from "../Components/LoginInput";
import { MemberContext } from "../App";

//useReducer 복습
const ACTION_LOADING = "LOADING";
const ACTION_SUCCESS = "SUCCESS";
const ACTION_ERROR = "ERROR";

const initialState = {
  loading: false,
  data: null,
  error: null,
};

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
      return new Error(`Unhandled Action Error :${action.type}`);
  }
}

const Button = styled.button`
  width: 100%;
`;

const Wrapper = styled.div`
  max-width: 1080px;
  margin: 0 auto;

  & > h1 + div {
    background-color: aliceblue;
    width: 300px;
    margin: 0 auto;

    ${Button} {
      margin-top: 10px;
    }
  }
`;

function Member({ history }) {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  const [state, dispatch] = useReducer(reducer, initialState);
  const [memberInfo, setMemberInfo] = useContext(MemberContext);

  const fetchLogin = async () => {
    dispatch({ type: ACTION_LOADING });
    try {
      const response = await axios.post("http://localhost:9090/spring1/member/login", {
        memberId: "test",
        password: "test",
      });
      dispatch({ type: ACTION_SUCCESS, data: response.data });
      return response.data;
    } catch (error) {
      dispatch({ type: ACTION_ERROR, error });
    }
  };

  const onClick = async (e) => {
    e.preventDefault();
    const result = await fetchLogin();
    //로그인 성공
    if (result.login && result.login === "success") {
      console.log(result, "결과");
      setMemberInfo({
        logined: true,
        nickname: result.member.nickname,
        memberId: result.member.memberId,
        memberNo: result.member.memberNo,
        lastLogin: result.member.lastLogin,
      });
      history.push("/board");
    }
  };

  const { loading, data, error } = state;
  if (loading) return "로그인 중...";
  if (error) return "로그인 도중 오류가 발생했습니다. " + error;

  return (
    <Wrapper>
      <h1>회원 로그인</h1>
      <div>
        {data && data.login && data.login === "failure" && <p>로그인에 실패하였습니다.</p>}
        <form>
          <LoginInput
            value={id}
            setValue={setId}
            labelText={"아이디"}
            placeholder={"아이디를 입력하세요"}
          />
          <LoginInput
            type="password"
            value={pw}
            setValue={setPw}
            labelText={"비밀번호"}
            placeholder={"비밀번호를 입력하세요"}
          />
          <Button type="submit" onClick={(e) => onClick(e)}>
            로그인
          </Button>
        </form>
      </div>
    </Wrapper>
  );
}

export default Member;
