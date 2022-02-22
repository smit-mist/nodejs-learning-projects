
const login = (req,res)=>{
	res.send("This is Login");
};

const dashboard = (req,res)=>{
	const lucky = Math.floor(Math.random()*1000);
	res.status(200).json({msg:'Hello, User',secret:`Your lucky number is ${lucky}`});
}

module.exports = {
	login,dashboard
};