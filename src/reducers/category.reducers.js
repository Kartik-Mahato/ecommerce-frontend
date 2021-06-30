import { categoryConstants } from "../actions/constants"

const initialState = {
    loading: false,
    categories: [],
    error: null
}

const buildNewCategories = (parentId, categories, category) => {
    let myCategories = [];
    for (let cat of categories) {
        if (cat._id === parentId) {
            myCategories.push({
                ...cat,
                children: cat.children && cat.children.length > 0 ? buildNewCategories(parentId, [...cat.children, {
                    _id: category._id,
                    name: category.name,
                    slud: category.slug,
                    parentId: category.parentId,
                    children: category.children,
                }], category) : []
            });
        } else {
            myCategories.push({
                ...cat,
                children: cat.children && cat.children.length > 0 ? buildNewCategories(parentId, cat.children, category) : []
            })
        }
    }
    return myCategories;
}

const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case categoryConstants.GET_ALL_CATEGORIES_REQUEST:
            return state = {
                ...state,
                loading: true
            }
        case categoryConstants.GET_ALL_CATEGORIES_SUCCESS:
            return state = {
                ...state,
                loading: false,
                categories: action.payload.categories
            }
        case categoryConstants.GET_ALL_CATEGORIES_FAILURE:
            return state = {
                ...state,
                loading: false,
                error: action.payload.error
            }
        case categoryConstants.ADD_NEW_CATEGORY_REQUEST:
            return state = {
                ...state,
                loading: true,
            }
        case categoryConstants.ADD_NEW_CATEGORY_SUCCESS:

            const category = action.payload;
            const updatedCategories = buildNewCategories(category.parentId, state.categories, category);
            // console.log(updatedCategories);

            return state = {
                ...state,
                categories: updatedCategories,
                loading: false,
            }
        case categoryConstants.ADD_NEW_CATEGORY_FAILURE:
            return state = {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}

export default categoryReducer