class GamesController < ApplicationController
  def new
    @words_arr = get_new_random_words
  end

  def update
    render json: get_new_random_words
  end

  def get_new_random_words
    conditions = {min_corpus_count: 500, min_length: 6, max_length: 8,
                  limit: 10, exclude_part_of_speech: "family-name,given-name"}
    words = Wordnik.word.get_random_words(conditions)
    alpha = /\A[a-z]*\z/i
    words.select do |word|
      word["word"].match(alpha) && (!word["vulgar"] || word["vulgar"].empty?)
    end.map { |word| word["word"] }
  end
end
