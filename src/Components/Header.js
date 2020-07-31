import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const borderColor = "#dee2e6";
const headerHeight = "80px";
const HeaderWrapper = styled.div`
  width: 100%;
  border-bottom: 1px solid ${borderColor};
`;
const TitleType = styled.h1`
  font-size: 2rem;
  font-weight: 900;
  display: inline-block;
`;
const Gnb = styled.ul`
  & > li {
    display: inline-block;
    &:not(:first-child) {
      margin-left: 20px;
    }
  }
`;
const HeaderInner = styled.div`
  min-width: 1024px;
  max-width: 1280px;
  height: ${headerHeight};
  margin: 0 auto;
  & > * {
    height: ${headerHeight};
    line-height: ${headerHeight};
    user-select: none;
  }
  ${TitleType} {
    padding-left: 3rem;
    float: left;
  }
  ${Gnb} {
    padding-right: 3rem;
    float: right;
    & li {
      cursor: pointer;
    }
  }
`;

function Header() {
  return (
    <HeaderWrapper>
      <HeaderInner>
        <TitleType>
          <Link to="/">React</Link>
        </TitleType>
        <Gnb>
          <li>
            <Link to="/board">게시판</Link>
          </li>
          <li>
            <Link to="/member/login">로그인</Link>
          </li>
          <li>홍길동님</li>
          <li>로그아웃</li>
        </Gnb>
      </HeaderInner>
    </HeaderWrapper>
  );
}

export default Header;
