import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import './style.css';
import { getAllCategories } from '../../actions/category.actions';

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
                        category.parentId ? <Link to={`${category.slug}/?cid=${category._id}&type=${category.type}`}>{category.name}</Link> : <span>{category.name}</span>
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
                    category.categories.length > 0 ? renderCategories(category.categories) : null
                }
            </ul>
        </div>
    )
}

export default MenuHeader
