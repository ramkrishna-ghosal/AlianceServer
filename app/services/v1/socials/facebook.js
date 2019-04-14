const FacebookControllers = {},
    _ = require('lodash'),
    fp = require('lodash/functions'),
    Models = require('../../../db/models/Relational/index');


FacebookControllers.getAuth = async (req,res,next) => {

	try{

		let Admin=await Models.AdminSchema.findOne({
			where:{
				username:req.body.name
			}
		})

		if(!_.isEmpty(Admin)){
			let result=Models.facebookSocialSchema.create({
				FacebookID:req.body.id,
				name:req.body.name,
				email:req.body.email || 'Not added',
				provider:req.body.provider,
				token:req.body.token,
				ProfilePicture:req.body.image
			})

			if(result){
				return res.send({
					responseCode:200,
					responseText:'Successfully logged in'
				})
			}
		}
	}catch(e){
		return res.send({
			responseCode:500,
			responseData:e,
			responseText:'Internal error occured'
		})
	}

}

module.exports = FacebookControllers