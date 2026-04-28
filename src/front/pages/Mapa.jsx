import { useState, useEffect } from 'react';
import { AccessibilityMap } from '../components/AccessibilityMap/AccessibilityMap'
import useGlobalReducer from '../hooks/useGlobalReducer';
import { FilterPanel } from '../components/FilterPanel/FilterPanel';

export const Mapa = () => {
    const { store } = useGlobalReducer()
    const { places } = store;
    const [showSidebar, setShowSidebar] = useState(true);

    const handleToggleSidebar = () => setShowSidebar(!showSidebar);

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
        </main>
    );
};
