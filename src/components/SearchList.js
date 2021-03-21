import { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { setCountry } from '../store/actions/country';
import Search from './Search';

const SearchList = (props) => {

    const [state, setstate] = useState('');

    const { dataCountries, search, setData } = props;

    let searchs = useRef(null);
    let countries = useRef(null);

    useEffect(() => {
        setstate(search);

        const clickHandler = (dataCountry) => {
            setData(dataCountry);        
            setstate('');
        }

        if(dataCountries && search !== '') {
            
            countries.current = dataCountries.filter(dataCountry => {
                const to = dataCountry.country.toLowerCase();
                const from = search.toLowerCase();
                return to.startsWith(from);
            });
            if(countries.current) {
                searchs.current = countries.current.map( dataCountry => (
                    <Search clicked={(data) => clickHandler(data)} key={dataCountry.country} dataCountry={dataCountry} />
                ));
            }
        }
    }, [dataCountries, search, setData]);

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

const mapDispatchToProps = (dispatch) => ({
    setData: (data) => dispatch(setCountry(data)),
});
  

export default connect(mapStateToProps, mapDispatchToProps)(SearchList);