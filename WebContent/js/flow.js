	function add_flow(){
		sort_num++;
        let obj_div_tr_temp =  $("#temp > #div-tr-temp");// get dom object
        let html_div_temp = get_outer_html(obj_div_tr_temp);// get html dom
        $(".tbody ").append(html_div_temp);//將樣板塞入
        let tr_len = $(".tbody > .tr").length;//取得 tbody > .tr element 的數量
        $(".tbody .tr #no input").last().attr("disabled",true).val(tr_len);//
        $(".tbody .tr #no .text").last().text(tr_len);
        $(".tbody .tr #gender").last().find("input").prop("name",sort_num);//get new radio-btn
        localStorage.setItem("sort_num",JSON.stringify(sort_num));
        select_all_tr_add_draggble_evnetlistener();
    }
    function edit_flow(obj){
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

    function save_flow(obj){
    	let row_data = {};
    	let object_val = attr_manager(obj,"save");
    	return dom_2_row_data(object_val,row_data);
    }
    function del_flow(obj_old){
    	let obj_id=$(obj_old).find("#_id").text();
        del(data_pack(obj_id,"delete"));
        obj_old.remove();//將tr元素移除、清空
        f5_after_del();
    }
    function f5_after_del(){
    	let obj_tbody_tr = $(".tbody > .tr");//重新取得現有的element_tr
        obj_tbody_tr.each(function(index,value){//將序號逐筆更新,把資料存入map_multi_dat
        	let num = parseInt(index)+1;
			$(this).find("#no > .text").text(num);
			$(this).find("#no > input").val(num);
        });
        load_data(qry(data_pack("","getAll")));
    }



