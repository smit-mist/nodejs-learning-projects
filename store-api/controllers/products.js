const getAllProductStatic = async (req,res)=>{
	return res.status(200).json({msg:"All product static"});
}

const getAllProduct = async (req,res)=>{
	return res.status(200).json({msg:"All product"});

}

module.exports = {getAllProduct,getAllProductStatic};