'use strict';
var debug 	= require('debug')('collect')
module.exports = class CollectClass {

	constructor(req,fields){
		this.body = [];
		this.query = [];
		this.params = [];
		this.mandatoryFields = {};
		if(req && typeof req == 'object'){
			if(Object.keys(req.body).length && req.body.constructor===Object) this.setBody(fields)
	        if(Object.keys(req.query).length && req.query.constructor === Object) this.setQuery(fields)
	        if(Object.keys(req.params).length && req.params.constructor===Object) this.setParams(fields)
		}
	}

	setBody(body){
		this.body = body;
	}

	setQuery(query){
		this.query = query;
	}

	setParams(params){
		this.params = params;
	}

	setMandatoryFields(mandatoryFields){
		this.mandatoryFields = mandatoryFields;
	}

	collect(req,res){
		var data = {};
		this.body.forEach(function(body){
			if(typeof req.body[body] !== 'undefined'){
				data[body] = req.body[body];
			}
		});
		this.query.forEach(function(query){
			if(typeof req.query[query] !== 'undefined'){
				data[query] = req.query[query];
			}
		});
		this.params.forEach(function(params){
			if(typeof req.params[params] !== 'undefined'){
				data[params] = req.params[params];
			}
		});

		return data;
	}
	checkMandatoryFields(data,res){
		debug(this.mandatoryFields)
			let mandatoryFieldsCheck = []
			this.mandatoryFields.forEach((item)=>{
				if(!data.hasOwnProperty(item)){
					mandatoryFieldsCheck.push(item)
				}
			})
			if(mandatoryFieldsCheck && mandatoryFieldsCheck.length){
				return res.status(422).send({err_msg:"required params are missing",mandatoryFieldsCheck:mandatoryFieldsCheck})
			}
	}


}
