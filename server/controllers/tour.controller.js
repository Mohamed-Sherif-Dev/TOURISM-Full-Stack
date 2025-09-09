const Tour = require("../models/Tour.model");

const getTours = async (req, res) => {
  try {
    // 1) Parse + sanitize
    const page  = Math.max(1, parseInt(req.query.page ?? 1, 10));
    const limit = Math.max(1, parseInt(req.query.limit ?? 12, 10));
    const skip  = (page - 1) * limit;

    const search     = (req.query.search ?? "").trim();
    const difficulty = (req.query.difficulty ?? "").trim().toLowerCase();
    const maxPrice   = req.query.maxPrice   !== undefined ? Number(req.query.maxPrice)   : undefined;
    const minRating  = req.query.minRating  !== undefined ? Number(req.query.minRating)  : undefined;
    const month      = req.query.month      !== undefined ? Number(req.query.month)      : undefined;

    const defaultFields = [
      "name",
      "imageCover",
      "summary",
      "price",
      "duration",
      "difficulty",
      "ratingsAverage",
      "ratingsQuantity",
      "startLocation",
      "startDates",
      "locations",
      "maxGroupSize",
      "createdAt",
    ];

    const extraFields = (req.query.fields ?? "")
      .split(",")
      .map(s => s.trim())
      .filter(Boolean);
    const fields = Array.from(new Set([...defaultFields, ...extraFields])).join(" ");

    // 2) Build filter
    const andClauses = [];
    const orClauses  = [];

    if (search) {
      orClauses.push(
        { name:    { $regex: search, $options: "i" } },
        { summary: { $regex: search, $options: "i" } },
      );
    }
    if (orClauses.length) andClauses.push({ $or: orClauses });

    if (difficulty) andClauses.push({ difficulty });

    if (!Number.isNaN(maxPrice) && maxPrice !== undefined) {
      andClauses.push({ price: { $lte: maxPrice } });
    }
    if (!Number.isNaN(minRating) && minRating !== undefined) {
      andClauses.push({ ratingsAverage: { $gte: minRating } });
    }

    if (!Number.isNaN(month) && month >= 1 && month <= 12) {
      andClauses.push({
        $expr: {
          $in: [
            month,
            { $map: { input: "$startDates", as: "d", in: { $month: "$$d" } } },
          ],
        },
      });
    }

    const filter = andClauses.length ? { $and: andClauses } : {};

    // 3) Sort
    const sortKey = String(req.query.sort ?? "newest");
    const sortMap = {
      newest: "-createdAt",
      "price-low": "price",
      "price-high": "-price",
      "rating-high": "-ratingsAverage",
    };
    const sortBy = sortMap[sortKey] || sortKey;

    // 4) Query
    const [items, total] = await Promise.all([
      Tour.find(filter).select(fields).sort(sortBy).skip(skip).limit(limit).lean(),
      Tour.countDocuments(filter),
    ]);

    // 5) Response
    res.json({
      success: true,
      results: items.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: items,
    });
  } catch (e) {
    console.error("getTours error:", e);
    res.status(500).json({ success: false, message: e.message });
  }
};
const getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    if (!tour)
      return res
        .status(404)
        .json({ success: false, message: "Tour not found" });
    res.json({ success: true, tour });
  } catch (e) {
    res.status(400).json({ success: false, message: e.message });
  }
};

const createTour = async (req, res) => {
  try {
    const tour = await Tour.create(req.body);
    res.status(201).json({ success: true, tour });
  } catch (e) {
    res.status(400).json({ success: false, message: e.message });
  }
};

const updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!tour)
      return res
        .status(404)
        .json({ success: false, message: "Tour not found" });
    res.json({ success: true, tour });
  } catch (e) {
    res.status(400).json({ success: false, message: e.message });
  }
};

const deleteTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndDelete(req.params.id);
    if (!tour)
      return res
        .status(404)
        .json({ success: false, message: "Tour not found" });
    res.json({ success: true, message: "Tour deleted" });
  } catch (e) {
    res.status(400).json({ success: false, message: e.message });
  }
};

module.exports = { getTours, getTour, createTour, updateTour, deleteTour };
