import React from 'react'
import Tcard from '../../../components/tcard';
import { Btc } from '../../../assets';
import { currentCoins } from "../../../constants/index";
type Props = {
  coinName: string
}
const Layout: React.FC<Props> = ({ coinName }) => {
    
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-[1rem] mb-[2rem]">
      <Tcard
        type="deposit"
        coinName={coinName}
        value={Number(10405).toLocaleString()}
        img={Btc}
      />
      <Tcard
        type="withdraw"
        coinName={coinName}
        value={Number(10405).toLocaleString()}
        img={Btc}
      />
      <Tcard
        type="buy"
        coinName={coinName}
        value={Number(10405).toLocaleString()}
        img={Btc}
      />
      <Tcard
        type="sell"
        coinName={coinName}
        value={Number(10405).toLocaleString()}
        img={Btc}
      />
      <Tcard
        type="swap"
        coinName={coinName}
        value={Number(10405).toLocaleString()}
        img={Btc}
      />
    </div>
  );
};
const Crypto = () => {
  const countries = React.useMemo(() => currentCoins, []);
  return (
    <div>
      {countries.map((item, index) => (
        <Layout coinName={item} key={index} />
      ))}
    </div>
  );
}

export default Crypto;
