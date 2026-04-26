import React from 'react';
import { usePlaces } from '../hooks/usePlaces';

const PlaceExplorer = ({ categoryId, title, icon }) => {
    const { filteredItems, loading, error, filters, setFilters } = usePlaces(categoryId);

    if (error) return <div className="p-10 text-red-500">{error}</div>;

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
            {/* CONTENIDO PRINCIPAL */}
            <main className="flex-1 p-6">
                <header className="mb-8 flex items-center gap-3">
                    <span className="text-3xl">{icon}</span>
                    <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
                </header>

                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3, 4, 5, 6].map(n => <SkeletonCard key={n} />)}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredItems.map(place => (
                            <PlaceCard key={place.fsq_id} place={place} />
                        ))}
                    </div>
                )}
            </main>

            {/* ASIDE DE FILTROS (DERECHA) */}
            <aside className="w-full md:w-80 bg-white border-l p-6 shadow-sm">
                <div className="sticky top-6">
                    <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 8.293A1 1 0 013 7.586V4z" /></svg>
                        Filtros
                    </h2>

                    <div className="space-y-8">
                        {/* Buscador */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Buscar por nombre</label>
                            <input
                                type="text"
                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="Ej: Grand Hotel..."
                                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                            />
                        </div>

                        {/* Slider de Rating */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Rating mínimo: <span className="text-blue-600 font-bold">{(filters.rating / 2).toFixed(1)} ⭐</span>
                            </label>
                            <input
                                type="range" min="0" max="10" step="1"
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                value={filters.rating}
                                onChange={(e) => setFilters({ ...filters, rating: parseInt(e.target.value) })}
                            />
                        </div>

                        <div className="pt-4 border-t text-sm text-gray-500">
                            Mostrando {filteredItems.length} resultados encontrados.
                        </div>
                    </div>
                </div>
            </aside>
        </div>
    );
};

// COMPONENTE TARJETA (CARD)
const PlaceCard = ({ place }) => {
    const photo = place.photos?.[0]
        ? `${place.photos[0].prefix}400x300${place.photos[0].suffix}`
        : 'https://via.placeholder.com/400x300?text=No+Image';

    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-gray-100">
            <div className="relative">
                <img src={photo} alt={place.name} className="w-full h-48 object-cover" />
                {place.rating && (
                    <span className="absolute top-3 right-3 bg-white px-2 py-1 rounded-lg font-bold text-sm shadow-md text-blue-600">
                        ⭐ {(place.rating / 2).toFixed(1)}
                    </span>
                )}
            </div>
            <div className="p-4">
                <h3 className="font-bold text-lg text-gray-800 truncate">{place.name}</h3>
                <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                    {place.description || "Explora los detalles de este increíble lugar ubicado en el corazón de la ciudad."}
                </p>
                <div className="mt-4 pt-4 border-t flex items-center justify-between">
                    <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                        {place.location?.locality || "Ubicación N/D"}
                    </span>
                    <button className="text-blue-600 font-semibold text-sm hover:underline">Ver más</button>
                </div>
            </div>
        </div>
    );
};

// EFECTO DE CARGA (SKELETON)
const SkeletonCard = () => (
    <div className="bg-gray-200 animate-pulse rounded-xl h-80 w-full"></div>
);

export default PlaceExplorer;