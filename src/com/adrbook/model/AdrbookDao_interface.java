package com.adrbook.model;

import java.util.List;

public interface AdrbookDao_interface   {
	public void insert(AdrbookVO adrbookVO);
	public void update(AdrbookVO adrbookVO);
	public void delete(String xuid);
	public List<AdrbookVO> getAll();
}
