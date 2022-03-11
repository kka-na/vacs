import styled from "styled-components"
import {NavLink as Link} from "react-router-dom"
import {FaBars} from "react-icons/fa"

export const Nav = styled.nav`
    margin-top: 0;
    background: linear-gradient(135deg, #362577, #85dcf5, #274f8a);
    padding-bottom: 4px;
`;

export const NavSpan = styled.nav`
    margin-top: 0;
    background: #0c1024;
    height: 80px;
    display: flex;
    justify-content: space-between;
    padding: 0.5rem ;
    z-index: 10;   
`;

export const NavLink = styled(Link)`
margin-top: 0;
    color: #fff;
    display: flex;
    align-items: center;
    font-size: 25px;
    text-decoration: none;
    padding: 0 1rem;
    height: 100%;
    cursor: pointer;    
    &.active{
        color: #85dcf5;
    }
    &:hover{
        transition: all 0.2s ease-in-out;
        color: #85dcf5;
    }
`;

export const Bars = styled(FaBars)`
margin-top: 0;
    display: flex;
    align-items: center;
    text-decoration: none;
    cursor: pointer;
    display: none;
    color: #fff;
    padding: 0 0.3rem;
    @media screen and (max-width: 768px){
        display: block;
        position: absolute;
        align-itmes:center;
        top: 20;
        right: 0;
        transform: translate(-100%, 75%);
        font-size: 1.8rem;
        cursor: pointer;
    }
    
`;

export const NavMenu = styled.div`
    display: flex;
    align-items: center;
    margin-right: -24px;
    @media screen and (max-width: 768px){
        display: none;
    }
   
`;

export const NavBtn = styled.nav`
    display: flex;
    align-items: center;
    margin-right: 24px;
    @media screen and (max-width: 768px){
        display: none;
    }
`;
 
export const NavBtnLink = styled(Link)`
    border-radius: 4px;
    padding: 10px 22px;
    color: #fff;
    font-size: 22px;
    border: none;
    outline: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;
    &:hover{
        transition: all 0.2s ease-in-out;
        background: #85dcf5;
        color: #0c1024;
    }
`;



