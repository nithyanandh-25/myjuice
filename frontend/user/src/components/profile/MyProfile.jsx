import React, { useState, useEffect } from 'react';
import { getCustomer, updateCustomer } from '../apis/LoginApis';
import './MyProfile.css';

function MyProfile() {
    const [customer, setCustomer] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        mobilenumber: '',
        password: ''
    });

    const customerId = sessionStorage.getItem('customerId'); // Retrieve customerId

    useEffect(() => {
        async function fetchCustomer() {
            if (customerId) {
                try {
                    const data = await getCustomer(customerId);
                    console.log("Fetched customer data:", data);  // Log fetched data
                    setCustomer(data);
                    setFormData({
                        name: data.name,
                        mobilenumber: data.mobilenumber,
                        password: '' // Only used for updating
                    });
                } catch (error) {
                    console.error("Error fetching customer data:", error);
                }
            }
        }
        fetchCustomer();
    }, [customerId]);
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSave = async () => {
        const updatedData = await updateCustomer(customerId, formData);
        setCustomer(updatedData);
        setEditMode(false);
    };

    return (
        <div className="profile-container">
            <h2 className="profile-title">My Profile</h2>
            {customer ? (
                <div className="profile-details">
                    <div className="profile-info">
                        <label className="profile-label">Name:</label>
                        {editMode ? (
                            <input type="text" name="name" value={formData.name} onChange={handleChange} className="profile-input" />
                        ) : (
                            <p className="profile-text">{customer.name}</p>
                        )}
    
                        <label className="profile-label">Mobile Number:</label>
                        {editMode ? (
                            <input type="text" name="mobilenumber" value={formData.mobilenumber} onChange={handleChange} className="profile-input" />
                        ) : (
                            <p className="profile-text">{customer.mobilenumber}</p>
                        )}
    
                        {editMode && (
                            <>
                                <label className="profile-label">Password:</label>
                                <input type="password" name="password" value={formData.password} onChange={handleChange} className="profile-input" />
                            </>
                        )}
    
                        <button onClick={() => setEditMode(!editMode)} className="edit-button">
                            {editMode ? 'Cancel' : 'Edit'}
                        </button>
                        {editMode && (
                            <button onClick={handleSave} className="save-button">Save</button>
                        )}
                    </div>
                </div>
            ) : (
                <p>Loading customer details...</p>
            )}
        </div>
    );    
}

export default MyProfile;
