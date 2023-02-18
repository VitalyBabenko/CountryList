import {
  ChangeEvent,
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { MdKeyboardArrowDown, MdSearch } from "react-icons/md";
import useDebounce from "../hooks/useDebounce";
import { ICountry } from "../types/ICountry";

type InputProps = {
  countries: ICountry[];
  setFilteredCountries: Dispatch<SetStateAction<ICountry[]>>;
  setPage: (arg: number) => void;
};

const Input: FC<InputProps> = ({
  countries,
  setFilteredCountries,
  setPage,
}) => {
  const [inputValue, setInputValue] = useState("");
  const debouncedSearch = useDebounce(inputValue);

  const filterByInput = (value: string) => {
    if (!value) {
      return countries;
    } else {
      return countries.filter((c) =>
        c.name.common.toLowerCase().includes(value.toLowerCase())
      );
    }
  };

  useEffect(() => {
    setFilteredCountries(filterByInput(debouncedSearch));
    setPage(0);
    // eslint-disable-next-line
  }, [debouncedSearch]);

  return (
    <>
      <MdSearch />
      <MdKeyboardArrowDown />
      <input
        onInput={(e: ChangeEvent<HTMLInputElement>) =>
          setInputValue(e.target.value)
        }
        type="text"
        placeholder="Search for a country..."
      />
    </>
  );
};

export default Input;
