import React from 'react';

const Button = ({children, handler, classes}) => {
    return (
        <div>
            <button 
            onClick={handler}
            className={`hover:text-gray-100 bg-gradient-to-r from-sky-500 to-indigo-500 text-white ${classes}`}>{children}</button>
        </div>
    );
};

export default Button;