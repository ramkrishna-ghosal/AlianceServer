const MainControllers = {},
    _ = require('lodash'),
    moment = require('moment'),
    commonFunction = require('../../../core/commonFunctions'),
    auth = require('../../../routes/middlewares/auth'),
    Models = require('../../../db/models/Relational/index');


MainControllers.fetchCollegeData = async (req, res, next) => {

    try {
        let result = await Models.collegeSchema.findAll({ raw: true })

        let college_Name = [], college_state = []

        result.map((ele) => {
            college_Name.push(ele.College_Name)
            college_state.push(ele.College_state)
        })

        college_Name = _.uniq(college_Name)
        college_state = _.uniq(college_state)

        let Obj = {
            college_Name: college_Name,
            college_state: college_state
        }

        return res.send({
            responseCode: 200,
            responseData: Obj,
            responseText: 'Fetch College Data'
        })

    } catch (e) {
        return res.send({
            responseCode: 500,
            responseText: e
        })
    }
}

MainControllers.addCollegeData = async (req, res, next) => {
    if (_.isNil(req.body.Collge_Name)) {
        return res.send({
            responseCode: 404,
            responseText: 'College name is required'
        })
    }

    if (_.isNil(req.body.College_addr)) {
        return res.send({
            responseCode: 404,
            responseText: 'College address is required'
        })
    }

    if (_.isNil(req.body.College_state)) {
        return res.send({
            responseCode: 404,
            responseText: 'College state is required'
        })
    }


    try {
        let College_ID = await commonFunction.createCollegeID(req.body.Collge_Name, req.body.College_state)


        let result = await Models.collegeSchema.create({
            College_ID: College_ID,
            College_Name: req.body.Collge_Name,
            College_addr: req.body.College_addr,
            College_state: req.body.College_state
        })

        if (!_.isEmpty(result)) {
            return res.send({
                responseCode: 200,
                responseText: 'Information added to DB'
            })
        }

    } catch (e) {
        return res.send({
            responseCode: 500,
            responseText: e
        })
    }
}


module.exports = MainControllers