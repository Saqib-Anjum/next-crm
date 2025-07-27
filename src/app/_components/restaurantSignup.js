
const RestaurantSignup=() => {
    return(
        <>        
        <h3>Signup Component</h3>
        <div>
            <div className="input-wrapper">
                <input type="text" placeholder="Enter Email" className="input-field"/>
                </div>
                <div className="input-wrapper">
                <input type="password" placeholder="Enter password" className="input-field"/>
            </div>
            <div className="input-wrapper">
                <input type="password" placeholder="Confirm Email" className="input-field"/>
                </div>
                <div className="input-wrapper">
                <input type="text" placeholder="Enter Restaurant Name" className="input-field"/>
                </div>
                <div className="input-wrapper">
                <input type="text" placeholder="Enter City" className="input-field"/>
                </div>    
                <div className="input-wrapper">
                <input type="text" placeholder="Enter Full Address" className="input-field" />
                </div>
                <div className="input-wrapper">
                <input type="number" placeholder="Enter Contact Number" className="input-field" />
                </div>
            
            <div className="input-wrapper">
                <button className="button">Signup</button>
            </div>
        </div>        
        </>
    )
}

export default RestaurantSignup;
