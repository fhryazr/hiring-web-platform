/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import AsyncSelect from "react-select/async";
import { Label } from "./ui/label";

interface Province {
  id: string;
  name: string;
}

interface Regency {
  id: string;
  province_id: string;
  name: string;
}

interface CityOption {
  value: string;
  label: string;
}

interface DomicileSelectProps {
  formData: { domicile?: string };
  handleChange: (field: string, value: string) => void;
  required?: boolean;
}

const DomicileSelect: React.FC<DomicileSelectProps> = ({
  formData,
  handleChange,
  required,
}) => {
  const loadOptions = async (inputValue: string): Promise<CityOption[]> => {
    try {
      const provRes = await fetch(
        "https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json"
      );
      const provinces: Province[] = await provRes.json();

      let filteredCities: CityOption[] = [];

      for (const province of provinces) {
        const regRes = await fetch(
          `https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${province.id}.json`
        );
        const regencies: Regency[] = await regRes.json();

        const matches = regencies
          .map((reg) => ({
            value: reg.id,
            label: `${reg.name} - ${province.name}`,
          }))
          .filter((city) =>
            city.label.toLowerCase().includes(inputValue.toLowerCase())
          );

        filteredCities = [...filteredCities, ...matches];
      }

      return filteredCities;
    } catch (err) {
      console.error("Error fetching cities:", err);
      return [];
    }
  };

  const selectedOption: CityOption | null = formData.domicile
    ? { value: formData.domicile, label: "" }
    : null;

  // Custom styles
  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      borderRadius: "0.375rem", // rounded-md
      borderColor: "#d1d5db", // gray-300
      minHeight: "2.5rem",
      boxShadow: "none", // remove ring
      "&:hover": {
        borderColor: "#9ca3af", // gray-400
      },
    }),
    placeholder: (provided: any) => ({
      ...provided,
      fontSize: "0.875rem", // text-sm
    }),
    singleValue: (provided: any) => ({
      ...provided,
      fontSize: "0.875rem",
    }),
    menu: (provided: any) => ({
      ...provided,
      zIndex: 9999,
    }),
    option: (provided: any) => ({
      ...provided,
      fontSize: "0.875rem",
    }),
  };

  return (
    <div>
      <Label htmlFor={"domicile"}>
        <span
          className={
            required ? "after:content-['*'] after:text-red-500 mb-2" : "mb-2"
          }>
          Domicile
        </span>
      </Label>
      <AsyncSelect
        cacheOptions
        defaultOptions
        loadOptions={loadOptions}
        value={selectedOption}
        onChange={(option) => handleChange("domicile", option?.value || "")}
        placeholder="Choose your domicile..."
        isClearable
        styles={customStyles}
      />
    </div>
  );
};

export default DomicileSelect;
