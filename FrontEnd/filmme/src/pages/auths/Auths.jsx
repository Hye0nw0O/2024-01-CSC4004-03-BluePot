import React from 'react';
import * as S from "./style.jsx";
import AOS from 'aos';
import LoginpageImage from "../../assets/images/Login/LoginpageImage.png";
import LoginButton from "../../assets/images/Login/LoginButton.png";

function Auths() {
    return (
        <>
            <div className='login' data-aos="zoom-in">
                <S.LoginImage src={LoginpageImage} alt="LoginpageImage"/>
                <S.LoginButton src={LoginButton} alt="LoginButton"/>
            </div>
        </>
    );
}

export default Auths;