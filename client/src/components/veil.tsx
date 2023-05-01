import { Spinner } from "react-bootstrap";
import styled from 'styled-components'

const Container = styled.div`
    top: 0;
    position: absolute;
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background: #00000030;
  `;


export const Veil = () => <Container><Spinner animation="border" /></Container>