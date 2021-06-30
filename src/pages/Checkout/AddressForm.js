import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { MaterialButton, MaterialInput } from '../../components/MaterialUI';
import { addAddress } from '../../actions';

const AddressForm = (props) => {
    const [name, setName] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [pinCode, setPincode] = useState('');
    const [locality, setLocality] = useState('');
    const [address, setAddress] = useState('');
    const [cityDistrictTown, setCityDistrictTown] = useState('');
    const [state, setState] = useState('');
    const [landmark, setLandmark] = useState('');
    const [alternatePhone, setAlternatePhone] = useState('');
    const [addressType, setAddressType] = useState('');
    const [newAddress, setNewAddress] = useState(false);
    const [submitFlag, setSubmitFlag] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);

    const inputContainer = {
        width: '100%',
        marginRight: 10,
    };

    const onAddressSubmit = (e) => {
        const payload = {
            address: {
                name, mobileNumber, pinCode, locality, address, cityDistrictTown, state, landmark, alternatePhone, addressType
            }
        }
        dispatch(addAddress(payload));
        setSubmitFlag(true);

    }

    useEffect(() => {
        if(submitFlag) {
            const address = user.address.slice(user.address.length - 1)[0];
            props.onSubmit(address);
        }
    }, [user.address])

    const showAddressForm = () => {
        setNewAddress(prev => !prev);
    }

    return (
        <div className="checkoutStepContainer" style={{ background: '#f5faff' }}>
            <div className="checkoutHeader">
                <div>
                    <span className="stepNumber">{newAddress ? '-' : '+'}</span>
                    <span style={{ cursor: 'pointer' }} className="stepTitle" onClick={showAddressForm}>ADD NEW ADDRESS</span>
                </div>
            </div>
            {
                newAddress ? (
                    <div style={{ padding: '0 60px', paddingBottom: '20px' }}>
                        <div className="flexRow">
                            <div style={inputContainer}>
                                <MaterialInput
                                    label="Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div style={inputContainer}>
                                <MaterialInput
                                    label="10-digit Mobile Number"
                                    value={mobileNumber}
                                    onChange={(e) => setMobileNumber(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="flexRow">
                            <div style={inputContainer}>
                                <MaterialInput
                                    label="Pincode"
                                    value={pinCode}
                                    onChange={(e) => setPincode(e.target.value)}
                                />
                            </div>
                            <div style={inputContainer}>
                                <MaterialInput
                                    label="Locality"
                                    value={locality}
                                    onChange={(e) => setLocality(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="flexRow">
                            <div style={inputContainer}>
                                <MaterialInput
                                    label="Address"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </div>
                            <div style={inputContainer}>
                                <MaterialInput
                                    label="City/District/Town"
                                    value={cityDistrictTown}
                                    onChange={(e) => setCityDistrictTown(e.target.value)}
                                />
                            </div>
                            <div style={inputContainer}>
                                <MaterialInput
                                    label="State"
                                    value={state}
                                    onChange={(e) => setState(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="flexRow">
                            <div style={inputContainer}>
                                <MaterialInput
                                    label="Landmark (optional)"
                                    value={landmark}
                                    onChange={(e) => setLandmark(e.target.value)}
                                />
                            </div>
                            <div style={inputContainer}>
                                <MaterialInput
                                    label="Alternate Phone (optional)"
                                    value={alternatePhone}
                                    onChange={(e) => setAlternatePhone(e.target.value)}
                                />
                            </div>
                        </div>
                        <div style={{ marginTop: '1rem' }}>
                            <label>Address Type:</label>
                            <div style={{ paddingTop: '0.4rem' }}>
                                <div>
                                    <input type="radio" onClick={() => setAddressType('home')} name="addressType" value="home" />
                                    <span>Home</span>
                                </div>
                                <div>
                                    <input type="radio" onClick={() => setAddressType('work')} name="addressType" value="work" />
                                    <span>Work</span>
                                </div>
                            </div>
                        </div>
                        <div className="flexRow">
                            <MaterialButton
                                title="SAVE ADDRESS"
                                onClick={onAddressSubmit}
                                style={{ width: '250px', margin: '20px 0' }}
                            />
                        </div>
                    </div>
                ) : null
            }
        </div>
    )
}

export default AddressForm
