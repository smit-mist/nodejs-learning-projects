const notFound = (req,res)=>{
	return res.status(404).send(`Oops!! no endpoint matches ${req.url}`);
}
module.exports = notFound;