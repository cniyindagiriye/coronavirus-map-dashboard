import closeIcon from '../assets/icons/closeIcon.svg';
import testIcon from '../assets/icons/testIcon.svg';
import recoveredIcon from '../assets/icons/recoveredIcon.svg';
import activeIcon from '../assets/icons/activeIcon.svg';
import caseIcon from '../assets/icons/caseIcon.svg';
import deathIcon from '../assets/icons/deathIcon.svg';
import criticalIcon from '../assets/icons/criticalIcon.svg';
import { connect } from 'react-redux';
import { setCountry } from '../store/actions/country';

const Country = (props) => {
    const { data, setData } = props;
    let active = 0,
        country = '',
        cases = 0,
        critical = 0,
        deaths = 0,
        recovered = 0,
        tests = 0,
        todayCases = 0,
        todayDeaths = 0,
        todayRecovered = 0,
        countryInfo = {
            flag: ''
        };

    if(data) {
        country = data.country;
        countryInfo = data.countryInfo;
        active = data.active;
        cases = data.cases;
        critical = data.critical;
        deaths = data.deaths;
        recovered = data.recovered;
        tests = data.tests;
        todayCases = data.todayCases;
        todayDeaths = data.todayDeaths;
        todayRecovered = data.todayRecovered
    }
    
    function numberWithCommas(x) {
        x = Number.isInteger(x) ? x : Number(x).toFixed(3);
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ", ");
    }
    return (
        <div className={data === null ? "hidden" : "country my-4 rounded-sm shadow-md flex absolute z-10 bg-gray-300 w-11/12 sm:w-1/2 md:w-2/5 flex-col items-start"}>
            <div className="px-2 py-4 w-full">
                <button onClick={() => setData(null)} className="absolute right-2 top-2"><img src={closeIcon} alt="close" /></button>
                <div className="flex items-end">
                    <img className="w-1/2 object-cover" src={countryInfo.flag} alt="flag" />
                    <h1 className="ml-2 text-xl text-left mt-2 text-gray-800 pb-1 border-b border-gray-600">{country}</h1>
                </div>
                <div className="flex items-center justify-between py-2 mt-2">
                    <div className="flex items-center">
                        <img className="w-5 object-cover" src={caseIcon} alt="tests" />
                        <p className="ml-2 text-sm">Total cases</p>
                    </div>
                    <p className="text-sm text-gray-800">{numberWithCommas(cases) + "( +" + numberWithCommas(todayCases) + " )"}</p>
                </div>
                <div className="flex items-center justify-between py-2 border-t border-red-400">
                    <div className="flex items-center">
                        <img className="w-5 object-cover" src={activeIcon} alt="tests" />
                        <p className="ml-2 text-sm">Total active</p>
                    </div>
                    <p className="text-sm text-gray-800">{numberWithCommas(active)}</p>
                </div>
                <div className="flex items-center justify-between py-2 border-t border-red-400">
                    <div className="flex items-center">
                        <img className="w-5 object-cover" src={criticalIcon} alt="tests" />
                        <p className="ml-2 text-sm">Total critical</p>
                    </div>
                    <p className="text-sm text-gray-800">{numberWithCommas(critical)}</p>
                </div>
                <div className="flex items-center justify-between py-2 border-t border-red-400">
                    <div className="flex items-center">
                        <img className="w-5 object-cover" src={testIcon} alt="tests" />
                        <p className="ml-2 text-sm">Total tests</p>
                    </div>
                    <p className="text-sm text-gray-800">{numberWithCommas(tests)}</p>
                </div>
                <div className="flex items-center justify-between py-2 border-t border-red-400">
                    <div className="flex items-center">
                        <img className="w-5 object-cover" src={recoveredIcon} alt="tests" />
                        <p className="ml-2 text-sm">Total recovered</p>
                    </div>
                    <p className="text-sm text-gray-800">{numberWithCommas(recovered) + "( +" + numberWithCommas(todayRecovered) + " )"}</p>
                </div>
                <div className="flex items-center justify-between py-2 border-t border-red-400">
                    <div className="flex items-center">
                        <img className="w-5 object-cover" src={deathIcon} alt="tests" />
                        <p className="ml-2 text-sm">Total deaths</p>
                    </div>
                    <p className="text-sm text-gray-800">{numberWithCommas(deaths) + "( +" + numberWithCommas(todayDeaths) + " )"}</p>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    data: state.country.data
})

const mapDispatchToProps = (dispatch) => ({
    setData: (data) => dispatch(setCountry(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Country);