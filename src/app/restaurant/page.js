'use client'
import { useState } from "react";
// import RestaurantLogin from "../_components/RestaurantLogin";
// import RestaurantSignup from "../_components/restaurantSignup";

const Restaurant = () => {
    const [login, setLogin] = useState(true)
    return(
    <>
    <div className="container">
    <h1>Restaurant Login/Signup Page</h1>
    {/* {
        login ? <RestaurantLogin /> : <RestaurantSignup />

    } */}
    <div>    
        <button className="button-link" onClick={()=> setLogin(!login)}>
            {login? "Already have an Account? signup" : "Already have Account ? Login"}
            </button>
    </div>
    </div>
    </>
    )
}


export default Restaurant;
