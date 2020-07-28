	function getTrObjFromBtn(obj){
    	 return obj.parent().parent();
    }
    function get_date_str(){
        let d = new Date();// 取得現在時間
        let date_str = d.getFullYear() + "-" +  ("0"+(d.getMonth()+1)).slice(-2) + "-" +
        ("0" + d.getDate()).slice(-2) +  " "
        + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2)+ ":" +
        ("0" + d.getSeconds()).slice(-2) ;
        return date_str;
    }
    function get_outer_html(obj){//取得dom元素
    	return obj.prop("outerHTML");
    }
    function get_tr_property(obj,mode){
    	let object_val ={};
    	let _id,name,tel,notes,type_obj,type,type_index,gender,timestamp="";
        if(mode==="save"){
            _id = obj.find("#_id > .text").text();
            name = obj.find($("#name > input")).val();//取得name 內的值
            tel = obj.find($("#tel > input")).val();
            notes = obj.find($("#notes > textarea")).val();//取得notes textarea的值
            type_obj = obj.find("#type");//取得type obj
            type =type_obj.find($("select > option:selected")).val();
            type_index = type_obj.find($("select"))[0].selectedIndex;//取得type  option 的索引
            gender = obj.find($("#gender > input:checked")).val();//取得option btn 的值
            timestamp = get_date_str();
        }else if(mode==="reload"){
            _id = obj["xuid"]; //oracle DB
            name = obj["name"];//取得物件內 name 內的值
            tel = obj["tel"];
            notes = obj["notes"];//取得物件內 notes textarea的值
            type = obj["type"];
            type_index = obj["type_index"];//取得物件內 type  option 的索引
            gender = obj["gender"];//取得物件內 option btn 的值
            timestamp = new Date(obj["timestamp"]).toLocaleString();
        }
        console.log("notict"+name+tel+notes+type_index+_id);
        object_val = {"_id":_id,"name":name,"tel":tel,"notes":notes,"type":type,"type_index":type_index.toString(),"gender":gender,"timestamp":timestamp}
        //object_val = {"_id":_id,"name":name,"tel":tel,"notes":notes,"type":type,"type_index":type_index.toString(),"gender":gender,"timestamp":timestamp}
        return object_val;
    }
    function getID(str){
    	let id = $(str).prop("id");
    	return id;
    }