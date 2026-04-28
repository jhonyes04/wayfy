import useGlobalReducer from '../../hooks/useGlobalReducer';
import { AccessibilityDetails } from './AccessibilityDetails';
import { FilterPanel } from '../FilterPanel/FilterPanel';
import { SearchMap } from './SearchMap';
import { SearchBox } from '../SearchBox/SearchBox';
import { PlacesList } from './PlacesList';

export const Sidebar = ({ show, toggle }) => {
    const { store, dispatch } = useGlobalReducer();
    const { activeFilters, selectedFeature } = store;

    const handleFilterChange = (newFilters) => {
        dispatch({
            type: 'SET_FILTERS',
            payload: newFilters,
        });
    };

    const handleCloseDetails = () => {
        dispatch({
            type: 'SET_SELECTED_FEATURE',
            payload: null,
        });
    };

    return (
        <section
            className={`sidebar ${show ? 'sidebar-show' : 'sidebar-hidden'} border-start shadow-sm d-flex flex-column position-relative z-1`}
        >
            <button
                className="btn btn-sm btn-primary rounded-start-pill position-absolute shadow-sm d-flex align-items-center justify-content-center sidebar-btn-left"
                onClick={toggle}
            >
                {show ? '❯' : '❮'}
            </button>

            <div
                className={`sidebar-content ${show ? 'sidebar-content-show' : 'sidebar-content-hidden'} d-flex flex-column overflow-hidden`}
            >
                <SearchMap />

                {/* <SearchBox variant='compact' /> */}

                <div className="overflow-auto px-3">
                    {selectedFeature && (
                        <>
                            <AccessibilityDetails
                                feature={selectedFeature}
                                onClose={handleCloseDetails}
                            />
                            <hr />
                        </>
                    )}

                    <FilterPanel
                        active={activeFilters}
                        onChange={handleFilterChange}
                    />

                    <PlacesList />
                </div>
            </div>
        </section>
    );
};
