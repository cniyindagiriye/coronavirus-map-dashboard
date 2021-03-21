import closeIcon from '../assets/icons/closeIcon.svg';
import testIcon from '../assets/icons/testIcon.svg';
import recoveredIcon from '../assets/icons/recoveredIcon.svg';
import activeIcon from '../assets/icons/activeIcon.svg';
import caseIcon from '../assets/icons/caseIcon.svg';
import deathIcon from '../assets/icons/deathIcon.svg';
import criticalIcon from '../assets/icons/criticalIcon.svg';

const Country = () => {
    return (
        <div className="country my-4 rounded-sm shadow-md flex absolute z-10 bg-gray-300 w-11/12 sm:w-1/2 md:w-2/5 flex-col items-center md:items-start max-w-4xl">
            <div className="px-2 py-4 w-full">
                <button className="absolute right-2 top-2"><img src={closeIcon} alt="close" /></button>
                <h1 className="text-xl text-left mt-2 text-gray-800 pb-1 border-b border-gray-600">Rwanda</h1>
                <div className="flex items-center justify-between py-2 mt-2">
                    <div className="flex items-center">
                        <img className="w-5 object-cover" src={caseIcon} alt="tests" />
                        <p className="ml-2 text-sm">Total cases</p>
                    </div>
                    <p className="text-sm text-gray-800">20000000000</p>
                </div>
                <div className="flex items-center justify-between py-2 border-t border-red-400">
                    <div className="flex items-center">
                        <img className="w-5 object-cover" src={activeIcon} alt="tests" />
                        <p className="ml-2 text-sm">Total active</p>
                    </div>
                    <p className="text-sm text-gray-800">20000000000</p>
                </div>
                <div className="flex items-center justify-between py-2 border-t border-red-400">
                    <div className="flex items-center">
                        <img className="w-5 object-cover" src={criticalIcon} alt="tests" />
                        <p className="ml-2 text-sm">Total critical</p>
                    </div>
                    <p className="text-sm text-gray-800">20000000000</p>
                </div>
                <div className="flex items-center justify-between py-2 border-t border-red-400">
                    <div className="flex items-center">
                        <img className="w-5 object-cover" src={testIcon} alt="tests" />
                        <p className="ml-2 text-sm">Total tests</p>
                    </div>
                    <p className="text-sm text-gray-800">20000000000</p>
                </div>
                <div className="flex items-center justify-between py-2 border-t border-red-400">
                    <div className="flex items-center">
                        <img className="w-5 object-cover" src={recoveredIcon} alt="tests" />
                        <p className="ml-2 text-sm">Total recovered</p>
                    </div>
                    <p className="text-sm text-gray-800">20000000000</p>
                </div>
                <div className="flex items-center justify-between py-2 border-t border-red-400">
                    <div className="flex items-center">
                        <img className="w-5 object-cover" src={deathIcon} alt="tests" />
                        <p className="ml-2 text-sm">Total deaths</p>
                    </div>
                    <p className="text-sm text-gray-800">20000000000</p>
                </div>
            </div>
        </div>
    )
}

export default Country;