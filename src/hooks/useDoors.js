import React from 'react';

export const useDoors = ({
    isDisabled,
} = {}) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [selfCloseTimer, setSelfCloseTimer] = React.useState(null);

    const open = () => {
        if(isDisabled) return;
        clearTimeout(selfCloseTimer);
        setIsOpen(true);
        setSelfCloseTimer(setTimeout(() => setIsOpen(false), 2000));
    };
    const close = () => {
        if(isDisabled) return;
        clearTimeout(selfCloseTimer);
        setIsOpen(false);
    };

    return {
        isOpen,
        open,
        close,
    }
};