import React, { Component } from 'react';
import CustomButton from '../CustomButton/CustomButton'
import './GetStockForm.styles.css'
import axios from 'axios';

class GetStockForm extends Component {
    state = {
        stockSymbol: '',
        allotment: '',
        finalPrice: '',
        sellCommission: '',
        initialPrice: '',
        buyCommission: '',
        capitalGainTaxRate: '',
        stockResponse: {}
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
        console.log(this.state);
    }
    onSubmit = (e) => {
        e.preventDefault();
        console.log("axios call")
        const stockData = {
            stockSymbol: this.state.stockSymbol,
            allotment: this.state.allotment,
            finalPrice: this.state.finalPrice,
            sellCommission: this.state.sellCommission,
            initialPrice: this.state.initialPrice,
            buyCommission: this.state.buyCommission,
            capitalGainTaxRate: this.state.capitalGainTaxRate,
        }
        axios.post(' http://localhost:5000/getStock', stockData).then(
            (res) => {
                this.setState({ stockResponse: res.data });
                console.log(this.state.stockResponse);
            }
        )

    }
    render() {
        return (

            <div className="profile">
                <form className="userdetails">
                    <h2>Enter Stock Details</h2>
                    <div className="option">
                        Stock Symbol:{" "}
                        <input
                            value={this.state.stockSymbol}
                            onChange={this.handleChange}
                            name="stockSymbol"
                        />
                    </div>
                    <div className="option">
                        Alloted Shares:{" "}
                        <input

                            value={this.state.allotment}
                            onChange={this.handleChange}
                            name="allotment"
                        />
                    </div>
                    <div className="option">
                        Final Share Price:{" "}
                        <input

                            value={this.state.finalPrice}
                            onChange={this.handleChange}
                            name="finalPrice"
                        />
                    </div>
                    <div className="option">
                        Sell Commission: <input
                            value={this.state.sellCommission}
                            onChange={this.handleChange}
                            name="sellCommission" />
                    </div>
                    <div className="option">
                        Initial Share Price:{" "}
                        <input

                            value={this.state.initialPrice}
                            onChange={this.handleChange}
                            name="initialPrice"
                        />
                    </div>
                    <div className="option">
                        Buy Commission:{" "}
                        <input

                            value={this.state.buyCommission}
                            onChange={this.handleChange}
                            name="buyCommission"
                        />
                    </div>
                    <div className="option">
                        Capital Gain Tax Rate:{" "}
                        <input

                            value={this.state.capitalGainTaxRate}
                            onChange={this.handleChange}
                            name="capitalGainTaxRate"
                        />
                    </div>

                    <div className="option">
                        <CustomButton type="submit" onClick={this.onSubmit}>
                            Get Stock Profit
                        </CustomButton>

                    </div>
                    <div className="option">
                        Proceeds : {this.state.stockResponse.proceeds} $

                    </div>
                    <div className="option">
                        Cost : {this.state.stockResponse.cost} $
                    </div>
                    <div className="option">
                        Net Profit : {this.state.stockResponse.netProfit} $
                    </div>
                    <div className="option">
                        Return on Investment : {this.state.stockResponse.roi} %
                    </div>
                    <div className="option">
                        Break Even Price : {this.state.stockResponse.breakEven} $
                    </div>
                </form>
            </div>

        );
    }
}

export default GetStockForm;