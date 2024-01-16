import React, {useEffect, useState} from 'react';
import {citiesList} from "../assets/cities";
import Input from "./input";
import {Down2} from "../assets/icons";

export default function SelectCity() {

    const [selected, setSelected] = useState(false);
    const [selectedCity, setSelectedCity] = useState(null);

    const [searchProvinceQuery, setSearchProvinceQuery] = useState('');
    const [provinceResults, setProvinceResults] = useState([]);
    const [provinceSearching, setProvinceSearching] = useState(false);

    const [searchCityQuery, setSearchCityQuery] = useState('');
    const [cityResults, setCityResults] = useState([]);
    const [citySearching, setCitySearching] = useState(false);

    function handleSelectProvince(province) {
        setProvinceSearching(false)
        setSelected(true)
        setSearchProvinceQuery(province)
        setSearchCityQuery('')
        for (let city = 0; city < citiesList.length; city++) {
            if (province ===citiesList[city].province) {
                setSelectedCity(citiesList[city].cities)
            }
        }
    }

    const filterProvinceResult = (searchProvinceQuery) => {
        const filtered =citiesList.filter((item) => {
            return item.province.includes(searchProvinceQuery);
        });
        setProvinceResults(filtered);
    };

    const handleProvinceSearch = (e) => {
        setProvinceSearching(true)
        setSearchProvinceQuery(e.target.value);
        filterProvinceResult(e.target.value);
    };

    const filterCitiesResult = (searchProvinceQuery) => {
        const filtered = selectedCity && selectedCity.filter((item) => {
            return item.includes(searchProvinceQuery);
        });
        setCityResults(filtered)
    };

    const handleCitySearch = (e) => {
        setCitySearching(true)
        setSearchCityQuery(e.target.value);
        filterCitiesResult(e.target.value);
    };

    function handleSelectCity(title) {
        setSearchCityQuery(title);
        setCitySearching(false);
    }

    return (
        <div className="w-full flex justify-center items-center flex-col relative">
            <div className="addressDetailPart w-[342px] flex justify-center items-center relative mt-5">
                <Input value={searchProvinceQuery} onChange={(e) => handleProvinceSearch(e)}
                       className="w-full border-2 border-gray-400 outline-none p-2 rounded-2xl"
                       placeholder="تهران"/>
                <span className="absolute -top-2 right-5 px-1 bg-white text-gray90 BODY-16B">استان</span>
                {
                    !provinceSearching &&
                    <Down2 className="absolute w-5 h-5 text-primary left-4"/>
                }
                {
                    provinceSearching &&
                    <div
                        className="w-full max-h-[271px] flex juitems-start items-start flex-col border absolute top-12 bg-primaryLight shadow rounded-lg z-[50]
                    text-gray80 overflow-x-hidden overflow-y-scroll scrollbar-hide bg-white">
                        {
                            provinceResults.map((item, index) => (
                                <div onClick={() => handleSelectProvince(item.province)} key={index}
                                     className="w-full flex justify-start items-center p-2 border-b cursor-pointer">
                                    {item.province}
                                </div>
                            ))
                        }
                    </div>
                }
            </div>
            <div className={`addressDetailPart w-[342px] flex justify-center items-center relative mt-5`}>
                <Input value={searchCityQuery} onChange={(e) => handleCitySearch(e)}
                       readOnly={!selected}
                       className={`w-full border-2 border-gray-400 outline-none p-2 rounded-2xl ${selected ? "bg-white" : "bg-gray-100"}`}
                       placeholder="تهران"/>
                <span className={`absolute -top-3 right-5 ${!selected ? "py-1"  : "py-0"} p-1 rounded-full bg-white text-gray90 BODY-16B`}>شهر</span>
                {
                    !citySearching &&
                    <Down2 className="absolute w-5 h-5 text-primary left-4"/>
                }
                {
                    citySearching && !provinceSearching &&
                    <div
                        className="w-full max-h-[271px] flex justify-start items-start flex-col absolute top-12 bg-primaryLight rounded-lg z-[50]
                    text-gray80 overflow-x-hidden overflow-y-scroll scrollbar-hide">
                        {
                            cityResults.map((item, index) => (
                                <div onClick={() => handleSelectCity(item)} key={index}
                                     className="w-full flex justify-start items-center p-2 border-b cursor-pointer">
                                    {item}
                                </div>
                            ))
                        }
                    </div>
                }
            </div>
        </div>
    )
}