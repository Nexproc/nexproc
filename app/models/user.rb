class User < ActiveRecord::Base
  has_many :memberships, dependent: :destroy
  has_many :teams, through: :memberships

  attr_reader :password
  before_validation :create_session_token
  validates :username, :password_digest, :session_token, presence: true
  validates :password, length: { minimum: 6 }, allow_nil: true
  validates :username,  length: { minimum: 6, maximum: 16 }, uniqueness: true

  def self.find_by_credentials(username="", password="")
    user = User.find_by(username: username)
    return nil unless user
    return user.is_password?(password) ? user : nil
  end

  def create_session_token
    self.session_token = SecureRandom.urlsafe_base64
  end

  def reset_session!
    create_session_token
    save!
  end

  def password=(pass)
    @password = pass;
    self.password_digest = BCrypt::Password.create(pass)
  end

  def is_password?(pass)
    return BCrypt::Password.new(self.password_digest).is_password?(pass)
  end
end
