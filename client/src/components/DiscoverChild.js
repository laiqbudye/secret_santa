import React, {useEffect, useContext} from 'react';
import { GlobalContext } from '../context/GlobalState';

const DiscoverChild = (props) => {

    const { verifyEmployee, isAuthenticated, empData } = useContext(GlobalContext)
    
    useEffect(()=> {
        verifyEmployee(props.match.params.empid, props.match.params.token)
    },[])

    return (
        <div>
            {isAuthenticated ? <h1>Hello {empData.name}</h1> : <h1>It seems you are not registered with us!!!</h1>}
        </div>
    )
}

export default DiscoverChild;