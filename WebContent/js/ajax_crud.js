	function isNull(str){
        if(str == null || str == undefined || str == "") return true;
    }
	function ajax_post(data_before_transfer_by_ajax){//insert to restdb
    	//console.log("name :"+map["name"]+" tel :"+map["tel"]+" type_index :"+map["type_index"]+"timestamp: "+map["timestamp"]);
    	let data_need__transfer = data_before_transfer_by_ajax;
        if(!isNull(data_need__transfer["data"]["name"])){
        	$.ajax({
    		    type: "POST",
    		    url: "AdrbookServlet",
    		    async: false,
    		    contentType: "application/json", // NOT dataType!
    		    data: JSON.stringify(data_need__transfer),
    		    success: function(response) {
    	            console.log(response);
    		    }
    		});
        }else{
        	alert("姓名欄位不得有空值")
        }

    }
    function ajax_get(){//query  from restdb
    	let result = '';
    	let data = {
    		    action: "getAll"
    		};
    	$.ajax({
		    type: "POST",
		    url: "AdrbookServlet",
		    async: false,
		    contentType: "application/json", // NOT dataType!
		    data: JSON.stringify(data),
		    success: function(response) {
	            result = JSON.parse(response);//json Str trasfer json Obj
	            console.log("result:"+result);
		    }
		});
        return result;
    }
    function ajax_put(map){//update to restdb
    	let data = {action:"update",
    	        data:{xuid:map["_id"]
    	        	,name: map["name"]
                    ,tel:  map["tel"]
                    ,notes:map["notes"]
                    ,type: map["type"]
                    ,type_index: map["type_index"]
                    ,gender: map["gender"]
                 }
                };
    console.log(data);
		$.ajax({
		    type: "POST",
		    url: "AdrbookServlet",
		    async: false,
		    contentType: "application/json", // NOT dataType!
		    data: JSON.stringify(data),
		    success: function(response) {
	            console.log(response);
		    }
		});
    }
    function ajax_delete(objID){//delete to restdb
    	let data = {
    		         action:"delete",
     	             data:{xuid:objID}
                 };
	 	$.ajax({
			    type: "POST",
			    url: "AdrbookServlet",
			    async: false,
			    contentType: "application/json", // NOT dataType!
			    data: JSON.stringify(data),
			    success: function(response) {
		            console.log(response);
			    }
			});
    }

    function data_before_transfer_by_ajax(one_adrbook_data,crud_str){
    	let data ='';
    	if(crud_str=="insert"){
    		data = {action:crud_str,
        	        data:{name: one_adrbook_data["name"].trim()
                        ,tel: one_adrbook_data["tel"]
                        ,notes: one_adrbook_data["notes"]
                        ,type: one_adrbook_data["type"]
                        ,type_index: one_adrbook_data["type_index"]
                        ,gender: one_adrbook_data["gender"]
                     }
                    };
    	}else if (crud_str=="getAll"){
    		data = {
        		    action: crud_str
        		};
    	}
       return data;
    }