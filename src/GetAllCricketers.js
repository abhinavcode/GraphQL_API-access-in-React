import React, {useState} from 'react';

import {useMutation, useQuery, useLazyQuery} from '@apollo/react-hooks';
import gql from "graphql-tag";

const GetAllCricketers = () => {

    const GET_ALL_CRICKETERS_INFO = gql`
        query getAllCricketers{
            getAllCricketers{
                age
                matches
                name
                id
                runs
                wickets
            }
        }
    `;

    //console.log("Again");
    const [details,setDetails] = useState({name: false, age: false, matches: false});

    const [getAllCricketers,{data, loading, error}] = useLazyQuery(GET_ALL_CRICKETERS_INFO,
        {fetchPolicy: "network-only"});

    if (loading) return <p>Loading ...</p>;
    if (error) return <p>Error!</p>;

    //console.log(data);

    return (
        <div className="get-all-cricketers">
            <form onSubmit={(event)=>{
                event.preventDefault();
                getAllCricketers();
                console.log(data);
            }}>
                <label htmlFor="name">Name</label>
                <input type="checkbox" id="name" checked={details.name} onChange={(event)=>{
                    setDetails({...details,name: !details.name});
                    //console.log(details);
                }}/>
                <label htmlFor="age">Age</label>
                <input type="checkbox" id="age" checked={details.age} onChange={(event)=>{
                    setDetails({...details,age: !details.age});
                    //console.log(details);
                }}/>
                <label htmlFor="matches">Matches</label>
                <input type="checkbox" id="matches" checked={details.matches} onChange={(event)=>{
                    setDetails({...details,matches: !details.matches});
                    //console.log(details);
                }}/>
                <button type="submit">Get These Details</button>
            </form>
            {(data)?
                (data.getAllCricketers.map((e) => {

                    return (
                        <p key={e.id}>
                            {details.name?e.name+", ":null}
                            {details.age?e.age+", ":null}
                            {details.matches?e.matches+", ":null}
                            {e.id}
                            <br/>
                        </p>
                    )
                })):null}
        </div>
    )
}

export default GetAllCricketers;