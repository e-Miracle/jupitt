import React from 'react'
import Layout from "../layouts/virtual-form-layouts";
import { useAppSelector } from "../../../store/hooks";
import { Spinner } from "@chakra-ui/react";
const VirtualDebitCard = () => {
   const { active_countries, active_countries_loader } = useAppSelector(
     (state) => state.countries
   );
   const countries = React.useMemo(() => active_countries, [active_countries]);
 return (
   <div>
     {active_countries_loader && <Spinner />}
     {!active_countries_loader &&
       countries &&
       countries.length > 0 &&
       countries.map((item, index) => <Layout country={item.name} id={item.id} key={index} />)}
   </div>
 );
}

export default VirtualDebitCard;