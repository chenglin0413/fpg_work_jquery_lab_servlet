	function add_process(){
        loc_ser_number++;
        let obj_div_tr_temp =  $("#temp > #div-tr-temp");// get dom object
        let html_div_temp = get_outer_html(obj_div_tr_temp);// get html dom
        $(".tbody ").append(html_div_temp);//將樣板塞入
        let tr_size = $(".tbody > .tr").length;//取得 tbody > .tr element 的數量
        $(".tbody .tr #no input").last().attr("disabled",true).val(tr_size);//
        $(".tbody .tr #no .text").last().text(tr_size);
        $(".tbody .tr #gender").last().find("input").prop("name",loc_ser_number);//get new radio-btn
        localStorage.setItem("loc_ser_number",JSON.stringify(loc_ser_number));
        select_all_tr_add_draggble_evnetlistener();
    }
    function edit_process(obj){
    	let no = obj.find($("#no > .text")).text();//取得no 內的值
    	let name = obj.find($("#name > .text")).text();//取得name 內的值
    	let tel = obj.find($("#tel > .text")).text();//取得tel 內的值
    	let notes = obj.find($("#notes > .text")).text();//取得notes textarea的值
    	let gender = obj.find("#gender > .text").text();
        obj.find("#no > input").val(no);
	    obj.find("#name > input").val(name);
	    obj.find("#tel > input").val(tel);
	    obj.find("select")[0].selectedIndex=obj.find(".selectIndex").text();
	    obj.find("#notes > textarea").val(notes);
        obj.find("input[type=radio][value="+gender+"]").prop("checked",true);
    }

    function save_process(obj){
    	let map_sing_data = {};
    	let object_val = get_tr_property(obj,"save");
        // set_map_sing_data_text(obj,object_val);
    	return set_sing_data_to_map_from_obj(object_val,map_sing_data);
    }
    function del_process(obj_old){
    	let objID=$(obj_old).find("#_id").text();
        ajax_delete(objID);
        obj_old.remove();//將tr元素移除、清空
        reload_del_process();
    }
    function reload_del_process(){
    	let obj_tbody_tr = $(".tbody > .tr");//重新取得現有的element_tr
        obj_tbody_tr.each(function(index,value){//將序號逐筆更新,把資料存入map_multi_dat
        	let num = parseInt(index)+1;
			$(this).find("#no > .text").text(num);
			$(this).find("#no > input").val(num);
        });
        load_data(ajax_get());
    }


