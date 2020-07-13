package com.adrbook.model;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.sql.DataSource;

public class AdrbookDao implements AdrbookDao_interface {
	// 一個應用程式中,針對一個資料庫 ,共用一個DataSource即可
		private static DataSource ds = null;
		static {
			try {
				Context ctx = new InitialContext();
				ds = (DataSource) ctx.lookup("java:comp/env/jdbc/abkDB");
			} catch (NamingException e) {
				e.printStackTrace();
			}
		}
	private static final String INSERT_STMT = "INSERT INTO ADRBOOK(XUID,NAME,TEL,GENDER,TYPE,TYPE_INDEX,NOTES,TIMESTAMP,IP,BROW_VER)"
			+ "VALUES(ADRBOOK_SEQ.nextval,?,?,?,?,?,?,sysdate,?,?)";
	private static final String UPDATE_STMT = "UPDATE ADRBOOK SET NAME=?,TEL=?,GENDER=?,TYPE=?,TYPE_INDEX=?,NOTES=?,IP=?,BROW_VER=?,TIMESTAMP=sysdate WHERE XUID=?";
	private static final String DELETE_STMT = "DELETE from ADRBOOK WHERE  XUID=?";
	private static final String GET_ALL = "SELECT *  FROM ADRBOOK order by xuid ";

	@Override
	public void insert(AdrbookVO adrbookVO) {
		Connection con = null;
		PreparedStatement pstmt =null;

		try {
			con = ds.getConnection();
			pstmt = con.prepareStatement(INSERT_STMT);

			pstmt.setString(1, adrbookVO.getName());
			pstmt.setString(2, adrbookVO.getTel());
			pstmt.setString(3, adrbookVO.getGender());
			pstmt.setString(4, adrbookVO.getType());
			pstmt.setInt(5, adrbookVO.getType_index());
			pstmt.setString(6, adrbookVO.getNotes());
			pstmt.setString(7, adrbookVO.getIp());
			pstmt.setString(8, adrbookVO.getBrow_ver());

			pstmt.executeUpdate();
		} catch (SQLException se) {
			throw new  RuntimeException("A Database error occured .(INSERT)" +se.getMessage());

		} finally {
			if(pstmt!=null){
				try {
					pstmt.close();
				} catch (SQLException  se) {
					se.printStackTrace(System.err);
				}
			}
			if(con !=null){
				try {
					con.close();
				} catch (SQLException e) {
					e.printStackTrace(System.err);
				}
			}
		}
	}

	@Override
	public void update(AdrbookVO adrbookVO) {
		Connection con = null;
		PreparedStatement pstmt =null;

		try {
			con = ds.getConnection();
			pstmt = con.prepareStatement(UPDATE_STMT);
			pstmt.setString(1, adrbookVO.getName());
			pstmt.setString(2, adrbookVO.getTel());
			pstmt.setString(3, adrbookVO.getGender());
			pstmt.setString(4, adrbookVO.getType());
			pstmt.setInt(5, adrbookVO.getType_index());
			pstmt.setString(6, adrbookVO.getNotes());
			pstmt.setString(7, adrbookVO.getIp());
			pstmt.setString(8, adrbookVO.getBrow_ver());
			pstmt.setString(9, adrbookVO.getXuid());

			pstmt.executeUpdate();
		} catch (SQLException se) {
			throw new  RuntimeException("A Database error occured .(UPDATE)" +se.getMessage());

		} finally {
			if(pstmt!=null){
				try {
					pstmt.close();
				} catch (SQLException  se) {
					se.printStackTrace(System.err);
				}
			}
			if(con !=null){
				try {
					con.close();
				} catch (SQLException e) {
					e.printStackTrace(System.err);
				}
			}
		}
	}


	@Override
	public void delete(String xuid) {
		Connection con = null;
		PreparedStatement pstmt =null;

		try {
			con = ds.getConnection();
			pstmt = con.prepareStatement(DELETE_STMT);
			pstmt.setString(1, xuid);

			pstmt.executeUpdate();
		} catch (SQLException se) {
			throw new  RuntimeException("A Database error occured .(DELETE)" +se.getMessage());

		} finally {
			if(pstmt!=null){
				try {
					pstmt.close();
				} catch (SQLException  se) {
					se.printStackTrace(System.err);
				}
			}
			if(con !=null){
				try {
					con.close();
				} catch (SQLException e) {
					e.printStackTrace(System.err);
				}
			}
		}

	}

	@Override
	public List<AdrbookVO> getAll() {
		List <AdrbookVO> list = new ArrayList<AdrbookVO>();
		AdrbookVO adrbookVO = null;

		Connection con = null;
		PreparedStatement pstmt =null;
		ResultSet rs = null;
		try {
			con = ds.getConnection();
			pstmt = con.prepareStatement(GET_ALL);

			rs = pstmt.executeQuery();
			while (rs.next()){
				adrbookVO= new AdrbookVO();
				adrbookVO.setXuid(rs.getString("xuid"));
				adrbookVO.setName(rs.getString("name"));
				adrbookVO.setTel(rs.getString("tel"));
				adrbookVO.setGender(rs.getString("gender"));
				adrbookVO.setType(rs.getString("type"));
				adrbookVO.setType_index(rs.getInt("type_index"));
				adrbookVO.setNotes(rs.getString("notes"));
				adrbookVO.setTimestamp(rs.getString("timestamp"));
				adrbookVO.setIp(rs.getString("ip"));
				adrbookVO.setBrow_ver(rs.getString("brow_ver"));

				list.add(adrbookVO);
			}
		}catch (SQLException se){
			throw new RuntimeException("A database error occured. (GET_ALL)" + se.getMessage());
		}finally{
			if(rs!=null){
				try{
					rs.close();
				}catch (SQLException se){
					se.printStackTrace(System.err);
				}

			}
			if(pstmt!=null){
				try{
					pstmt.close();
				}catch (SQLException se){
					se.printStackTrace(System.err);
				}
			}
			if(con!=null){
				try{
					con.close();
				}catch (SQLException se){
					se.printStackTrace(System.err);
				}
			}

			}
		return list;
		}


}
