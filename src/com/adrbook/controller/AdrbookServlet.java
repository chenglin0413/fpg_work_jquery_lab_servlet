package com.adrbook.controller;

import java.io.IOException;
import java.sql.Array;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.adrbook.model.AdrbookService;
import com.adrbook.model.AdrbookVO;
import com.google.gson.Gson;
import com.google.gson.JsonObject;



@WebServlet("/AdrbookServlet/*")
public class AdrbookServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

    /**
     * @see HttpServlet#HttpServlet()
     */
    public AdrbookServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.setCharacterEncoding("UTF-8"); // 解決中文字轉入問題
		String brow_ver = request.getHeader("User-agent");//取得廠商版本號、類型
		String ip = request.getRemoteAddr();//取得廠商的ip地址
		System.out.println("brow_ver:"+brow_ver);
		System.out.println("ip:"+ip);
		Map dataMap = new Gson().fromJson(request.getReader(), Map.class);//將頁面json字串轉成物件
		String action = dataMap.get("action").toString(); // 動作邏輯判斷 : action
		AdrbookService abk_service = new AdrbookService();
        if("getAll".equals(action)){//全部搜尋

        	List<AdrbookVO> adrbooks = abk_service.list();
    	    String json = new Gson().toJson(adrbooks);
//    	    response.setContentType("application/json");
    	    response.setContentType("text/plain");
    	    response.setCharacterEncoding("UTF-8");
    	    response.getWriter().write(json);
        }
        if("insert".equals(action)){// 新增一筆
        	Map insert_data =  (Map) dataMap.get("data");
        	String name = insert_data.get("name").toString();
        	String tel = insert_data.get("tel").toString();
        	String notes = insert_data.get("notes").toString();
        	String type = insert_data.get("type").toString();
        	Integer type_index = Integer.parseInt(insert_data.get("type_index").toString());
        	String gender = insert_data.get("gender").toString();
        	AdrbookVO adrbooks = abk_service.addABKVO(name, tel, gender, type, type_index, notes,ip,brow_ver);
        	System.out.println("insert__complete");
        	System.out.println(insert_data);
        }
        if("update".equals(action)){// 更新一筆
        	Map update_data =  (Map) dataMap.get("data");
        	String name = update_data.get("name").toString();
        	String tel = update_data.get("tel").toString();
        	String notes = update_data.get("notes").toString();
        	String type = update_data.get("type").toString();
        	Integer type_index = Integer.parseInt(update_data.get("type_index").toString());
        	String gender = update_data.get("gender").toString();
        	String xuid = update_data.get("xuid").toString();
        	abk_service.updateABKVO(name, tel, gender, type, type_index, notes, ip, brow_ver,xuid);
        	System.out.println("update__complete");
        	System.out.println(update_data);
        }
        if("delete".equals(action)){// 刪除一筆
        	Map delete_data =  (Map) dataMap.get("data");
        	String xuid = delete_data.get("xuid").toString();
        	abk_service.deleteABKVO(xuid);
        	System.out.println("del_complete,xuid : "+xuid);
        }
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request,response);
	}

}
