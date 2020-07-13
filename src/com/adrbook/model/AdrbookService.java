package com.adrbook.model;

import java.util.ArrayList;
import java.util.List;

public class AdrbookService {
	private AdrbookDao_interface dao;

	public AdrbookService(){
		dao = new AdrbookDao();
	}
	public AdrbookVO addABKVO(String name,String tel,String gender,String type,Integer type_index,String notes ,String ip,String brow_ver){
		AdrbookVO adrbookVO =new AdrbookVO();
		adrbookVO.setName(name);
		adrbookVO.setTel(tel);
		adrbookVO.setGender(gender);
		adrbookVO.setType(type);
		adrbookVO.setType_index(type_index);
		adrbookVO.setNotes(notes);
		adrbookVO.setIp(ip);
		adrbookVO.setBrow_ver(brow_ver);
		dao.insert(adrbookVO);
		return adrbookVO;
	}
	public AdrbookVO updateABKVO(String name,String tel,String gender,String type,Integer type_index,String notes,String ip,String brow_ver,String xuid){

		AdrbookVO adrbookVO = new AdrbookVO();
		adrbookVO.setName(name);
		adrbookVO.setTel(tel);
		adrbookVO.setGender(gender);
		adrbookVO.setType(type);
		adrbookVO.setType_index(type_index);
		adrbookVO.setNotes(notes);
		adrbookVO.setIp(ip);
		adrbookVO.setBrow_ver(brow_ver);
		adrbookVO.setXuid(xuid);
		dao.update(adrbookVO);
		return adrbookVO;
	}

	public void deleteABKVO(String adrbook_xuid) {
		dao.delete(adrbook_xuid);
	}
	public static List<AdrbookVO> list() {
		AdrbookDao dao = new AdrbookDao();
		List<AdrbookVO> list = dao.getAll();
		return list;
	}


}
