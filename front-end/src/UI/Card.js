import styled, { css } from "styled-components"

/**
 * For a div contain bg image background
 */
export const CardHeader = styled.div`
    background-image: url('${(props) => props.image}');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    min-height: ${(props) => props.minHeight};
    min-width: ${(props) => props.minWidth};
    overflow: hidden;
    ${props => props.rounded && css`
        border-top-left-radius: calc(0.4rem - 1px)};
        border-top-right-radius: calc(0.4rem - 1px);
    `}
    position: relative;
`

/**
 * For overlay bg-color to CardHeader
 */
export const CardHeaderOverlay = styled.div`
    position: absolute;
    inset: 0 0 0 0;
    background-color: black;
    opacity: 0.7;
`

/**
 * For a div with shadow
 */
export const CardContainer = styled.div`
    box-shadow: 0 0 1rem rgb(0 0 0 / 15%);
    border-radius: 5px;
`