import React from 'react'

export default function PasswordInput({ label, placeholder, className, value, setValue }) {
    return (
        <div className={`textInputDiv flex flex-col space-y-2 w-full ${className}`}>
            <label htmlFor={label} className='font-semibold'>{label}</label>
            <input type="password" name="" id={label} placeholder={placeholder} className='p-3 border border-gray-400 border-solid rounded placeholder-gray-500'
                value={value}
                onChange={(e) => { setValue(e.target.value); }} />
        </div>
    )
}
