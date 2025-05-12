import React from 'react'
import { InputFile } from '../atoms/InputFile'

export const ImgUpload = ({ onImageUpload }) => {

    const handleChange = (e) => {
        onImageUpload(e)
    }

    return (
        <InputFile
            onChange={handleChange}
            
        />
    )
}
