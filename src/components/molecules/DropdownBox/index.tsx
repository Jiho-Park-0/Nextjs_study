"use client";

import React, { useCallback } from "react";
import Dropdown from "@/components/atoms/Dropdown";
import { useQueries } from "@tanstack/react-query";
import getCities from "@/apis/getCities";
import getCountries from "@/apis/getCountries";
import getDistricts from "@/apis/getDistricts";

interface Props {
  selectedOptionIds: {
    cityId: number;
    countryId: number;
    districtId: number;
  };
  setSelectedOptionIds: React.Dispatch<
    React.SetStateAction<{
      cityId: number;
      countryId: number;
      districtId: number;
    }>
  >;
  styleType: "big" | "small";
}

function DropdownBox({ styleType, selectedOptionIds, setSelectedOptionIds }: Props) {
  const queries = useQueries({
    queries: [
      {
        queryKey: ["cityId"],
        queryFn: async () => {
          const response = await getCities();
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        },
      },
      {
        queryKey: ["countryId", selectedOptionIds.cityId],
        queryFn: async () => {
          const response = await getCountries(selectedOptionIds.cityId);
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        },
      },
      {
        queryKey: ["districtId", selectedOptionIds.countryId],
        queryFn: async () => {
          const response = await getDistricts(selectedOptionIds.countryId);
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        },
      },
    ],
  });

  const options1 = queries[0]?.data?.response?.cities || [];
  const options2 = queries[1]?.data?.response?.countries || [];
  const options3 = queries[2]?.data?.response?.districts || [];

  const handleDropdownChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>, dropdownType: "cityId" | "countryId" | "districtId") => {
      const newValue = parseInt(e.target.value, 10); // e.target.value는 기본적으로 string -> number로 변환
      // city가 바뀌면 country와 district는 0으로 초기화, country가 바뀌면 district는 0으로 초기화
      if (dropdownType === "cityId") {
        setSelectedOptionIds({ cityId: newValue, countryId: 0, districtId: 0 });
      } else if (dropdownType === "countryId") {
        setSelectedOptionIds((prevIds) => ({
          ...prevIds,
          countryId: newValue,
          districtId: 0,
        }));
      } else {
        setSelectedOptionIds((prevIds) => ({
          ...prevIds,
          [dropdownType]: newValue,
        }));
      }
    },
    [setSelectedOptionIds],
  );

  return (
    <div className="flex justify-between">
      <Dropdown
        placeholder="광역시 / 도"
        options={options1}
        onChange={(e) => handleDropdownChange(e, "cityId")}
        styleType={styleType}
        selectedOptionId={selectedOptionIds.cityId}
      />

      <Dropdown
        placeholder="시 / 군 / 구"
        options={options2}
        onChange={(e) => handleDropdownChange(e, "countryId")}
        styleType={styleType}
        selectedOptionId={selectedOptionIds.countryId}
      />

      <Dropdown
        placeholder="읍 / 면 / 동"
        options={options3}
        onChange={(e) => handleDropdownChange(e, "districtId")}
        styleType={styleType}
        selectedOptionId={selectedOptionIds.districtId}
      />
    </div>
  );
}

export default DropdownBox;
