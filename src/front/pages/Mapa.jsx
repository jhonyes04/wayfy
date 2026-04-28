import { useState, useEffect } from 'react';
import { AccessibilityMap } from '../components/AccessibilityMap/AccessibilityMap'
import useGlobalReducer from '../hooks/useGlobalReducer';
import { FilterPanel } from '../components/FilterPanel/FilterPanel';
import { AccessibilityDetails } from '../components/AccessibilityMap/AccessibilityDetails'

export const Mapa = () => {
    const { store, dispatch } = useGlobalReducer()
    const { places, selectedFeature } = store;
    const [showSidebar, setShowSidebar] = useState(true);

    console.log(selectedFeature)

    const handleToggleSidebar = () => setShowSidebar(!showSidebar);

    const handleClose = () => {
        dispatch({ type: 'SET_SELECTED_FEATURE', payload: null })
    }

    useEffect(() => {
        const interval = setInterval(() => {
            window.dispatchEvent(new Event('resize'));
        }, 10);

        const timer = setTimeout(() => {
            clearInterval(interval);
            window.dispatchEvent(new Event('resize'));
        }, 300);

        return () => {
            clearInterval(interval);
            clearTimeout(timer);
        };
    }, [showSidebar]);

    return (
        <main className="d-flex flex-row flex-grow-1 position-relative">
            <section className="h-100 flex-grow-1 position-relative z-1 overflow-auto">
                <AccessibilityMap />
            </section>

            <FilterPanel />

            {selectedFeature && (
                <AccessibilityDetails feature={selectedFeature} onClose={handleClose} />
            )}
        </main>
    );
};
