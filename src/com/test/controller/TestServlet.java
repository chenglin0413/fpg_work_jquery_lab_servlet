package com.test.controller;

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



@WebServlet("/testServlet/*")
public class TestServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

    /**
     * @see HttpServlet#HttpServlet()
     */
    public TestServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		Map dataMap = new Gson().fromJson(request.getReader(), Map.class);
		String action = dataMap.get("action").toString();

        if("getlist".equals(action)){
        	List<AdrbookVO> adrbooks = AdrbookService.list();
    	    String json = new Gson().toJson(adrbooks);
//    	    response.setContentType("application/json");
    	    response.setContentType("text/plain");
    	    response.setCharacterEncoding("UTF-8");
    	    response.getWriter().write(json);
        }
        if("print".equals(action)){

        	System.out.println(dataMap.get("bar"));
        	System.out.println(dataMap.get("baz"));
        	System.out.println(dataMap.get("foo"));
        }
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request,response);
	}

}
