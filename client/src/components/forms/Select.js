import React, { Component } from 'react'
import {FormGroup, ControlLabel, FormControl} from 'react-bootstrap'
import {isEmpty} from 'lodash'
class Select extends Component {

    constructor(props) {
        super(props)
    } 



    render() {
        let name = this.props.select.name;
        let value = this.props.select.value;
        let label = this.props.select.label;
        let items = this.props.select.items;
        let disabled = this.props.select.disabled;
        console.log("Value Selected:", value)
        if (value !== "") {
            let item = items.filter(item => value === item.id);
            if (!isEmpty(item)) {
                console.log("Value searched")
                value = item[0].value;
            }
        }
        console.log("Items Select: ",items)
        return (
            <div>
                {/* <form>
                <FormGroup controlId={name}>
                    <ControlLabel>{label}: </ControlLabel>
                    <FormControl componentClass="select" dataLiveSearch>
                        <option value=""></option>
                        {
                            items.map((item, index) => {
                                return <option key={item.id} id={item.id} value={item.value}>{item.value}</option>
                            })
                        }
                    </FormControl>
                </FormGroup>
                </form> */}
                
                <label htmlFor={name}>{label}: </label> 
                <select id={name} name={name} value={value} onChange={this.props.handleChange} disabled={disabled}>
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
    
}

export default Select;