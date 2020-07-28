 	function ajax_post(map){//insert to restdb
    	//console.log("name :"+map["name"]+" tel :"+map["tel"]+" type_index :"+map["type_index"]+"timestamp: "+map["timestamp"]);
    	let data = {action:"insert",
        	        data:{name: map["name"].trim()
                        ,tel: map["tel"]
                        ,notes: map["notes"]
                        ,type: map["type"]
                        ,type_index: map["type_index"]
                        ,gender: map["gender"]
                        ,timestamp: new Date(map["timestamp"]).toUTCString()
                     }
                    };
    	console.log(map["name"]);
        if(!isNull(map["name"].trim())){
        	$.ajax({
    		    type: "POST",
    		    url: "AdrbookServlet",
    		    async: true,
    		    contentType: "application/json", // NOT dataType!
    		    data: JSON.stringify(data),
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
		    async: true,
		    contentType: "application/json", // NOT dataType!
		    data: JSON.stringify(data),
		    success: function(response) {
	            result = JSON.parse(response);//json自串 轉成 json物件
	            //console.log(result);
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
		    async: true,
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
			    async: true,
			    contentType: "application/json", // NOT dataType!
			    data: JSON.stringify(data),
			    success: function(response) {
		            console.log(response);
			    }
			});
    }