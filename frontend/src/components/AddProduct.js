import React from 'react';

const AddProduct = () => {
    const [name, setName] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [company, setCompnay] = React.useState('');
    const [error,setError] = React.useState(false);

    const addProduct = async (e) => {
        if(!name || !price || !company || !category)
        {
            setError(true);
            return false
        }
        

        const userId = JSON.parse(localStorage.getItem('user'))._id;
        console.log(userId)
        let result = await fetch("http://localhost:8000/add-product", {
            method: "post",
            body: JSON.stringify({ name, price, category, company, userId }),
            headers: {
                "Content-type": "application/json",
                 authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            
            }
        });
        result = await result.json();
        if(result)
        {
            alert("added")
        }
        console.warn(result)

    }

    return (
        <div className='signup-container'>
            <form className='signup-form'>
            <h1>Add Product</h1>
            <input type="text" placeholder='Enter product name' className='inputBox'
                value={name} onChange={(e) => { setName(e.target.value) }}
            />
            {error && !name && <span className='invalid-input'>Enter valid name</span>}

            <input type="text" placeholder='Enter product price' className='inputBox'
                value={price} onChange={(e) => { setPrice(e.target.value) }}
            />
            {error && !price && <span className='invalid-input'>Enter valid price</span>}

            <input type="text" placeholder='Enter product category' className='inputBox'
                value={category} onChange={(e) => { setCategory(e.target.value) }}
            />
            {error && !category && <span className='invalid-input'>Enter valid category</span>} 

            <input type="text" placeholder='Enter product company' className='inputBox'
                value={company} onChange={(e) => { setCompnay(e.target.value) }}
            />
            {error && !company && <span className='invalid-input'>Enter valid company</span>}


            <button onClick={addProduct} className='appButton'>Add Product</button>
        
            </form>
           
        </div>
    )
}

export default AddProduct;