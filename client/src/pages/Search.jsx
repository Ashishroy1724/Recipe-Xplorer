import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ListingItem from "../components/ListingItem";

export default function Search() {
    const navigate = useNavigate();
    const location = useLocation();
    const [sidebardata, setSidebardata] = useState({
        searchTerm: '',
        breakfast: false,
        lunch: false,
        snack: false,
        dinner: false,
        sort: 'created_at',
        order: 'desc',
    });
    const [loading, setLoading] = useState(false);
    const [listings, setListings] = useState([]);

    console.log(listings);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        const breakfastFromUrl = urlParams.get('breakfast');
        const lunchFromUrl = urlParams.get('lunch');
        const snackFromUrl = urlParams.get('snack');
        const dinnerFromUrl = urlParams.get('dinner');
        const sortFromUrl = urlParams.get('sort');
        const orderFromUrl = urlParams.get('order');

        if(
            searchTermFromUrl ||
            breakfastFromUrl ||
            lunchFromUrl ||
            snackFromUrl ||
            dinnerFromUrl ||
            sortFromUrl ||
            orderFromUrl 
        ){
            setSidebardata({
                searchTerm: searchTermFromUrl || '',
                breakfast: breakfastFromUrl === 'true' ? true:false,
                lunch: lunchFromUrl === 'true' ? true:false,
                snack: snackFromUrl === 'true' ? true:false,
                dinner: dinnerFromUrl === 'true' ? true:false,
                sort: sortFromUrl || 'created_at',
                order: orderFromUrl || 'desc',
            })
        }

        const fetchListings = async () => {
            setLoading(true);
            const searchQuery = urlParams.toString();
            const res = await fetch(`/api/listing/get?${searchQuery}`);
            const data = await res.json();
            setListings(data);
            setLoading(false);
        }
        fetchListings();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.search]);

    const handleChange = (e) => {

        if(e.target.id === 'searchTerm'){
            setSidebardata({...sidebardata, searchTerm: e.target.value})
        }

        if(e.target.id === 'breakfast' || e.target.id === 'lunch' || e.target.id === 'snack' || e.target.id === 'dinner'){
            setSidebardata({...sidebardata,[e.target.id]: e.target.checked || e.target.checked === 'true' ? true : false,}); 
        }

        if(e.target.id === 'sort_order'){
            const sort = e.target.value.split('_')[0] || 'created_at';
            const  order = e.target.value.split('_')[1]||'desc';
            setSidebardata({ ...sidebardata, sort, order });

        }

    };


    // ------------ Submit handling --------------

    const handleSubmit  = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams()
        urlParams.set('searchTerm', sidebardata.searchTerm)
        urlParams.set('breakfast', sidebardata.breakfast)
        urlParams.set('lunch', sidebardata.lunch)
        urlParams.set('snack', sidebardata.snack)
        urlParams.set('dinner', sidebardata.dinner)
        urlParams.set('sort', sidebardata.sort)
        urlParams.set('order', sidebardata.order)
        const searchQuery = urlParams.toString()
        navigate(`/search?${searchQuery}`);
    };

  return (
    <div className='flex flex-col md:flex-row'>
        <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
            <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
                <div className="flex items-center gap-2">
                    <label className='whitespace-nowrap font-semibold'>Search Term:</label>
                    <input 
                    type="text"
                    id="searchTerm"
                    placeholder='Search...' 
                    className='border rounded-lg p-3 w-full'
                    value={sidebardata.searchTerm}
                    onChange={handleChange}
                    />
                </div>
                <div className="flex gap-2 flex-wrap items-center">
                    <label className='font-semibold'>Food Type:</label>
                    <div className="flex gap-2">
                        <input 
                        type="checkbox" 
                        id="breakfast" 
                        className="w-5" 
                        onChange={handleChange}
                        checked={sidebardata.breakfast}
                    />
                    <span>Breakfast</span>
                    </div>
                    <div className="flex gap-2">
                        <input 
                        type="checkbox" 
                        id="lunch" 
                        className="w-5" 
                        onChange={handleChange}
                        checked={sidebardata.lunch}
                    />
                    <span>Lunch</span>
                    </div>

                    <div className="flex gap-2">
                        <input 
                        type="checkbox" 
                        id="snack" 
                        className="w-5" 
                        onChange={handleChange}
                        checked={sidebardata.snack}
                    />
                    <span>Snack</span>
                    </div>
                    <div className="flex gap-2">
                        <input 
                        type="checkbox" 
                        id="dinner" 
                        className="w-5" 
                        onChange={handleChange}
                        checked={sidebardata.dinner}
                    />
                    <span>Dinner</span>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <label className='font-semibold'>
                        Sort:
                    </label>
                    <select 
                    className='border rounded-lg p-3' 
                    id="sort_order"
                    onChange={handleChange}
                    defaultValue={'created_at_desc'}
                    >
                        <option value={'createdAt_desc'}>Latest</option>
                        <option value={'createdAt_asc'}>Oldest</option>
                    </select>
                </div>
                <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>Search</button>
            </form>
        </div>
        <div className="flex-1">
            <h1 className='text-3xl font-semibold border-b p-3 text-slate-700 mt-5'>Listing Result:</h1>
            <div className="p-7 flex flex-wrap gap-4">
                {!loading && listings.length === 0 && (
                    <p className="text-xl text-slate-700">No Listing Found!</p>
                )}
                {loading && (
                 <p className="text-xl text-slate-700 text-center w-full">Loading...</p>
                )}

                {
                    !loading && listings && listings.map((listing) => (
                        <ListingItem key={listing._id} listing={listing} />
                    ))
                }
            </div>
        </div>

    </div>
  )
}

