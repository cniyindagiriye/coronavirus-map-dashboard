import { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import Search from './Search';

const SearchList = (props) => {

    const [state, setstate] = useState('');

    const { dataCountries, search } = props;

    let searchs = useRef(null);
    let countries = useRef(null);

    useEffect(() => {
        setstate(search);
        if(dataCountries && search !== '') {
            
            countries.current = dataCountries.filter(dataCountry => {
                const to = dataCountry.country.toLowerCase();
                const from = search.toLowerCase();
                return to.startsWith(from);
            });
            if(countries.current) {
                console.log(countries.current);
                searchs.current = countries.current.map( dataCountry => (
                    <Search key={dataCountry.country} dataCountry={dataCountry} />
                ));
            }
        }
    }, [dataCountries, search, state]);

    return (
        <div className={ state === '' ? "hidden" : "m-auto flex w-full flex-col items-center md:items-end max-w-4xl"}>
            <ul className="search rounded-sm shadow-lg w-full max-h-80 overflow-y-scroll">{searchs.current}</ul>
        </div>
    )

}

const mapStateToProps = (state) => ({
    search: state.search.name,
    dataCountries: state.covidData.data
});

export default connect(mapStateToProps)(SearchList);