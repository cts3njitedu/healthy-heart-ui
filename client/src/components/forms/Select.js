import React from 'react'


function Select(props) {
    let name = props.select.name;
    let value = props.select.value;
    let label = props.select.label;
    let items = props.select.items;
    console.log("Items: ",items)
    return (
        <div>
            <label htmlFor={name} style={{color: "darkblue"}}>{label}: </label> 
            <select style={{marginLeft: "1%", height:"30px", color: "black", fontSize:"100%"}} id={name} name={name} value={value} onChange={props.handleChangeLocation}>
                <option value=""></option>
                {
                    items.map((item, index) => {
                        return <option key={item.id} id={item.id} value={item.value}>{item.value}</option>
                    })
                }
            </select>
        </div>

    )
}

export default Select;