import { useContext, useEffect, useReducer} from "react"
import styled from "styled-components"
import { CartContext } from "../store/CartContext"
import Button from "../UI/Button"
import ModalItem from "./ModalItem"
const TOTAL_PRICE = "TOTAL_PRICE"
const MODAL_TRUE = "MODAL_TRUE"
const MODAL_FALSE = "MODAL_FALSE"
const stateReducer = (state, action) => {
    if (action.type === TOTAL_PRICE) {
        return {
            ...state,
            totalPrice: action.payload
        }
    }
    if (action.type === MODAL_TRUE) {
        return {
            ...state,
            modalSize: true
        }
    }
    if (action.type === MODAL_FALSE) {
        return {
            ...state,
            modalSize: false
        }
    }
}

const Modal = ({ onClick }) => {
    const context = useContext(CartContext)
    const [state, dispatchState] = useReducer(stateReducer, { totalPrice: 0, modalSize: false })

    useEffect(() => {
        if (context.basket?.length > 0) {
            dispatchState({ type: MODAL_TRUE })
        }
        let priceSum = 0;
        context.basket.forEach((el) => {
            const price = el.price * el.amount
            priceSum += price;
        })
        if (priceSum === 0) {
            dispatchState({ type: MODAL_FALSE })
        }
        dispatchState({ type: TOTAL_PRICE, payload: Math.floor(priceSum)  })
    }, [context.basket])
    return (
        <Wrapper>
            <Container contextLength={context.basket.length}>
                {state.modalSize &&
                    <UnorderdList contextLength={context.basket.length}>
                        {context.basket?.map((el) => {
                            return <ModalItem id={el._id} title={el.title} price={el.price} amount={el.amount}></ModalItem>
                        })}
                    </UnorderdList>
                }

                <div>
                    <TotalPrice>
                        <h3>Total Price</h3>
                        <p>${state.totalPrice}</p>
                    </TotalPrice>
                    <ButtonContainer>
                        <Button onClick={onClick} circle={true} buttonState={false} colorState={true} borderState={true}>Close</Button>
                        {state.modalSize && <Button circle={true} marginLeft="16px" buttonState={false} colorState={false} borderState={false} >Order</Button>}
                    </ButtonContainer>
                </div>
            </Container>
        </Wrapper>
    )
}
export default Modal
const Container = styled.div`
padding: 32px 32px;
width: 607px;
height: ${props => {
        switch (props.contextLength) {
            case 0:
                return "100px";
            case 1:
                return "230px";
            case 2:
                return "367px";
            default:
                return "367px";
        }
    }};
background: #FFFFFF;
border-radius: 20px;
`
const TotalPrice = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
margin-bottom: 24px;
h3 {
font-family: 'Poppins';
font-style: normal;
line-height: 30px;
margin: 0;
color: #222222;
}
p {
font-family: 'Poppins';
font-style: normal;
font-weight: 600;
font-size: 22px;
line-height: 33px;
color: #8A2B06;
margin: 0;
}
`
const Wrapper = styled.div`
position: fixed;
top:0;
left: 0;
right: 0;
bottom: 0;
display: flex;
align-items: center;
justify-content: center;
background-color: rgba(0,0,0,0.7);
`
const ButtonContainer = styled.div`
display: flex;
justify-content: flex-end;
`
const UnorderdList = styled.ul`
padding: 0;
overflow-y: ${props => {
        switch (props.contextLength) {
            case 0:
                return 'none';
            case 1:
                return "none";
            case 2:
                return "none"
            default:
                return "scroll"
        }
    }};
display: ${props => (props.state ? "none" : "block")};
margin: 0;
height:  ${props => {
        switch (props.contextLength) {
            case 0:
                return 'none';
            case 1:
                return "auto";
            case 2:
                return "266px"
            default:
                return "266px"
        }
    }};
`
