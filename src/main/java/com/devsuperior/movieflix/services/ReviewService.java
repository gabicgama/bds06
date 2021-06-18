package com.devsuperior.movieflix.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devsuperior.movieflix.dto.ReviewDTO;
import com.devsuperior.movieflix.entities.Review;
import com.devsuperior.movieflix.repositories.MovieRepository;
import com.devsuperior.movieflix.repositories.ReviewRepository;
import com.devsuperior.movieflix.repositories.UserRepository;

@Service
public class ReviewService {

	@Autowired
	ReviewRepository repository;

	@Autowired
	UserRepository userRepository;

	@Autowired
	MovieRepository movieRepository;

	@Transactional(readOnly = true)
	public List<ReviewDTO> findAll() {
		List<Review> list = repository.findAll();
		return list.stream().map(x -> new ReviewDTO(x)).collect(Collectors.toList());
	}

	@Transactional()
	public ReviewDTO insert(ReviewDTO dto) {
		Review entity = new Review();
		copyDtoToEntity(dto, entity);
		entity = repository.save(entity);
		return new ReviewDTO(entity);
	}

	private void copyDtoToEntity(ReviewDTO dto, Review entity) {
		entity.setId(dto.getId());
		entity.setText(dto.getText());
		entity.setUser(userRepository.getOne(dto.getUserId()));
		entity.setMovie(movieRepository.getOne(dto.getMovieId()));
	}
}
