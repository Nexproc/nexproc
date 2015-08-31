class User < ActiveRecord::Base
  attr_reader :password

  before_validation :create_session_token
  validates :username, :password_digest, :session_token, presence: true
  validates :password, length: { minimum: 6 }, allow_nil: true
  validates :username, uniqueness: true

  has_many :memberships, dependent: :destroy
  has_many :teams, through: :memberships
  has_many :projects, through: :teams
  has_many :tasks, through: :projects
  has_many :assigned_tasks, class_name: "Task"

  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)
    return user && user.is_password?(password) ? user : nil
  end

  def create_session_token
    self.session_token = SecureRandom.urlsafe_base64 unless self.session_token
  end

  def reset_session!
    self.session_token = SecureRandom.urlsafe_base64
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
