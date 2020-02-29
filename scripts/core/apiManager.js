function ApiManager(){	
	this.call = async function(url = "", {method = "GET", urlParams = false, bodyParams = false} = {}){
		//urlParams contains url query (?)
		//bodyParams contains the body content wich will be urlencoded

		//header of request
		var requestHeaders = new Headers({
			"Content-Type": "application/x-www-form-urlencoded"
		});
		var requestInit = { 
			method: method,
			headers: requestHeaders,
		};
		//body of request
		if(bodyParams){
			var requestBody = Utils.encodeQuery(bodyParams);
			requestInit.body = requestBody;
		}
		//url params
		var requestUrlParams = "";
		if(urlParams){
			requestUrlParams = "?" + Utils.encodeQuery(urlParams);
		}
		//base path
		var basePath = "";
		if(!config.apiLocation){
			console.warn("No api path defined in config.js");
		}
		basePath = config.apiLocation;
		//call api
		var apiResponse = await fetch(`${basePath}/${url}${requestUrlParams}`, requestInit);
		//if http error
		if(!apiResponse.ok){
			console.warn("api error : ", apiResponse.status);
			return {ok:false, error:apiResponse.status}
		}
		try{
			var jsonResponse = await apiResponse.json();
		}catch(e){
			console.warn("json couldn't be parsed, error:", e)
			return {ok:false, error:e};
		}
		//if no http error
		return {ok:true, data:jsonResponse};
    };

	this.getData = async function(url){
		var res = await callApi(url, "GET");
		return res.ok ? res.data : [];//return only if data
	}

	this.updateData = async function(url, data){
		var res = await callApi(url, "PUT", data);
		return res.ok ? res.data : [];//return only if data
	}

	this.createData = async function(url, data){
		var res = await callApi(url, "POST", data);
		return res.ok ? res.data : [];//return only if data
	}

	this.deleteData = async function(url){
		var res = await callApi(url, "DELETE");
		return res.ok ? res.data : [];//return only if data
	}

	function callApi(url, method, data = false){
		var options = {
			method: method,
			bodyParams: data
		}
		return apiManager.call(url, options);
	}
}