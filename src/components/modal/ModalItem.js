import Button from "../UI/Button"
import styled from "styled-components"
import { useContext } from "react"
import { CartContext } from "../store/CartContext"
const ModalItem = ({ title, price, amount, id }) => {
    const context = useContext(CartContext)
    return (
        <ListItem>
            <TitleOfProduct>
                <h3>{title}</h3>
                <PriceAndCount>
                    <Price>${price}</Price>
                    <CountP>x {amount}</CountP>
                </PriceAndCount>
            </TitleOfProduct>
            <ButtonContainerTwo>
                <Button onClick={() => {
                    context.decrementAmount(id)
                }} square={true}>-</Button>
                <Button onClick={() => {
                    context.incrementAmount(id)
                }} square={true} marginLeft='14px'>+</Button>
            </ButtonContainerTwo>
        </ListItem>
    )
}
export default ModalItem
const ListItem = styled.li`
display: flex;
justify-content: space-between;
align-items: flex-end;
margin-top: 4px;
border-bottom: 1px solid  #D6D6D6;
margin-bottom: 28px;
`
const TitleOfProduct = styled.div`
h3 {
font-family: 'Poppins';
font-style: normal;
line-height: 30px;
color: #222222;
margin: 0;
}
`
const PriceAndCount = styled.div`
display: flex;
align-items: center;
margin-top: 12px;
margin-bottom: 24px;

`
const Price = styled.p`
font-family: 'Poppins';
font-style: normal;
font-weight: 600;
font-size: 18px;
line-height: 27px;
color: #AD5502;
margin: 0;
`
const CountP = styled.p`
padding:5px 14px;
border: 1px solid #D6D6D6;
border-radius: 6px;
font-family: 'Poppins';
font-style: normal;
font-weight: 500;
line-height: 24px;
color: #222222;
margin: 0;
margin-left: 47px;
`
const ButtonContainerTwo = styled.div`
display: flex;
margin-bottom: 26px;

`