json.extract! @team, :title
json.teams @team.members do |member|
  json.extract! member, :id, :username
end
