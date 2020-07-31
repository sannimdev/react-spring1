import React from "react";
import styled from "styled-components";
import Constant from "../Constant";

const palette = Constant.palette;

const TitleBox = styled.div`
  padding: 20px;
  border-bottom: 1px solid ${palette.lightGray};
  & > h2 {
    font-size: 1.8rem;
    font-weight: 600;
    margin-bottom: 20px;
  }
  & > ul > li {
    display: inline-block;
    &:not(:last-child)::after {
      position: relative;
      top: 2px;
      margin: 0 10px;
      display: inline-block;
      content: "";
      width: 1px;
      height: 15px;
      background-color: ${palette.lightGray};
    }
  }
`;

const ContentBox = styled.div`
  padding: 35px 20px;
`;

const ContentWrapper = styled.div`
  width: 100%;
  min-height: 300px;
  border-top: 2px solid ${palette.darkGray};
  border-bottom: 1px solid ${palette.darkGray};

  ${TitleBox},
  ${ContentBox} {
    box-sizing: border-box;
  }
`;
function BoardContent({ data }) {
  if (!data) return null;
  const { result, item } = data;
  if (!item || !result || result !== "ok") return <div>게시물 불러오기 실패</div>;
  return (
    <ContentWrapper>
      <TitleBox>
        <h2>{item.title}</h2>
        <ul>
          <li>작성일: {item.created}</li>
          {item.updated !== item.created && <li>수정일: {item.updated}</li>}
          <li>작성자: {item.nickname}</li>
        </ul>
      </TitleBox>
      <ContentBox>{item.content}</ContentBox>
    </ContentWrapper>
  );
}

export default BoardContent;
