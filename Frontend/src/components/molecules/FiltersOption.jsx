import React, {  useState } from 'react';
import { useCourse } from '../../hooks/useCourse'
import Select from 'react-select'
import styled from 'styled-components';
import { Icon } from '@iconify/react'

export const FiltersOption = ({ onFilter }) => {
    const [title, setTitle] = useState('');
    const { courses } = useCourse()
    const options = courses.map((course) => ({
        value: course._id,
        label: course.name
    }))

    const [selectedCourse, setSelectedCourse] = useState(null)

    
    const handleCourseChange = (selectedOption) => {
        setSelectedCourse(selectedOption);
        if (selectedOption) {
        onFilter({ course: selectedOption.label });
        }
    };


    const handleSearch = () => {
        onFilter({ title });
    };

    return (
        <Wrapper>
            <InputContainer>
                <Icon icon='icon-park-outline:search' className='IconWrapper' onClick={handleSearch} />
                <InputFilter
                    type="text"
                    placeholder="Buscar por título"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleSearch();
                        }
                    }}
                />
            </InputContainer>
            <div>
                <Select
                    options={options}
                    value={selectedCourse}
                    onChange={handleCourseChange}
                    placeholder="Seleccionar curso"
                    isClearable
                    styles={{
                        control: (base) => ({
                            ...base,
                            width: '350px',
                            border: 'none',
                            boxShadow: 'none',
                            color: 'black',
                            '&:hover': {
                                border: 'none',
                                boxShadow: 'none',
                                cursor: 'pointer',
                            },
                        }),
                    }}
                />
            </div>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    justify-content: space-between;
    display: flex;
`

const InputContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    .IconWrapper {
        font-size: 20px;
        margin-top: -5px;
        cursor: pointer;
        color: ${({theme})=>theme.text};
    }
`

const InputFilter = styled.input`
    width: auto;
    height: 25px;
    background-color: transparent;
    border: none;
    font-size: 20px;
    color: ${({theme})=>theme.text};
    &:focus {
        outline: none;
    }
    &::placeholder {
        color: ${({theme})=>theme.text};
        font-size: 20px;
    }
`