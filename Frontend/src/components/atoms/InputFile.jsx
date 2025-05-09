import React from 'react'
import styled from 'styled-components'
import { Icon } from '@iconify/react'

export const InputFile = ({onChange}) => {
    return (
        <StyledWrapper>
            <form className="file-upload-form">
                <label htmlFor="file" className="file-upload-label">
                <div className="file-upload-design">
                    <Icon icon="tabler:cloud-up" width="24" height="24" />
                    <p>Drag and Drop</p>
                    <p>or</p>
                    <span className="browse-button">Browse file</span>
                </div>
                <input id="file" type="file" name='file' onChange={onChange}/>
                </label>
            </form>
        </StyledWrapper>
    )
}

const StyledWrapper = styled.div`
  .file-upload-form {
    width: fit-content;
    height: fit-content;
    display: flex;
    align-items: center;
    justify-content: center; /* Dark background for the form */
  }

  .file-upload-label input {
    display: none;
  }

  .file-upload-label svg {
    height: 50px;
    fill: #666; /* Lighter gray for the SVG fill */
    margin-bottom: 20px;
  }

  .file-upload-label {
    cursor: pointer;
    background-color: #333; /* Darker background for the label */
    padding: 30px 30px;
    border-radius: 40px;
    border: 2px dashed #666; /* Lighter gray dashed border */
    box-shadow: 0px 0px 200px -50px rgba(0, 0, 0, 0.5); /* Adjusted shadow */
    color: #eee; /* Text color for the label */
  }

  .file-upload-design {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 5px;
  }

  .browse-button {
    background-color: #666; /* Lighter gray for the button */
    padding: 5px 15px;
    border-radius: 10px;
    color: #eee; /* Off-white text for better contrast */
    transition: all 0.3s;
  }

  .browse-button:hover {
    background-color: #888; /* Slightly lighter gray on hover */
    color: #fff; /* White text on hover */
  }
`