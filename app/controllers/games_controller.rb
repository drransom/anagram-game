class GamesController < ApplicationController
  def new
    conditions = {min_corpus_count: 500, min_length: 6, max_length: 8,
                  limit: 8, exclude_part_of_speech: [:family_name, :given_name]}
    words = Wordnik.word.get_random_words(conditions)
    alpha = /\A[a-z]*\z/i
    words_arr = words.select do
      |word| word.word.match(alpha) && !word.vulgar || word.vulgar == 0
    end.map { | word| word.word }
    render json: words_arr
  end
end
