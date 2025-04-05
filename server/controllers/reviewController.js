const Review = require("../models/Review");

exports.getReviewsByProduct = async (req, res) => {
    try {
      const reviews = await Review.find({ product: req.params.productId })
        .populate("user", "name email") // تأكدي إن الـ populate بيجيب الـ name
        .populate("product", "name");
      console.log("Reviews fetched:", reviews); // Debug log
      res.json(reviews);
    } catch (error) {
      console.error("Get reviews by product error:", error);
      res.status(500).json({ error: "خطأ في جلب المراجعات" });
    }
  };

exports.createReview = async (req, res) => {
  try {
    const { product, rating, comment } = req.body;
    const user = req.user.id; // من الـ middleware

    if (!product || !rating) {
      return res.status(400).json({ error: "المنتج والتقييم مطلوبان" });
    }

    const review = new Review({
      user,
      product,
      rating,
      comment,
    });
    const newReview = await review.save();
    res.status(201).json(newReview);
  } catch (error) {
    console.error("Create review error:", error);
    res.status(400).json({ error: "خطأ في إضافة المراجعة" });
  }
};

exports.updateReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ error: "المراجعة غير موجودة" });
    }

    if (review.user.toString() !== req.user.id) {
      return res.status(403).json({ error: "غير مصرح لك بتعديل هذه المراجعة" });
    }

    review.rating = req.body.rating || review.rating;
    review.comment = req.body.comment || review.comment;
    const updatedReview = await review.save();
    res.json(updatedReview);
  } catch (error) {
    console.error("Update review error:", error);
    res.status(400).json({ error: "خطأ في تعديل المراجعة" });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ error: "المراجعة غير موجودة" });
    }

    if (review.user.toString() !== req.user.id) {
      return res.status(403).json({ error: "غير مصرح لك بحذف هذه المراجعة" });
    }

    await review.deleteOne();
    res.json({ message: "تم حذف المراجعة" });
  } catch (error) {
    console.error("Delete review error:", error);
    res.status(500).json({ error: "خطأ في حذف المراجعة" });
  }
};


exports.getReviews = async (req, res) => {
    try {
      res.set('Cache-Control', 'no-store');
  
      const reviews = await Review.find()
        .populate('product', 'name') // populate للـ product بس
        .populate('user', 'name email');
  
      // تحقق إضافي
      console.log('Raw reviews after populate:', reviews);
  
      // فلترة الـ reviews اللي عندها product صالح
      const filteredReviews = reviews.filter(review => review.product !== null);
  
      console.log('Filtered reviews:', filteredReviews);
      res.json(filteredReviews);
    } catch (error) {
      console.error('Get reviews error:', error);
      res.status(500).json({ error: 'خطأ في جلب قائمة التقييمات' });
    }
  };