import React, { useState, useEffect } from "react";
import "../css/App.css";
import { createNewWarning } from '../requests/posts'
import { getAllResource } from "../requests/gets";

export default function AddWarning({ movie }) {

    const findValueFromID = (type, id) => {
        for (let item of pageData[type]) {
            if (item._id === id) {
                return item.title
            }
        }
        
    }
    const getPageData = async () => {
        let categories = await getAllResource('categories') || []
        let frequencies = await getAllResource('frequencies') || []
        let types = await getAllResource('types') || []
        let severities = await getAllResource('severities') || []
        let user = 'testUser'
        setPageData( { categories: categories, frequencies: frequencies, types: types, severities: severities, user: user })
    }
    
    const [pageData, setPageData] = useState();
    const [warnings, setWarnings] = useState([]);
    const [category, setCategory] = useState('');
    const [frequency, setFrequency] = useState('');
    const [type, setType] = useState('');
    const [severity, setSeverity] = useState('');
    const [comment, setComment] = useState('')
    useEffect(() => {
        getPageData()
        
    }, [])

    useEffect(() => {
        if (pageData) {
            setFrequency(pageData.frequencies[0]._id)
            setCategory(pageData.categories[0]._id)
            setType(pageData.types[0]._id)
            setSeverity(pageData.severities[0]._id)
        }
    },[pageData])
    if (pageData) {
        
        return (
            <div className="pageContainer fullPageContainer">
                <h2>Add a warning to {movie}</h2>
                <br></br>
                <div className="ptther">
                    <select
                        onChange={(event) => {
                            return setCategory(event.target.value);
                        }}
                    >   {pageData.categories.map((category) => <option value={category._id}>{category.title}</option>)}
                    </select>
                    <select
                        onChange={(event) => {
                            return setFrequency(event.target.value);
                        }}
                    >   {pageData.frequencies.map((frequency) => <option value={frequency._id}>{frequency.title}</option>)}
                    </select>
                    <select
                        onChange={(event) => {
                            return setSeverity(event.target.value);
                        }}
                    >   {pageData.severities.map((severity) => <option value={severity._id}>{severity.title}</option>)}
                    </select>
                    <select
                        onChange={(event) => {
                            return setType(event.target.value);
                        }}
                    >   {pageData.types.map((type) => <option value={type._id}>{type.title}</option>)}
                    </select>
                    <label htmlFor="commentbox">details:</label>
                    <textarea id="commentbox" onChange={(event) => {
                        return setComment(event.target.value);
                    }} />
                    <br></br>

                    <button
                        onClick={() =>
                            setWarnings(
                                warnings.concat([
                                    {
                                        user: pageData.user,
                                        movie: movie,
                                        category: category,
                                        frequency: frequency,
                                        type: type,
                                        severity: severity,
                                        comment: comment
                                    },
                                ])
                            )
                        }
                    >

                        Click
            </button>
                </div>

                <br />
                <div className="part">
                    <button onClick={() => { createNewWarning(warnings) }}>Send Data</button>
                </div>
                <br />
                <div id="collapsible-tables" className="tomove">
                    <table className="center" border="2">
                        <thead>
                        <tr>
                            <th>Category</th>
                            <th>Frequency</th>
                            <th>Type</th>
                            <th>Severity</th>
                            <th>Details</th>
                            </tr>
                        </thead>
                        <tbody>
                        {warnings.length > 0
                            ? warnings.map((item) => (
                                <tr>
                                    <td data-title="Category" key={'cat'+warnings.indexOf(item)}>
                                        {findValueFromID('categories',item.category)}
                                    </td>
                                    <td data-title="Frequency" key={'freq'+warnings.indexOf(item)}>
                                        {findValueFromID('frequencies', item.frequency)}
                                    </td>
                                    <td data-title="Type" key={'typ'+warnings.indexOf(item)}>
                                        {findValueFromID('types', item.type)}
                                    </td>
                                    <td data-title="Severity" key={'sev'+warnings.indexOf(item)}>
                                        {findValueFromID('severities', item.severity)}
                                    </td>
                                    <td data-title="Comment" key={'com'+warnings.indexOf(item)}>
                                        {item.comment}
                                    </td>
                                </tr>
                            ))
                                : ""}
                            </tbody>
                    </table>

                    <br></br>
                    <br></br>



                </div>

                
            </div>
        )
    } else {
        return null
    }
}
