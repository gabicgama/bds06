package com.devsuperior.movieflix.dto;

import java.io.Serializable;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.devsuperior.movieflix.entities.Review;
import com.devsuperior.movieflix.entities.User;

public class ReviewDTO implements Serializable {
	private static final long serialVersionUID = 1L;

	private Long id;
	@NotBlank
	@Size(max = 255)
	private String text;
	@NotNull
	private Long movieId;
	private UserDTO user;

	public ReviewDTO() {

	}

	public ReviewDTO(Long id, String text, Long movieId, UserDTO user) {
		super();
		this.id = id;
		this.text = text;
		this.movieId = movieId;
		this.user = user;
	}
	
	public ReviewDTO(Review entity) {
		id = entity.getId();
		text = entity.getText();
		movieId = entity.getMovie().getId();
	}
	
	public ReviewDTO(Review entity, User user) {
		id = entity.getId();
		text = entity.getText();
		movieId = entity.getMovie().getId();
		this.user = convertUserToUserDTO(user);
	}
	
	private UserDTO convertUserToUserDTO(User entity) {
		UserDTO dto = new UserDTO();
		dto.setId(entity.getId());
		dto.setName(entity.getEmail());
		dto.setEmail(entity.getEmail());
		return dto;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public Long getMovieId() {
		return movieId;
	}

	public void setMovieId(Long movieId) {
		this.movieId = movieId;
	}

	public UserDTO getUser() {
		return user;
	}

	public void setUser(UserDTO user) {
		this.user = user;
	}
	
	
}
