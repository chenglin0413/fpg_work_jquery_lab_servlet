function init(){
	/*
    0.儲存動作
    1.將樣板內容input 存起來
    2.將input的元素隱藏，將填入的值放入.text 的元素
    3.將填入的值 經由 集合{鍵值組}儲存
    */
	$(".tbody").on("click",".save-btn",function () {
    	block_ui();
        let tr_dom = get_upstair_parent($(this));//取得按鈕上的tr
        let new_row_flag = false;
        if (tr_dom.find("#timestamp > .text").text().length==0)new_row_flag=true;
        let row_data = save_flow(tr_dom);
        if(new_row_flag){
        	ist(data_pack(row_data,"insert"));
        }
        else{
            upd(data_pack(row_data,"update"));
        }
        load_data(qry(data_pack("","getAll")));
        // 將編輯格式隱藏
        mode_change_event(tr_dom,"read");
        select_all_tr_add_draggble_evnetlistener();
    });
	/*新增動作
    1.新增一個樣板
    2.將新增按鈕隱藏
    */
    $("#add-btn").click(function () {
    	add_flow();
    });


    /*
    0.點選pencil進入編輯模式
    1.將樣板內容 隱藏，將input 顯示
    */
    $(".tbody").on("click",".edit-btn",function () {
    	block_ui();
        let tr_dom = get_upstair_parent($(this));//取得按鈕上的tr
        //將.text 資料塞入 input
        edit_flow(tr_dom);
        //將閱讀格式隱藏，將原text欄位隱藏
        mode_change_event(tr_dom,"edit");
        select_all_tr_add_draggble_evnetlistener();
    });
    /*
    0.點選x-btn 將編輯模式取消，回到顯示模式
    1.將樣板內容 顯示，將input 隱藏
    2.將.text 資料塞回 input,textarea,select
    */
    $(".tbody").on("click",".cancel-btn",function () {
    	block_ui();
    	let tr_dom = get_upstair_parent($(this));//取得按鈕上的tr
    	let timestamp = tr_dom.find($("#timestamp > .text")).text();//取得name 內的值
        if((timestamp!=null && timestamp!="")){//判斷已經儲存過
	        //將閱讀格式隱藏，將原text欄位隱藏
	        mode_change_event(tr_dom,"read");
        }else{//第一次產生的DOM
        	del_flow(tr_dom);
        }
    });
    /*
    0.點選garbage-btn 將編輯模式取消，回到顯示模式
    1.將tr元素移除、清空
    */
    $(".tbody").on("click",".del-btn",function () {
    	block_ui();
    	let tr_dom = get_upstair_parent($(this));//取得按鈕上的tr
    	let name = tr_dom.find("#name .text").text();
    	let check = confirm("Are you sure you want to delete "+name+"from AddressBook?");
        if(check){
        	all_row_data = {};//將資料刷新重新存
        	del_flow(tr_dom);
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
        	let tr_dom = get_upstair_parent(obj).parent();
        	let bol_checked = obj.prop("checked");
            if(bol_checked){
            	let obj_id=$(tr_dom).find("#_id").text();
                del(data_pack(obj_id,"delete"));
                tr_dom.remove();
            }
        });
        all_row_data = {};//將資料刷新重新存
        f5_after_del();
    });
    render();//ready page rendering
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
	if(mode=="read"){
		obj.find(".ed").hide();
		obj.find(".rd").show();
	}else{
		obj.find(".ed").show();
		obj.find(".rd").hide();
	}

}
function render(){
	all_row_data = qry(data_pack("","getAll"));
	sort_num = localStorage.getItem("sort_num");
    if(all_row_data==null)all_row_data={}; // if loc_map is null , then give a  new {}
    let row_size = Object.keys(all_row_data).length;
    if(!row_size==0){
    	load_from_qry(all_row_data,row_size);
    }
    mode_change_event($(".tbody"),"read"); //when first time loading page, close edit mode
    select_all_tr_add_draggble_evnetlistener();
}