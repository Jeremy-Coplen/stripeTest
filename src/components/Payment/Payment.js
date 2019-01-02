import React, { Component } from "react"
import StripeCheckout from "react-stripe-checkout"
import axios from "axios"

import "./Payment.css"

class Payment extends Component {
    constructor(props) {
        super(props)

        this.state = {
            complete: false
        }
    }

    onToken = async (token) => {
        token.card = void 0
        let tokenRes = await axios.post("/api/payment", {token, amount: Math.round(this.props.total * 100)})

        await axios.delete("/api/cart")
        this.props.resetCart()
        this.props.calculateSubTotal()
        this.props.togglePaymentShow()
        console.log(tokenRes)
    }

    render() {
        const className = this.props.paymentShow ? "payment" : "payment_none"
        return (
            <div className={className}>
                <div className="payment_content">
                    <button onClick={() => this.props.togglePaymentShow()}>X</button>
                    <div>
                        <StripeCheckout
                        name="Stripe Candy Test"
                        description="testing out stripe"
                        token={this.onToken}
                        stripeKey={`${process.env.REACT_APP_STRIPE_KEY}`} 
                        amount={Math.round(this.props.total * 100)}
                        currency="USD" />
                    </div>
                </div>
            </div>
        )
    }
}

export default Payment