import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";

export const createListing = async (req, res, next) => {
    try {
        const listing = await Listing.create(req.body);
        return res.status(201).json(listing);
    } catch (error) {
        next(error)
    }
};

export const deleteListing = async (req, res, next) => {
    const listing = await Listing.findById(req.params.id);

    if(!listing){
        return next(errorHandler(404, 'Listing Not Found'));
    }

    if(req.user.id !== listing.userRef.toString()) {
        return next(errorHandler(401, 'You can only delete your own listings!'));
    }

    try {
        await Listing.findByIdAndDelete(req.params.id);
        res.status(200).json('Listing has been deleted!');
    } catch (error) {
        next(error);
    }
}

// ----- Update Listing -------

export const updateListing = async (req, res, next) => {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
        return next(errorHandler(404, 'Listing Not Found'));
    }

    if (req.user.id !== listing.userRef) {
        return next(errorHandler(401, 'You can only edit your own listings!'));
    }

    try {
        const updatedListing = await Listing.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).json(updatedListing);
    } catch (error) {
        next(error);
    }
};


export const getListing = async (req, res, next) => {
    try {
        const listing = await Listing.findById(req.params.id);

        if (!listing) {
            return next(errorHandler(404, 'Listing Not Found'));
        }
        res.status(200).json(listing);
    } catch (error) {
        next(error);
    }
}

// -------- Search ------------ 

export const getListings = async (req, res, next) => {

    try {
        const { searchTerm, breakfast, lunch, snack, dinner } = req.query;
        const limit = parseInt(req.query.limit) || 9;
        const startIndex = parseInt(req.query.startIndex) || 0;
        const sort = req.query.sort || 'createdAt';
        const order = req.query.order || 'desc';

        // Construct the search query based on the received parameters
        const query = {};

        if (searchTerm) {
            query.$or = [
                { name: { $regex: searchTerm, $options: 'i' } },
                { description: { $regex: searchTerm, $options: 'i' } },
                { ingredients: { $regex: searchTerm, $options: 'i' } }
            ];
        }

        if (breakfast === 'true' || breakfast === 'false') {
            query.breakfast = breakfast === 'true';
        }

        if (lunch === 'true' || lunch === 'false') {
            query.lunch = lunch === 'true';
        }

        if (snack === 'true' || snack === 'false') {
            query.snack = snack === 'true';
        }

        if (dinner === 'true' || dinner === 'false') {
            query.dinner = dinner === 'true';
        }

        // Execute the search query
        const searchResults = await Listing.find(query)
            .sort({ [sort]: order })
            .limit(limit)
            .skip(startIndex);

        res.status(200).json(searchResults);
    } catch (error) {
        next(error);
    }
};