import { FC } from "react";
import { NavLink } from "react-router-dom";

import "../scss/countryCard.scss";
import { ICountry } from "../types/ICountry";
import CountryInfo from "./CountryInfo";

interface CountryCardProps {
  country: ICountry;
}

const CountryCard: FC<CountryCardProps> = ({ country }) => {
  return (
    <NavLink to={`/${country.name.common}`} className="country-card">
      <img src={country.flags.png} alt="" />
      <h3>{`${country.name.common}`}</h3>

      <CountryInfo
        info={[
          ["Official name", country.name.official],
          ["Population", country.population.toString()],
          ["Region", country.region],
        ]}
      />
    </NavLink>
  );
};

export default CountryCard;
