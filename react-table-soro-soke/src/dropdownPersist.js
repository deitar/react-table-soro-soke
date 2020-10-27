import React, {Component,useState} from "react";
import Dropdown from "react-bootstrap/Dropdown";

/* copied this from an online solution: 
It's a wrapper that prevents dropdown from closing when child items are selected */
const DropdownPersist = (props) => {
    const [open, setOpen] = useState(false);
    const onToggle = (isOpen, ev, metadata) => {
        if (metadata.source === "select") {
            setOpen(true);
            return;
        }
        setOpen(isOpen);
    };
    return <Dropdown show={open} onToggle={onToggle} {...props}></Dropdown>;
};

export default DropdownPersist;
