import React, { useState, useEffect, useRef } from 'react';
import { Calendar, MapPin, Navigation2, X, Loader2 } from 'lucide-react';
import { formatDateForInput } from '../utils/pricing';

interface BookingFormProps {
  origin: string;
  setOrigin: (val: string) => void;
  destination: string;
  setDestination: (val: string) => void;
  date: Date;
  setDate: (date: Date) => void;
  isRoundTrip: boolean;
  setIsRoundTrip: (val: boolean) => void;
}

// Define interface for Google Maps Place Prediction since we don't have types
interface AutocompletePrediction {
  description: string;
  place_id: string;
  structured_formatting: {
    main_text: string;
    secondary_text: string;
  };
}

// --- Internal Component for Autocomplete Input ---
interface AddressInputProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  icon: React.ReactNode;
  placeholder: string;
}

const AddressInput: React.FC<AddressInputProps> = ({ label, value, onChange, icon, placeholder }) => {
  const [suggestions, setSuggestions] = useState<AutocompletePrediction[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  
  // Debounce helper
  useEffect(() => {
    const timer = setTimeout(() => {
      if (value.length > 2 && showSuggestions) {
        fetchSuggestions(value);
      } else if (value.length <= 2) {
        setSuggestions([]);
      }
    }, 400); // 400ms debounce

    return () => clearTimeout(timer);
  }, [value, showSuggestions]);

  // Click outside to close
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [wrapperRef]);

  const fetchSuggestions = (inputValue: string) => {
    // Check if Google Maps script is loaded
    if (!window.google || !window.google.maps || !window.google.maps.places) {
      return;
    }

    setIsLoading(true);
    const service = new window.google.maps.places.AutocompleteService();
    
    service.getPlacePredictions({
      input: inputValue,
      componentRestrictions: { country: 'fr' }, // Limit to France
      types: ['geocode', 'establishment']
    }, (predictions: any, status: any) => {
      setIsLoading(false);
      if (status === window.google.maps.places.PlacesServiceStatus.OK && predictions) {
        setSuggestions(predictions);
      } else {
        setSuggestions([]);
      }
    });
  };

  const handleSelect = (prediction: AutocompletePrediction) => {
    onChange(prediction.description);
    setSuggestions([]);
    setShowSuggestions(false);
  };

  return (
    <div className="relative group" ref={wrapperRef}>
      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">{label}</label>
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-amber-500 transition-colors flex items-center justify-center">
          {isLoading ? <Loader2 className="animate-spin w-4 h-4" /> : icon}
        </div>
        
        <input
          type="text"
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => {
            if (value.length > 2) setShowSuggestions(true);
          }}
          placeholder={placeholder}
          className="w-full pl-10 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all truncate"
          autoComplete="off"
        />
        
        {value.length > 0 && (
          <button 
            onClick={() => {
              onChange('');
              setSuggestions([]);
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500"
          >
            <X size={16} />
          </button>
        )}

        {/* Suggestions Dropdown */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute z-50 w-full mt-1 bg-white rounded-lg shadow-xl border border-slate-100 max-h-60 overflow-y-auto">
            {suggestions.map((prediction) => (
              <div
                key={prediction.place_id}
                onClick={() => handleSelect(prediction)}
                className="px-4 py-3 hover:bg-amber-50 cursor-pointer border-b border-slate-50 last:border-0 transition-colors flex items-start gap-3"
              >
                <MapPin className="w-4 h-4 text-slate-400 mt-1 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-slate-700">{prediction.structured_formatting.main_text}</p>
                  <p className="text-xs text-slate-400">{prediction.structured_formatting.secondary_text}</p>
                </div>
              </div>
            ))}
            <div className="px-2 py-1 flex justify-end">
               <img src="https://maps.gstatic.com/mapfiles/api-3/images/powered-by-google-on-white3.png" alt="Powered by Google" className="h-3 opacity-50" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};


const BookingForm: React.FC<BookingFormProps> = ({
  origin,
  setOrigin,
  destination,
  setDestination,
  date,
  setDate,
  isRoundTrip,
  setIsRoundTrip
}) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl border border-slate-100">
      <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
        <span className="bg-taxi-yellow text-taxi-black p-1 rounded">TAXI</span>
        <span>RESA</span>
      </h2>

      <div className="space-y-4">
        {/* Origin with Autocomplete */}
        <AddressInput
          label="Départ"
          placeholder="Adresse de départ (France)..."
          value={origin}
          onChange={setOrigin}
          icon={<MapPin size={20} />}
        />

        {/* Destination with Autocomplete */}
        <AddressInput
          label="Arrivée"
          placeholder="Adresse d'arrivée (France)..."
          value={destination}
          onChange={setDestination}
          icon={<Navigation2 size={20} />}
        />

        {/* Date & Time */}
        <div className="relative group">
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Date & Heure</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-amber-500 transition-colors" />
            <input
              type="datetime-local"
              value={formatDateForInput(date)}
              onChange={(e) => setDate(new Date(e.target.value))}
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all appearance-none"
            />
          </div>
        </div>

        {/* Trip Type Toggle */}
        <div className="flex items-center gap-4 py-2">
          <label className="flex items-center gap-2 cursor-pointer group">
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${!isRoundTrip ? 'border-amber-500' : 'border-slate-300'}`}>
              {!isRoundTrip && <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />}
            </div>
            <input
              type="radio"
              checked={!isRoundTrip}
              onChange={() => setIsRoundTrip(false)}
              className="hidden"
            />
            <span className={`text-sm font-medium ${!isRoundTrip ? 'text-slate-900' : 'text-slate-500'}`}>Aller Simple</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer group">
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${isRoundTrip ? 'border-amber-500' : 'border-slate-300'}`}>
              {isRoundTrip && <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />}
            </div>
            <input
              type="radio"
              checked={isRoundTrip}
              onChange={() => setIsRoundTrip(true)}
              className="hidden"
            />
            <span className={`text-sm font-medium ${isRoundTrip ? 'text-slate-900' : 'text-slate-500'}`}>Aller / Retour</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;