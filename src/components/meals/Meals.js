import styled from "styled-components"
import MealsItem from "./MealsItem"
import React, { useEffect, useState } from "react"
import { fetchRequest } from "../lib/fetchAPI"
const Meals = React.memo(() => {
    const [meals, setMeals] = useState()
    async function getFoods() {
        try {
            const response = await fetchRequest("/foods")
            setMeals(response)

        } catch (error) {
            new Error(error)
            console.log(error);
        }

    }
    useEffect(() => {
        getFoods()
    }, [])
    return (
        <MealsList>
            {meals?.map((el) => {
                return <MealsItem price={el.price} title={el.title} description={el.description} key={el._id} id={el._id} />
            })}
        </MealsList>
    )
})
export default Meals
const MealsList = styled.ul`
width: 959px;
height: 564px;
background: #FFFFFF;
border-radius: 16px;
padding-right: 40px;
`