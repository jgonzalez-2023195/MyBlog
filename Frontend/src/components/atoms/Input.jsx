import React from 'react'
import styled from 'styled-components'
import { Icon } from '@iconify/react'

export const Input = ({
    field,
    text,
    value,
    change,
    showErrMsg,
    validateMsg,
    blur,
    icon,
    iconName
}) => {

    return (
        <StyledWrapper>
            <div className="container">
                {icon && (
                    <Icon icon={iconName} className='IconWrapper' />
                )}
                <input 
                    className='input'
                    required
                    value={value}
                />
                <label className="label">{text}</label>
            </div>
        </StyledWrapper>
    )
}

// ... (el StyledWrapper sigue igual)


const StyledWrapper = styled.div`
  .container {
    display: flex;
    flex-direction: column;
    gap: 7px;
    position: relative;
    color: black;
  }

  .container .label {
    font-size: 20px;
    padding-left: 10px;
    position: absolute;
    top: 13px;
    transition: 0.3s;
    
    pointer-events: none;
  }

  .input {
    width: 25em;
    height: auto;
    min-height: 50px;
    border: none;
    outline: none;
    padding: 0px 17px;
    margin-top: 5px;
    border-radius: 6px;
    color: black;
    font-size: 20px;
    background-color: transparent;
    box-shadow: 3px 3px 10px rgba(0,0,0,1),
    -1px -1px 6px rgba(255, 255, 255, 0.4);
  }

  .input:focus {
    border: 2px solid transparent;
    color: black;
    box-shadow: 3px 3px 10px rgba(0,0,0,1),
    -1px -1px 6px rgba(255, 255, 255, 0.4),
    inset 3px 3px 10px rgba(0,0,0,1),
    inset -1px -1px 6px rgba(255, 255, 255, 0.4);
  }

  .container .input:valid ~ .label,
  .container .input:focus ~ .label {
    transition: 0.3s;
    padding-left: 2px;
    transform: translateY(-35px);
  }

  .container .input:valid,
  .container .input:focus {
    box-shadow: 3px 3px 10px rgba(0,0,0,1),
    -1px -1px 6px rgba(255, 255, 255, 0.4),
    inset 3px 3px 10px rgba(0,0,0,1),
    inset -1px -1px 6px rgba(255, 255, 255, 0.4);
}`