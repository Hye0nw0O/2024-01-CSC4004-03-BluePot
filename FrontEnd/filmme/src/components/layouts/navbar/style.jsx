import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const Nav = styled.nav`
    height: 72px;
    padding: 0px 16px;
    display: flex;
    flex-direction: row;
    position: sticky;
    z-index: 10;
    justify-content: space-between;
    align-items: center;
    flex-shrink: 0;
    font-family: Pretendard-Medium;
`;

export const Logo = styled.div`
    display: flex;
`;

export const NavTabWrapper = styled.div`
    display: flex;
    display: flex;
    align-items: flex-start;
    gap: 40px;
    font-size: 20px;
    font-weight: 700;
    line-height: 24px;
`;

export const NavTab = styled(NavLink)`
    display: flex;
    font-size: 20px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-decoration-line: none;
    color: #343030;
`;