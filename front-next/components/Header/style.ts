import styled from '@emotion/styled';
import { css, jsx } from '@emotion/react'

export const Header = styled.header`
  width: 100%;
  position: relative;
  z-index: 9999;
  border-bottom: 1px solid rgba(0, 0, 0, .0975);
  background: #fff;
  order: 0;
  align-items: center;
  height: 54px;
`;

export const Wrapper = styled.nav`
  max-Width: 975px;
  width: 100vh;
  padding: 0 20px;
  margin-left: auto;
  margin-right: auto;
  align-items: center;
  display: flex;
  flex-direction: row;
  height:54px;
`;

export const Nav1 = styled.div`
  flex: 1 9999 0%;
  min-width: 40px;
`;

export const Nav2 = styled.div`
    height: 28px;
    flex: 0 1 auto;
    min-width: 125px;
    width: 215px;
`;

export const Nav3 = styled.div`
  flex: 1 9999 0%;
  min-width: 40px;
  text-align: right;
`;

export const Search = styled.input`
  background: rgba(var(--b3f,250,250,250),1);
  border: solid 1px rgba(var(--b6a,219,219,219),1);
    border-radius: 3px;
    color: rgba(var(--i1d,38,38,38),1);
    outline: 0;
    padding: 3px 10px 3px 26px;
    z-index: 2;
`;