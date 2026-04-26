import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../../hooks/useGlobalReducer";
// Asegúrate de que el CSS no entre en conflicto con las clases de Bootstrap
import "./css/SearchBox.css";

export const SearchBox = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [open, setOpen] = useState(false);
    const [highlightIndex, setHighlightIndex] = useState(-1);

    const controllerRef = useRef(null);
    const inputGroupRef = useRef(null);
    const isSelectingRef = useRef(false);

    const { dispatch } = useGlobalReducer();
    const navigate = useNavigate();

    useEffect(() => {
        if (isSelectingRef.current) return;
        if (!query || query.length < 3) {
            setResults([]);
            setOpen(false);
            return;
        }
        const delay = setTimeout(() => fetchSuggestions(query), 300); // Subido a 300ms para ahorrar cuota API
        return () => clearTimeout(delay);
    }, [query]);

    const fetchSuggestions = async (text) => {
        try {
            if (controllerRef.current) controllerRef.current.abort();
            controllerRef.current = new AbortController();

            const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(text)}&lang=es&limit=10&apiKey=${import.meta.env.VITE_GEOAPIFY_KEY}`;

            const res = await fetch(url, { signal: controllerRef.current.signal });
            const data = await res.json();

            if (!data?.features) {
                setResults([]);
                setOpen(false);
                return;
            }

            setResults(orderResults(data.features));
            setOpen(true);
            setHighlightIndex(-1);
        } catch (err) {
            if (err.name !== "AbortError") console.error(err);
        }
    };

    const orderResults = (items) => {
        const priority = { poi: 1, amenity: 1, shop: 1, address: 2, street: 2, place: 3, locality: 3 };
        return [...items].sort((a, b) => {
            const ta = priority[a.properties.result_type] || 99;
            const tb = priority[b.properties.result_type] || 99;
            return ta - tb;
        });
    };

    // Función para obtener el icono según el tipo (FontAwesome)
    const getIcon = (type) => {
        switch (type) {
            case "poi":
            case "amenity":
            case "shop":
                return "fa-solid fa-shop text-primary";
            case "address":
            case "street":
                return "fa-solid fa-location-dot text-danger";
            default:
                return "fa-solid fa-city text-secondary";
        }
    };

    const handleSelect = (item) => {
        isSelectingRef.current = true;
        const { lon, lat } = item.properties;

        dispatch({ type: "SET_SELECTED_LOCATION", payload: { longitude: lon, latitude: lat, raw: item } });
        dispatch({ type: "UPDATE_LOCATION", payload: { longitude: lon, latitude: lat, zoom: 16 } });

        setQuery(item.properties.formatted);
        setOpen(false);
        navigate("/map");

        setTimeout(() => { isSelectingRef.current = false; }, 200);
    };

    const handleKeyDown = (e) => {
        if (!open || results.length === 0) return;
        if (e.key === "ArrowDown") {
            e.preventDefault();
            setHighlightIndex(prev => prev < results.length - 1 ? prev + 1 : prev);
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setHighlightIndex(prev => (prev > 0 ? prev - 1 : prev));
        } else if (e.key === "Enter" && highlightIndex >= 0) {
            e.preventDefault();
            handleSelect(results[highlightIndex]);
        } else if (e.key === "Escape") {
            setOpen(false);
        }
    };

    const highlightMatch = (text) => {
        if (!text) return "";
        const regex = new RegExp(`(${query})`, "gi");
        return text.replace(regex, "<mark class='p-0 bg-warning'>$1</mark>");
    };

    return (
        <div className="position-relative w-100 px-3 my-3">
            {/* INPUT INTEGRADO CON BOOTSTRAP */}
            <div className="input-group shadow-sm border rounded" ref={inputGroupRef}>
                <span className="input-group-text bg-white border-0">
                    <i className="fa-solid fa-magnifying-glass text-muted"></i>
                </span>
                <input
                    type="text"
                    className="form-control border-0 shadow-none py-2"
                    placeholder="Buscar lugares, direcciones o POI"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => results.length > 0 && setOpen(true)}
                    onBlur={() => setTimeout(() => setOpen(false), 200)}
                    onKeyDown={handleKeyDown}
                />
                {query.length > 0 && (
                    <button className="btn bg-white border-0" type="button" onClick={() => setQuery("")}>
                        <i className="fa-solid fa-xmark text-muted"></i>
                    </button>
                )}
            </div>

            {/* DROPDOWN CON ICONOS Y BOOTSTRAP */}
            {open && results.length > 0 && (
                <ul
                    className="list-group position-absolute shadow-lg mt-1"
                    style={{
                        zIndex: 1050,
                        width: inputGroupRef.current ? `${inputGroupRef.current.offsetWidth}px` : "100%",
                        maxHeight: "300px",
                        overflowY: "auto"
                    }}
                >
                    {results.map((item, index) => (
                        <li
                            key={item.properties.place_id || index}
                            className={`list-group-item list-group-item-action d-flex align-items-center border-start-0 border-end-0 ${index === highlightIndex ? "active text-white" : ""}`}
                            onMouseDown={() => handleSelect(item)}
                            style={{ cursor: 'pointer' }}
                        >
                            <div className="me-3">
                                <i className={`${getIcon(item.properties.result_type)} ${index === highlightIndex ? 'text-white' : ''}`}></i>
                            </div>
                            <div className="text-truncate">
                                <div
                                    className={`fw-bold mb-0 text-truncate ${index === highlightIndex ? 'text-white' : 'text-dark'}`}
                                    style={{ fontSize: "0.9rem" }}
                                    dangerouslySetInnerHTML={{
                                        __html: highlightMatch(item.properties.name || item.properties.street || "Resultado")
                                    }}
                                />
                                <div
                                    className={`small text-truncate ${index === highlightIndex ? 'text-white-50' : 'text-muted'}`}
                                    dangerouslySetInnerHTML={{
                                        __html: highlightMatch(item.properties.formatted)
                                    }}
                                />
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};