import { useState, useCallback } from 'react';

const modal = (initialState) => {
    
    const [open, setOpen] = useState(initialState);
    
    const showModal = () => {
        setOpen(true);
    };
    
    const handleOk = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setOpen(false);
        }, 3000);
    };

    const handleCancel = () => {
        setOpen(false);
    };
    
    return [open, showModal, handleOk, handleCancel];
};

export default modal;