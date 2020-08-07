    function dom_2_row_data(val_dom,row_data){
        $.each(val_dom,function(key,value){
        	row_data[key]=value;
            console.log("323key: "+key+"value:"+value);
        });
        return row_data;
    }
    function set_row_data_2_dom(obj,map){
        let object_val = map;
        // 將資料存入並轉成顯示模式
        $.each(object_val,function(key,value){
            if(key.indexOf("type_index")<0){
                console.log("key :"+key+"value :"+value);
                setText(obj.find("#"+key+" > .text"),value);
            }
        });
        setText(obj.find("#type > .selectIndex"),object_val["type_index"]);
    }
    function load_from_qry(map,size){
       for(let i=0;i<size;i++){
    	   add_flow();
        }
        load_data(map);

    }
    function load_data(all_row_data){
        let tbody_tr_dom = $(".tbody > .tr");
        tbody_tr_dom.each(function(index){
            var tr_dom = $(this);
            var key = parseInt(index);
            console.log("key :"+key);
            var row_data = all_row_data[key];
            var object_val = attr_manager(row_data,"reload");
            set_row_data_2_dom(tr_dom,object_val);
        });
    }
    function setText(obj,str){
   	 obj.text(str);
   }