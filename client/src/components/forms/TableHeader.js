import React from 'react'
import { ACTIVITY, SECTION } from '../../constants/page_constants'
import {AiFillFilter} from 'react-icons/ai'

function TableHeader(props) {

  
    const { filterSections, tableClass, heartSort, headerSection} = props;
    console.log("Table Class:", filterSections, tableClass, heartSort)
    let tableHeadersFields = Object.keys(headerSection.fields).map(function(key){
        return headerSection.fields[key]
    })
    return (
        <thead>
            <tr className={tableClass.columnClass}>
                <th></th>
                {
                    tableHeadersFields.filter(field => field.name !== SECTION.WORKOUT_DAY_LOCATIONS_PAGE.LOCATION_HEADER_SECTION.SELECT_LOCATION).map((field) => {
                        let fieldName = field.name;
                        let isArrowUp = (field.sortOrder === null) || (field.sortOrder === ACTIVITY.SORT.ASCEND)
                        let isArrowDown = (field.sortOrder === null) || (field.sortOrder === ACTIVITY.SORT.DESCEND);
                        let upOpacity = isArrowUp ? 1 : 0;
                        let downOpacity = isArrowDown ? 1 : 0;
                        console.log("Arrows:", fieldName, upOpacity, downOpacity)
                        return <th id={field.Name} key={field.name} onClick={() => props.handleSort(field.name)}>
                            <div className="tableHeaderColumn">
                                <div></div>
                                <div>{field.title}</div>
                                <div className="sortBlock">
                                    <div style={{opacity: upOpacity}} id="arrowUp" className="arrow-up" ></div>
                                    <div style={{opacity: downOpacity}} id="arrowDown" className="arrow-down"></div>
                                </div>
                            </div>
                            </th>
                    })
                }
            </tr>
            <tr className={tableClass.filterClass}>
                <th onClick={props.handleFilterCall}>
                    <AiFillFilter size={"32"}/>
                </th>
                {
                    tableHeadersFields.filter(field => field.name !== SECTION.WORKOUT_DAY_LOCATIONS_PAGE.LOCATION_HEADER_SECTION.SELECT_LOCATION).map((field) => {
                        let fieldName = field.name
                        let filterField = filterSections.fields[fieldName];
                        return <th key={filterField.name}><input type="text" name={filterField.name} value={filterField.value} onChange={props.handleFilter} autoFocus/>
                                </th>
                    })

                }
            </tr>

        </thead>
    )
    

}


export default TableHeader;