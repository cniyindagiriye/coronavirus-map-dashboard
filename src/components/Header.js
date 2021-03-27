import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { search } from '../store/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle, faSearchLocation, faVirus } from "@fortawesome/free-solid-svg-icons";

const Header = (props) => {
    let { searchCountry } = props;
    const [countryName, setCountry] = useState('');
    useEffect(() => {
        searchCountry(countryName);
    }, [countryName, searchCountry])
    return (
        <header className="App-header w-full md:shadow-md flex flex-col items-center">
            <div className="max-w-4xl w-full">
                <nav className="md:flex p-1 px-1 justify-between items-center">
                    <div className="flex items-center">
                        <FontAwesomeIcon icon={faVirus} className="text-red-900 md:text-2xl" />
                        <span className="ml-1">Coronavirus(Covid-19)</span>
                    </div>
                    <div className="flex items-center border border-gray-600 md:w-1/2 bg-white p-0.5 rounded-sm shadow-lg">
                        <FontAwesomeIcon icon={faSearchLocation} className="text-blue-600 text-lg" />
                        <input placeholder="Country" onChange={(event) => setCountry(event.target.value.trim()) } value={countryName} className="placeholder-blue-900 placeholder-opacity-50 capitalize w-full focus:outline-none mx-1 text-gray-700" type="text" />
                        <button onClick={() => setCountry('')} className={!countryName ? "hidden" : "focus:outline-none"}><FontAwesomeIcon icon={faTimesCircle} className="text-gray-400 hover:text-red-600 text-lg" /></button>
                    </div>
                </nav>
            </div>
        </header>
    )
}

const mapDispatchToProps = (dispatch) => ({
    searchCountry: (country) => dispatch(search(country)),
});

export default connect(null, mapDispatchToProps)(Header);
