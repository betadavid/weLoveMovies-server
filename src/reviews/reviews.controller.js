const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const mapProperties = require("../utils/map-properties");

async function reviewExists(req, res, next){
    const {reviewId} = req.params;
    const review = await service.read(reviewId);
    if(review){
        res.locals.review = review;
        return next();
    }
    next({status: 404, message: `Review cannot be found: ${reviewId}`});
}

const VALID_PROPERTIES = [
    "content",
    "score"
];
  
function hasOnlyValidProperties (req, res, next){
    const { data } = req.body;
    const invalidFields = Object.keys(data).filter((field) => !VALID_PROPERTIES.includes(field));
    
    if(invalidFields.length){
        next({
            status: 400,
            message: `Invalid field(s): ${invalidFields.join(", ")}`,
        });
    }
    next();
}

async function update(req, res, next){
    
    const updatedReview = {
        ...res.locals.review,
        ...req.body.data,
        review_id: res.locals.review.review_id
    };
    
    const data = await service.update(updatedReview);
    const criticData = await service.readCritic(res.locals.review.critic_id);
    updatedReview["critic"] = criticData;
    res.status(201).json({data: updatedReview});
}

const mapCritic = mapProperties({
    critic_id: "critic.critic_id",
    preferred_name: "critic.preferred_name",
    surname: "critic.surname",
    organization_name: "critic.organization_name"
});

async function list(req, res, next){
    const { movieId } = req.params;
    const response = await service.listByMovieId(movieId);
    const data = response.map(review => mapCritic(review));
    res.json({data});
}

async function destroy(req, res, next){
    await service.delete(res.locals.review.review_id);
    res.sendStatus(204);
}


module.exports = {
    update: [asyncErrorBoundary(reviewExists), hasOnlyValidProperties, asyncErrorBoundary(update)],
    list: [asyncErrorBoundary(list)],
    delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)]
};