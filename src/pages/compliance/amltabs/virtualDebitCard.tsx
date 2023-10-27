import React from 'react'
import { currentCountries } from "../../../constants";
import Layout from "../layouts/virtual-form-layouts";
const VirtualDebitCard = () => {
 const countries = React.useMemo(() => currentCountries, []);
 return (
   <div>
     {countries.map((item, index) => (
       <Layout country={item} key={index} />
     ))}
   </div>
 );
}

export default VirtualDebitCard;