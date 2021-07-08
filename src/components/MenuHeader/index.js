import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { IoIosArrowDown } from 'react-icons/io';

import './style.css';
import { getAllCategories } from '../../actions/category.actions';
import LoadingAnimation from '../LoadingAnimation';

const MenuHeader = () => {

    const category = useSelector(state => state.category);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllCategories())
    }, [dispatch])

    const renderCategories = (categoryList) => {
        let myCategories = [];
        for (let category of categoryList) {
            myCategories.push(
                <li key={category._id}>
                    {
                        category.parentId ?
                            <Link to={`${category.slug}/?cid=${category._id}&type=${category.type}`} replace>
                                {category.name}
                            </Link> : <span style={{ display: 'flex', alignItems: 'center' }}>
                                {category.name} {category.children.length > 0 ? <IoIosArrowDown /> : null}
                            </span>
                    }
                    {category.children.length > 0 ? (
                        <ul>{renderCategories(category.children)}</ul>
                    ) : null
                    }
                </li>
            );
        }
        return myCategories;
    }
    return (
        <div className="menu-header">
            <ul>
                {
                    category.categories.length > 0 ? renderCategories(category.categories) : (
                        <LoadingAnimation />
                    )
                }
            </ul>
        </div>
    )
}

export default MenuHeader
