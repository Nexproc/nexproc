json.extract! @team, :name

json.members @team.members do |member|
  json.extract! member, :username, :id
end

json.projects @team.projects do |project|
  json.extract! project, :id, :name, :description
end
