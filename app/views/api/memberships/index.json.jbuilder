json.members @memberships do |membership|
  json.extract! membership.user, :username, :id
end
