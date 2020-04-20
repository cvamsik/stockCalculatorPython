import React, { Component } from 'react';
import CustomButton from '../CustomButton/CustomButton'
import './GetStockForm.styles.css'
import axios from 'axios';

class TickerInputPage extends Component {
    state = {
        stockSymbol: '',
        stockResponse: [{}]
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
        console.log(this.state);
    }
    onSubmit = (e) => {
        e.preventDefault();
        if (this.state.stockSymbol !== '') {
            console.log("axios call")
            let ticker = { ticker: this.state.stockSymbol };
            let temparray = this.state.stockResponse;
            axios.post(' http://localhost:5000/getDetails', ticker).then(
                (res) => {
                    temparray.push(res.data)
                    this.setState({ stockResponse: temparray });
                    console.log(this.state.stockResponse);
                }
            ).catch((error) => {
                window.alert("Invalid Ticker Name")
            })
        }
        else {
            window.alert("Enter Stock Symbol")
        }

    }
    render() {
        let display
        if (this.state.stockResponse.length > 1) {
            display = this.state.stockResponse.map((stock) =>
                <div className="results">
                    <div className="option">
                        Current Date and Time : {stock.time}
                    </div>

                    <div className="option">
                        Full Name of the Company : {stock.name}
                    </div>
                    <div className="option">
                        Stock Price : {stock.price} $
                    </div>
                    <div className="option">
                        Previous Day Price : {stock.prevavg} $
                    </div>
                    <div className="option">
                        Value changes : {stock.valueChange > 0 ? ("+" + stock.valueChange) : ("-" + stock.valueChange)}
                    </div>
                    <div className='option'>
                        Percentage Changes:{stock.percentageChange > 0 ? ("+" + stock.percentageChange) : ("-" + stock.percentageChange)}
                    </div>
                    <br />
                </div >
            )
        }
        return (

            <div className="profile">

                {display}
                <form className="userdetails">

                    <h2>Enter Stock Ticker</h2>
                    <div className="option">
                        Stock Symbol:{" "}
                        <input
                            value={this.state.stockSymbol}
                            onChange={this.handleChange}
                            name="stockSymbol"
                            required
                        />
                    </div>
                    <div className="option">
                        <CustomButton type="submit" onClick={this.onSubmit}>
                            Get Stock Details
                        </CustomButton>

                    </div>

                </form>




            </div>

        );
    }
}

export default TickerInputPage;