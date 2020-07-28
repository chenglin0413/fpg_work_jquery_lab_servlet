    function set_sing_data_to_map_from_obj(object,map){
        $.each(object,function(key,value){
            map[key]=value;
            console.log("323key: "+key+"value:"+value);
        });
        return map;
    }
    function set_map_sing_data_text(obj,map){
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
    function load_data_from_loc_storage(map_data,map_size){
        console.log('map_data :'+map_data);
       for(let i=0;i<map_size;i++){
            add_process();
        }
        load_data(map_data);
        // var obj_tbody_tr_all = $(".tbody > .tr");
        // obj_tbody_tr_all.each(function(index){
        //     var obj_tr = $(this);
        //     var key = parseInt(index);
        //     console.log("key :"+key);
        //     var map_sing_data = map_data[key];
        //     var object_val = get_tr_property(map_sing_data,"reload");
        //     set_map_sing_data_text(obj_tr,object_val);
        // });
    }
    function load_data(map_data){
        let obj_tbody_tr_all = $(".tbody > .tr");
        obj_tbody_tr_all.each(function(index){
            var obj_tr = $(this);
            var key = parseInt(index);
            console.log("key :"+key);
            var map_sing_data = map_data[key];
            var object_val = get_tr_property(map_sing_data,"reload");
            set_map_sing_data_text(obj_tr,object_val);
        });
    }
    function setText(obj,str){
   	 obj.text(str);
   }