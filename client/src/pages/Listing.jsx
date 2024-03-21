import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
import { FaCoffee, FaUtensils, FaPizzaSlice, FaCookieBite } from 'react-icons/fa';
import './Listing.css'; 

SwiperCore.use([Navigation]);

export default function Listing() {
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const params = useParams();

    useEffect(() => {
        const fetchListing = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/api/listing/get/${params.listingId}`);
                const data = await res.json();
                if (data.success === false) {
                    setError(true);
                    setLoading(false);
                    return;
                }
                setListing(data);
                setLoading(false);
                setError(false);
            } catch (error) {
                setError(true);
                setLoading(false);
            }
        };
        fetchListing();
    }, [params.listingId]);

    return (
        <main className="bg-gray-100 py-8">
            
            {loading && <p className='text-center my-7 text-2xl'>Loading...</p>}
            {error && <p className='text-center my-7 text-2xl'>Something went wrong!</p>}
            {listing && !loading && !error && (
                <>
                    <h1 className="text-center text-3xl font-semibold my-7 mx-5 text-blue-700">{listing.name}</h1>
                    <div className="flex flex-col md:flex-row">
                        <div className="w-full md:w-1/2 px-5">
                        <Swiper navigation
                            speed={500} // Adjust the speed (in milliseconds) for smoother transition
                            slidesPerView={1}
                            spaceBetween={30}
                        >
                        {listing.imageUrls.map((url) => (
                            <SwiperSlide key={url}>
                                <div className='h-[500px] mt-5' style={{ background: `url(${url}) center no-repeat`, borderRadius: '8px'}}></div>
                            </SwiperSlide>
                        ))}
                        </Swiper>
                        </div>
                        <div className="w-full md:w-1/2 px-5 mt-5 items-center">
                            {listing.ingredients && (
                                <div className="overflow-y-auto bg-white rounded-lg p-4 shadow-md ">
                                    <h2 className="text-2xl my-7 font-semibold text-green-700  top-0 ">Ingredients:</h2>
                                    <div className="ingredients-container">
                                        <table className="w-full">
                                            <tbody>
                                                {listing.ingredients.split('\n').map((ingredient, index) => (
                                                    <tr key={index}>
                                                        <td className="border border-gray-300 px-4 py-2">{ingredient}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>           
                    <p className="my-3 mt-5 flex items-center justify-center">
                        {listing.breakfast && (
                            <span className="flex flex-col items-center mr-5">
                                <FaCoffee className="text-orange-700 text-3xl icon" />
                                <span className="text-blue-700">Breakfast</span>
                            </span>
                        )}
                        {listing.lunch && (
                            <span className="flex flex-col items-center mr-5">
                                <FaUtensils className="text-orange-700 text-3xl icon" />
                                <span className="text-blue-700">Lunch</span>
                            </span>
                        )}
                        {listing.snack && (
                            <span className="flex flex-col items-center mr-5">
                                <FaCookieBite className="text-orange-700 text-3xl icon" />
                                <span className="text-blue-700">Snacks</span>
                            </span>
                        )}
                        {listing.dinner && (
                            <span className="flex flex-col items-center mr-5">
                                <FaPizzaSlice className="text-orange-700 text-3xl icon" />
                                <span className="text-blue-700">Dinner</span>
                            </span>
                        )}
                    </p>

                    <div className="mx-5">
                        {listing.description && (
                            <div className="bg-white rounded-lg p-4 shadow-md">
                                <h2 className="text-2xl my-7 font-semibold text-blue-700">Description:</h2>
                                <p className="text-gray-700" style={{ whiteSpace: 'pre-line' }}>{listing.description}</p>
                            </div>
                        )}
                    
                    </div>
                </>
            )}
        </main>
    );
}
