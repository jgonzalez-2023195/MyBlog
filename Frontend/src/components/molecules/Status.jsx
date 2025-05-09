import React from 'react'
import styled from 'styled-components'

export const Status = ({loadin, image}) => {
    return (
        <>
            {loadin ? (
                <label >Cargando...</label>
            ) : (
                image && <Img src={image} alt='Image uplodad'/>
            )}
        </>
    )
}

const Img = styled.img`
    width: auto;
    height: 21em;
    object-fit: contain;
`
