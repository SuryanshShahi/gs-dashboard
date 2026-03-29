import { getCountries, getCountriesStates, getStateCities } from "@/apis/apis";
import { ICountry } from "@/features/masterData/countries/types";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

const useCountries = ({ country, state }: { country?: string, state?: string }) => {
    const { data: countries, isLoading: isLoadingCountries } = useQuery<ICountry[]>({
        queryKey: ["countries"],
        queryFn: getCountries,
    });
    const { data: states } = useQuery<{ id: string, name: string }[]>({
        queryKey: ["states", country],
        queryFn: () => getCountriesStates(country ?? ""),
        enabled: !!country,
    });
    const { data: cities } = useQuery<{ id: string, name: string }[]>({
        queryKey: ["cities", state],
        queryFn: () => getStateCities(state ?? ""),
        enabled: !!state,
    });
    const countriesOptions = useMemo(() => {
        return countries?.map((country) => ({
            label: country.name,
            value: String(country.id),
        }));
    }, [countries]);
    const statesOptions = useMemo(() => {
        return states?.map((state) => ({
            label: state.name,
            value: String(state.id),
        }));
    }, [states]);
    const citiesOptions = useMemo(() => {
        return cities?.map((city) => ({
            label: city.name,
            value: String(city.id),
        }));
    }, [cities]);

    return { countriesOptions, statesOptions, citiesOptions ,isLoadingCountries};
}

export default useCountries