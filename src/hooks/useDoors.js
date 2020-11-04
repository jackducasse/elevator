import React from 'react';

export const useDoors = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [selfCloseTimer, setSelfCloseTimer] = React.useState(null);

    const open = () => {
        clearTimeout(selfCloseTimer);
        setIsOpen(true);
        setSelfCloseTimer(setTimeout(() => setIsOpen(false), 2000));
    };
    const close = () => {
        clearTimeout(selfCloseTimer);
        setIsOpen(false);
    };

    return {
        isOpen,
        open,
        close,
    }
};