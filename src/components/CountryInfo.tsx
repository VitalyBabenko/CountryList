import { FC } from "react";
import "../scss/countryInfo.scss";

interface CountryInfoProps {
  info: string[][] | number[][];
}

const CountryInfo: FC<CountryInfoProps> = ({ info }) => {
  return (
    <ul className="country-info">
      {info.map((infoItem) => (
        <li>
          {infoItem[0]}: <span>{infoItem[1]}</span>
        </li>
      ))}
    </ul>
  );
};

export default CountryInfo;
