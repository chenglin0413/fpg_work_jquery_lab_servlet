function init(){
	/*
    0.儲存動作
    1.將樣板內容input 存起來
    2.將input的元素隱藏，將填入的值放入.text 的元素
    3.將填入的值 經由 集合{鍵值組}儲存
    */
	$(".tbody").on("click",".save-btn",function () {
    	block_ui();
        let obj_div_tr = get_upstair_parent($(this));//取得按鈕上的tr
        let new_row_flag = false;
        if (obj_div_tr.find("#timestamp > .text").text().length==0)new_row_flag=true;
        let map_sing_data = save_process(obj_div_tr);
        if(new_row_flag){
            ajax_post(data_arrange(map_sing_data,"insert"));
        }
        else{
            ajax_put(map_sing_data);
        }
        load_data(ajax_get());
        // 將編輯格式隱藏
        mode_change_event(obj_div_tr,"read");
        select_all_tr_add_draggble_evnetlistener();
    });
	/*新增動作
    1.新增一個樣板
    2.將新增按鈕隱藏
    */
    $("#add-btn").click(function () {
        add_process();
    });


    /*
    0.點選pencil進入編輯模式
    1.將樣板內容 隱藏，將input 顯示
    */
    $(".tbody").on("click",".edit-btn",function () {
    	block_ui();
        let obj_div_tr = get_upstair_parent($(this));//取得按鈕上的tr
        //將.text 資料塞入 input
        edit_process(obj_div_tr);
        //將閱讀格式隱藏，將原text欄位隱藏
        mode_change_event(obj_div_tr,"edit");
        select_all_tr_add_draggble_evnetlistener();
    });
    /*
    0.點選x-btn 將編輯模式取消，回到顯示模式
    1.將樣板內容 顯示，將input 隱藏
    2.將.text 資料塞回 input,textarea,select
    */
    $(".tbody").on("click",".cancel-btn",function () {
    	block_ui();
    	let obj_div_tr = get_upstair_parent($(this));//取得按鈕上的tr
    	let timestamp = obj_div_tr.find($("#timestamp > .text")).text();//取得name 內的值
        if((timestamp!=null && timestamp!="")){//判斷已經儲存過
	        //將閱讀格式隱藏，將原text欄位隱藏
	        mode_change_event(obj_div_tr,"read");
        }else{//第一次產生的DOM
        	console.log("第一次產生被取消");
            del_process(obj_div_tr);
        }
    });
    /*
    0.點選garbage-btn 將編輯模式取消，回到顯示模式
    1.將tr元素移除、清空
    */
    $(".tbody").on("click",".del-btn",function () {
    	block_ui();
    	let obj_div_tr = get_upstair_parent($(this));//取得按鈕上的tr
    	let name = obj_div_tr.find("#name .text").text();
    	let check = confirm("Are you sure you want to delete "+name+"from AddressBook?");
        if(check){
        	all_row_data = {};//將資料刷新重新存
            del_process(obj_div_tr);
        }
        select_all_tr_add_draggble_evnetlistener();
    });
    /*
    0.點選check(select all) selector : checkbox
    */
    $(".checkbox_all").click(function(){
    	let obj_checkbox_all = $(this);
    	let check_flag = obj_checkbox_all.prop("checked");
    	let obj_input_checkbox = $(".tbody  input[type=checkbox]");
        obj_input_checkbox.each(function(idx,val){
        	let obj = $(this);//get each item
            if(check_flag){
                obj.prop("checked",true);
            }else{
                obj.prop("checked",false);
            }
        });
    });
    /*
    0.點選check(single checkbox) selector : checkbox
    */
    $("#del-check-btn").click(function(){
    	block_ui();
    	let obj_input_checkbox = $(".tbody input[type=checkbox]");
        obj_input_checkbox.each(function(idx,val){
        	let obj = $(this);//get each item
        	let obj_div_tr = get_upstair_parent(obj).parent();
        	let bol_checked = obj.prop("checked");
            if(bol_checked){
            	let objID=$(obj_div_tr).find("#_id").text();
                ajax_delete(objID);
                obj_div_tr.remove();
            }
        });
        all_row_data = {};//將資料刷新重新存
        reload_del_process();
    });
    select_all_tr_add_draggble_evnetlistener();
}
function block_ui(){//block ui
	$.blockUI(
	    	{ css:
	    		{
	    	        border: 'none',
		            padding: '15px',
		            backgroundColor: '#000',
		            '-webkit-border-radius': '10px',
		            '-moz-border-radius': '10px',
		            opacity: .5,
		            color: '#fff'
	        	}
	    	}
	);
	setTimeout($.unblockUI, 1000);
}

function mode_change_event(obj,mode){
    $.each(object_show_hide_key,function(key,object){
        $.each(object,function(index,value){
            if((mode=="read" &&key=="1")||(mode=="edit" &&key=="2")){// "1": element like input , select, textarea, save-btn,cancel-btn
                console.log("key: " +key);
                obj.find(value).hide();
            }else{// "2": element like .text , del-btn,edit-btn
                obj.find(value).show();
            }
        });
    });
}