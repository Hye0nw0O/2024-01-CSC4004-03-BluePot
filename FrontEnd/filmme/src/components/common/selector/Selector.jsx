import React from "react";
import * as S from "./style";
import OptionArrow from "../../../assets/images/Common/option_arrow.svg"

function Selector({ options, getCurrentOption }) {
  const onChange = e => {
    getCurrentOption(e.target.value);
  };
  return (
    <>
      <S.SelectorSelect onChange={onChange}>
        {options.map((option, idx) => (
          <S.SelectorOption value={option.value} key={idx}>
            {option.title}
          </S.SelectorOption>
        ))}
      </S.SelectorSelect>
    </>
  );
}
export default Selector;