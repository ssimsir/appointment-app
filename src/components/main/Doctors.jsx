import { useEffect, useState } from "react";
import {doctorData} from "../../helpers/data"
import Doctor from "./Doctor"
import axios from "axios"

const Doctors = () => {

    const [loading, setLoading] = useState (false); 
    const [posts, setPosts] = useState([]); 
  
    useEffect (() => { 
        const loadPost = async () => { 
            // Till the data is fetch using API 
            // the Loading page will show. 
            setLoading(true); 
  
            // Await make wait until that 
            // promise settles and return its result 
            const response = await axios.get( 
                "https://mock-server-cdkz.onrender.com/appointment-app"
            ); 
  
            // After fetching data stored it in posts state. 
            setPosts(response.data); 
                
            // Closed the loading page 
            setLoading(false); 
        }; 
  
        // Call the function 
        loadPost(); 
    }, []); 
    console.log(posts)
    if (!loading){console.log(posts)}
    
    const doctorData1 =posts.doctorData
    return(
        <>
<div>

        {loading ? ( 
            
            <h4>Loading...</h4> 
        ) : ( 
            doctorData1.map(doctor => <Doctor key={doctor.id} doctor={doctor}/>) 
        )} 


        
        </div>
        </>
    )
}
export default Doctors



