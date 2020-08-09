import React, { useState, useContext } from "react";
import styled from "styled-components";
import { MemberContext } from "../App";
import TextArea from "./TextArea";
import Input from "./Input";

const BoardWrapper = styled.div`
  border-top: 2px solid #3e3e3e;
  border-bottom: 2px solid #3e3e3e;
`;

const TitleInput = styled(Input)``;
const ContentArea = styled(TextArea)``;

const BoardTable = styled.table`
  width: 100%;
  & > thead > tr {
    height: 50px;
    line-height: 50px;
    & > td:first-child {
      font-size: 1.1rem;
      width: 30%;
      background-color: #f6f6f6;
    }
    & > td:last-child {
      text-align: left;
      padding: 0 20px;
    }
  }
  & > tbody > tr > td {
    width: 100%;
    & > textarea {
      margin: 20px 0;
      width: 100%;
      height: 200px;
      border: 0;
      resize: none;
    }
  }
`;

const ButtonWrapper = styled.ul`
  width: 100%;
  height: 50px;
`;

function BoardWrite({ title, setTitle, content, setContent, onWrite, onCancel }) {
  const [memberInfo] = useContext(MemberContext);
  return (
    <>
      <BoardWrapper>
        <BoardTable>
          <thead>
            <tr>
              <td>제목</td>
              <td>
                <TitleInput value={title} setValue={setTitle} />
              </td>
            </tr>
            <tr>
              <td>작성자</td>
              <td>
                {memberInfo.nickname}({memberInfo.memberId})
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="2">
                <ContentArea value={content} setValue={setContent} />
              </td>
            </tr>
          </tbody>
        </BoardTable>
      </BoardWrapper>
      <ButtonWrapper>
        <li>
          <button type="button" onClick={(e) => onWrite(e)}>
            글쓰기
          </button>
        </li>
        <li>
          <button type="button" onClick={(e) => onCancel(e)}>
            취소
          </button>
        </li>
      </ButtonWrapper>
    </>
  );
}

export default BoardWrite;
