import React, { useEffect, useState } from 'react';
import { IoIosArrowDown, IoIosCart, IoIosSearch } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import './style.css';
import flipkartLogo from '../../images/flipkart.png';
import goldenStar from '../../images/golden-star.png';
import { login, signout, register } from '../../actions';
import {
    Modal,
    MaterialInput,
    MaterialButton,
    DropdownMenu
} from '../MaterialUI';
import Cart from '../UI/Cart';
import Loader from '../LoadingAnimation/Loader';

const Header = (props) => {

    const [loginModal, setLoginModal] = useState(false);
    const [signup, setSignUp] = useState(false);
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const cart = useSelector(state => state.cart);

    const userSignup = () => {
        const data = { firstname, lastname, email, password };
        if (firstname === "" || lastname === "" || email === "" || password === "") {
            setError('All fields are mandatory!!!');
            return;
        };
        dispatch(register(data));
        setError(null);
        setSignUp(false);
        setLoginModal(false);
        setFirstname('');
        setLastname('');
        setEmail('');
        setPassword('');
    }

    const userLogin = () => {
        if (signup) {
            userSignup();
        } else {
            if (email === "" || password === "") {
                setError('All fields are mandatory!!!');
                return;
            }
            dispatch(login({ email, password }));
            setError(null);
            setEmail('');
            setPassword('');
        }
    }

    const logout = () => {
        dispatch(signout());
    }

    useEffect(() => {
        if (auth.authenticate) {
            setLoginModal(false)
        }
    }, [auth.authenticate]);

    const renderLoggedInMenu = () => {
        return (
            <DropdownMenu
                menu={
                    <a className="username">
                        {auth.user.firstname}
                        <IoIosArrowDown />
                    </a>
                }
                menus={[
                    { label: 'My Profile', href: '', icon: null },
                    { label: 'Orders', href: `/account/orders`, icon: null },
                    { label: 'Wishlist', href: '', icon: null },
                    { label: 'My Chats', href: '', icon: null },
                    { label: 'Coupons', href: '', icon: null },
                    { label: 'Rewards', href: '', icon: null },
                    { label: 'Notifications', href: '', icon: null },
                    { label: 'Logout', href: '', icon: null, onClick: logout },
                ]}
            />
        )
    }
    const renderNonLoggedInMenu = () => {
        return (
            <DropdownMenu
                menu={
                    <a
                        className="loginButton"
                        onClick={() => {
                            setLoginModal(true);
                            setSignUp(false);
                        }}
                    >
                        Login
                    </a>
                }
                menus={[
                    { label: 'My Profile', href: '', icon: null },
                    { label: 'Flipkart Plus Zone', href: '', icon: null },
                    {
                        label: 'Orders', href: `/account/orders`, icon: null, onClick: () => {
                            !auth.authenticate && setLoginModal(true)
                        }
                    },
                    { label: 'Wishlist', href: '', icon: null },
                    { label: 'Rewards', href: '', icon: null },
                    { label: 'Gift Cards', href: '', icon: null },
                ]}
                firstMenu={
                    <div className="firstmenu">
                        <span>New Customer?</span>
                        <a
                            style={{ color: '#2874f0', cursor: 'pointer' }}
                            onClick={() => {
                                setLoginModal(true);
                                setSignUp(true);
                            }}
                        >
                            Sign Up
                        </a>
                    </div>
                }
            />
        )
    }


    return (
        <div className="header">
            <Modal
                visible={loginModal}
                onClose={() => {
                    setError(null)
                    setLoginModal(false)
                }}
            >
                <div className="authContainer">
                    <div className="row">
                        <div className="leftspace">
                            <h2>Login</h2>
                            <p>Get access to your Orders, Wishlist and Recommendations</p>
                        </div>
                        <div className="rightspace">
                            {
                                auth.authenticating ? <Loader /> : (
                                    <>
                                        <span className="errorMessage">
                                            {error ? (
                                                <span className="errorMessage">{error}</span>
                                            ) : null}
                                        </span>
                                        <>
                                            {signup && (
                                                <>
                                                    <MaterialInput
                                                        type="text"
                                                        label="Enter First name"
                                                        value={firstname}
                                                        onChange={e => setFirstname(e.target.value)}
                                                    />
                                                    <MaterialInput
                                                        type="text"
                                                        label="Enter Last name"
                                                        value={lastname}
                                                        onChange={e => setLastname(e.target.value)}
                                                    />
                                                </>
                                            )}
                                        </>
                                        <MaterialInput
                                            type="text"
                                            label="Enter Email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />

                                        <MaterialInput
                                            type="password"
                                            label="Enter Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        // rightElement={<a href="#">Forgot?</a>}
                                        />
                                        <MaterialButton
                                            title={signup ? "Register" : "Login"}
                                            bgColor="#fb641b"
                                            textColor="#ffffff"
                                            style={{ margin: '30px  0px 0px 0px' }}
                                            onClick={userLogin}
                                        />
                                        <p style={{ textAlign: 'center' }}>OR</p>
                                        <MaterialButton
                                            title="Request OTP"
                                            bgColor="#ffffff"
                                            textColor="#2b74f0"
                                        />
                                    </>
                                )
                            }
                        </div>
                    </div>
                </div>

            </Modal>
            <div className="subHeader">
                <div className="logo">
                    <a href="/">
                        <img src={flipkartLogo} className="logoimage" alt="logo" />
                    </a>
                    <a href="/" style={{ marginTop: '-10px', textDecoration: 'none' }}>
                        <span className="exploreText">Explore</span>
                        <span className="plusText">Plus</span>
                        <img src={goldenStar} className="goldenStar" alt="star" />
                    </a>
                </div>
                <div style={{ padding: '0rem 1rem' }}>
                    <div className="searchInputContainer">
                        <input
                            className="searchInput"
                            placeholder={'search functionality is not added yet'}
                        />
                        <div className="searchIconContainer">
                            <IoIosSearch style={{
                                color: '#2874f0'
                            }} />
                        </div>

                    </div>
                </div>
                <div className="rightMenu">
                    {
                        auth.authenticate ? renderLoggedInMenu() : renderNonLoggedInMenu()
                    }
                    <DropdownMenu
                        menu={
                            <a className="more">
                                <span>More</span>
                                <IoIosArrowDown />
                            </a>
                        }
                        menus={[
                            { label: 'Sell on flipkart', href: '', icon: null },
                            { label: '24x7 Customer Care', href: '', icon: null },
                            { label: 'Advertise', href: '', icon: null },
                            { label: 'Download App', href: '', icon: null }
                        ]}
                    />
                    <div>
                        <Link to={'/cart'} className="cart">
                            <Cart count={Object.keys(cart.cartItems).length} />
                            <span style={{ margin: '5px 10px' }}>Cart</span>
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    )

}

export default Header