import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BiRupee } from "react-icons/bi";

import "./style.css";
import Card from "../../../components/UI/Card";
import { getProductsBySlug } from "../../../actions";
import { imgPath } from "../../../urlConfig";

const ClothingAndAccessories = (props) => {
    const product = useSelector((state) => state.product);
    const dispatch = useDispatch();

    useEffect(() => {
        const { match } = props;
        dispatch(getProductsBySlug(match.params.slug));
    }, []);

    return (
        <div style={{ padding: "10px" }}>
            <Card
                style={{
                    boxSizing: "border-box",
                    padding: "10px",
                    display: "flex",
                }}
            >
                {product.products.map((product) => (
                    <div className="caContainer">
                        <Link
                            className="caImgContainer"
                            to={`/${product.slug}/${product._id}/p`}
                        >
                            <img src={imgPath(product.productPictures[0].img)} />
                        </Link>
                        <div>
                            <div className="caProductName">{product.name}</div>
                            <div className="caProductPrice">
                                <BiRupee />
                                {product.price.toLocaleString('en-IN')}
                            </div>
                        </div>
                    </div>
                ))}
            </Card>
        </div>
    );
};

export default ClothingAndAccessories;