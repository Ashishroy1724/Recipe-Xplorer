import { Link } from "react-router-dom";

export default function ListingItem({ listing }) {
  return (
    <div className="bg-slate-100 shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-2xl w-full sm:w-[400px] md:w-[380px]">
      <Link to={`/listing/${listing._id}`}>
        <img
          src={listing.imageUrls[0]}
          alt="listing-cover"
          className="h-[300px] sm:h-[260px] w-96 object-cover hover:scale-105 transition-scale duration-300 rounded-t-2xl"
          // Adjust the height value (h-[360px]) as needed
        />
        <div className="p-3 flex flex-col gap-7 w-full">
          <p className="truncate text-lg font-semibold text-slate-700">{listing.name}</p>
        </div>
        <div className="p-3">
          <p className="text-sm text-gray-600 line-clamp-3">{listing.description}</p>
        </div>
      </Link>
    </div>
  );
}
