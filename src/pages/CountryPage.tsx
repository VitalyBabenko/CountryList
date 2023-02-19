import { FC, useEffect } from "react";
import { MdArrowBack } from "react-icons/md";
import { useParams, useNavigate } from "react-router-dom";
import CountryBorders from "../components/CountryBorders";
import CountryInfo from "../components/CountryInfo";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import "../scss/countryPage.scss";
import { fetchCountry } from "../store/reducers/ActionCreators";
import LoadingPage from "./LoadingPage";

const CountryPage: FC = () => {
  const dispatch = useAppDispatch();
  const { country, isLoading, error } = useAppSelector(
    (state) => state.countryReducer
  );
  const navigate = useNavigate();
  const { name } = useParams();

  useEffect(() => {
    dispatch(fetchCountry(name));
    // eslint-disable-next-line
  }, [name]);

  if (isLoading) return <LoadingPage />;
  if (error) return <h1>Error</h1>;

  return (
    <div className="country-page">
      <button onClick={() => navigate(-1)}>
        <MdArrowBack />
        Back
      </button>
      <img src={country.flags.svg} alt="country-flag" />
      <h2>{country.name.common}</h2>

      <CountryInfo
        info={[
          ["Official name", country.name.official],
          ["Population", country.population],
          ["Region", country.region],
          ["Sub Region", country.subregion],
        ]}
      />

      <CountryInfo
        info={[
          ["Capital", country.capital],
          ["Area", country.area],
          ["Languages", Object.values(country.languages).join(", ")],
        ]}
      />

      <CountryBorders borders={country.borders} />
    </div>
  );
};

export default CountryPage;
