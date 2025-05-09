import React from 'react'
import styled from 'styled-components'
import { Input } from '../atoms/Input'

export const SearchBar = () => {
  return (
    <SearchContainer>
        <Input
            holder={'Buscar'}
            icon
            iconName={'icon-park-outline:search'}
        />
    </SearchContainer>
  )
}

const SearchContainer = styled.div`
    max-width: 36rem;
    width: 100%;
`