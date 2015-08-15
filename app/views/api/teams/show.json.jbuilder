json.extract! @team, :name
json.members @team.members do |member|
  json.extract! member, :username, :id
end
