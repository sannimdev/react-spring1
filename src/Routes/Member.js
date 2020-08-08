import React, { useReducer, useState, useContext } from "react";
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
  const memberContext = useContext(MemberContext);
  const onClick = (e) => {
    e.preventDefault();
    memberContext.setInfo({
      logined: true,
      nickname: "데모길동",
      memberId: "test",
      memberNo: -1,
      lastLogin: new Date(),
    });
    console.log(history);
    history.push("/board");
  };

  return (
    <Wrapper>
      <h1>회원 로그인</h1>
      <div>
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
