import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const Nav = styled.nav`
    height: 72px;
    padding: 0px 16px;
    display: flex;
    flex-direction: row;
    position: sticky;
    z-index: 0;
    justify-content: space-between;
    align-items: center;
    flex-shrink: 0;
    font-family: Pretendard-Medium;
    background-color: #fff;
`;

export const Logo = styled.div`
    display: flex;
    width: 60%;
    height: 60%;

    @media screen and (max-width: 768px) {
        width: 30%;
        height: 30%;
    }
`;

export const NavTabWrapper = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 40px;
    font-size: 20px;
    font-weight: 700;
    line-height: 24px;

    @media screen and (max-width: 768px) {
        display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
        flex-direction: column;
        width: 160px;
        min-height: 125px;
        position: fixed;
        top: 72px;
        right: 10px;
        background-color: #fff;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 20;
        align-items: center;
        padding: 10px;
        gap: 20px;
        border-radius: 10px;
    }
`;

export const NavTab = styled(NavLink)`
    display: flex;
    font-size: ${({ isOpen }) => (isOpen ? '16px' : '16px')};
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-decoration-line: none;
    color: #343030;

    &.active {
        font-family: Pretendard-Bold;
        color: #161835;
    }
`;