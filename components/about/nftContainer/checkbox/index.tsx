import React from 'react';

const Checkbox = ({ checkNum, setSelectedNum, selectedNum }:any) => {
    const handleChange = (event:any) => {
        if (event.target.checked) {
            // Add checkNum to selectedNum array if not already present
            if (!selectedNum.includes(checkNum)) {
                setSelectedNum([...selectedNum, checkNum]);
            }
        } else {
            // Remove checkNum from selectedNum array
            setSelectedNum(selectedNum.filter((num:any) => num !== checkNum));
        }
    };

    return (
        <div className="m-2 absolute top-[15px] left-[10px]">
            <input 
                id={`cbtest-${checkNum}`} 
                className="w-[25px] h-[25px]" 
                type="checkbox" 
                onChange={handleChange}
                checked={selectedNum.includes(checkNum)}
            />
            <label className="check-box" htmlFor={`cbtest-${checkNum}`}></label>
        </div>
    );
}

export default Checkbox;
