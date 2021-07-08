const baseUrl = window.location.hostname === 'localhost' ? `http://localhost:5000` : `https://ecommerce-backend-rest-server.herokuapp.com`

export const api = `${baseUrl}/ecommerce/api`;
export const imgPath = (filename) => {
    return `${baseUrl}/${filename}`
}