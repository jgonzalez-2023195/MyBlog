import React from 'react'
import styled from 'styled-components'
import { Icon } from '@iconify/react'

export const Input = ({ 
    field,
    holder, 
    type, 
    value, 
    change,
    showErrMsg,
    validateMsg,
    blur,
    textarea,
    icon,
    iconName
}) => {
    return (
        <InputWrapper>
            {icon && (
                    <Icon icon={iconName} className='IconWrapper' />
                )
            }
            <StyledInput
                type={type}
                placeholder={holder}
                $hasIcon={icon}
            />
        </InputWrapper>
    )
}


const InputWrapper = styled.div`
    position: relative;
    .IconWrapper{
        position: absolute;
        width: 25;
        height: 25;
        left: 0.75rem;
        top: 50%;
        transform: translateY(-50%);
        color: red;
    }
`

const StyledInput = styled.input`
    width: 50%;
    padding: 0.5rem 2rem;
    padding-left: ${props => props.$hasIcon ? '2.5rem' : '1rem'};
    border: none;
    background-color: yellow;
    font-size: 0.875rem;
    color: blue;
    border-bottom: .5px solid black;
    padding-bottom: 5px;
    &:focus {
        outline: none;
    }
`