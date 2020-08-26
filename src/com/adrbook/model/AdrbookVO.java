package com.adrbook.model;

import java.io.Serializable;

public class AdrbookVO implements Serializable {


	public String getXuid() {
		return xuid;
	}
	public void setXuid(String xuid) {
		this.xuid = xuid;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getTel() {
		return tel;
	}
	public void setTel(String tel) {
		this.tel = tel;
	}
	public String getGender() {
		return gender;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public Integer getType_index() {
		return type_index;
	}
	public void setType_index(Integer type_index) {
		this.type_index = type_index;
	}
	public String getNotes() {
		return notes;
	}
	public void setNotes(String notes) {
		this.notes = notes;
	}
	public String getTimestamp() {
		return timestamp;
	}
	public void setTimestamp(String timestamp) {
		this.timestamp = timestamp;
	}
	public String getBrow_ver() {
		return brow_ver;
	}
	public void setBrow_ver(String brow_ver) {
		this.brow_ver = brow_ver;
	}
	public String getIp() {
		return ip;
	}
	public void setIp(String ip) {
		this.ip = ip;
	}
	private String xuid;
	private String name;
	private String tel;
	private String gender;
	private String type;
	private Integer type_index;
	private String notes;
	private String timestamp;
	private String brow_ver;
	private String ip;
    public AdrbookVO(){
    	super();
    }

}
