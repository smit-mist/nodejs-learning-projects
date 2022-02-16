const Product = require('../models/product');

const getAllProductStatic = async (req, res) => {
    return res.status(200).json({ msg: "All product static" });
}

const getAllProduct = async (req, res) => {
    const { featured, company, name, sort, fields, page, limit, numericFilter } = req.query;
    const queryObject = {};
    if (featured) {
        queryObject.featured = (featured === 'true') ? true : false;
    }
    if (company) {
        queryObject.company = company;
    }
    if (name) {
        queryObject.name = { $regex: name, $options: 'i' };
    }
    let result = Product.find(queryObject);
    if (sort) {
        const sortList = sort.split(',').join(' ');
        result = result.sort(sortList);
    }
    if (fields) {
        const fList = fields.split(',').join(' ');
        result = result.select(fList);
    }
    if (numericFilter) {
        const operatorMap = {
            '>': '$gt',
            '>=': '$gte',
            '<': '$lt',
            '<=': '$lte',
            '=': '$eq',

        };
        const reqEx = /\b(<|>|<=|>=|=)\b/g;
        let filters = numericFilter.replace(reqEx,(match)=>{
        	return `-${operatorMap[match]}-`;
        });
        const canEdit = ['price','rating'];
        filters.split(',').forEach((item)=>{
        	const [type,ops,val] = item.split('-');
        	if(canEdit.includes(type)){
        		queryObject[type] = {[ops]:Number(val)};
        	}
        });
        console.log(queryObject);
    }
    const pageN = Number(req.query.page) || 1;
    const limitL = Number(req.query.limit) || 10;
    const skip = limitL * (pageN - 1);
    result = result.skip(skip).limit(limitL);
    const product = await result;
    return res.status(200).json({ nbHits: product.length, product: product });

}

module.exports = { getAllProduct, getAllProductStatic };