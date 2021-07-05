import React from 'react';
import { useHistory } from 'react-router-dom';

import './style.css';
import envelope from '../../images/envelope.png';
import { MaterialButton } from '../../components/MaterialUI';

const ThankYouPage = () => {
    const history = useHistory();

    const redirect = () => {
        history.push('/account/orders')
    }

    return (
        <div className="thankyouCard">
            <div className="envelopeImage">
                <img src={envelope} alt="envelope" />
            </div>
            <div className="thankyouText">
                <span>Thank You and Enjoy Shopping!!!</span>
            </div>
            <div className="thankyouButton">
                <MaterialButton
                    title={'Check Your Orders'}
                    bgColor={'#2874f0'}
                    style={{ fontWeight: 600 }}
                    onClick={redirect}
                />
            </div>
        </div>
    )
}

export default ThankYouPage
