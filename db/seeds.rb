rand = Random.new
#create guest account
guest = User.new( username: "GuestUser", password: "password" )
guest.save

#seed fake users
i = 1
while i < 100
  user = User.new(
    username: Faker::Name.first_name,
    password: "password"
    )
  i += 1 if user.save
end

#seed teams
20.times do
  #make team
  team = Team.new(name: Faker::App.name)
  team.save
  team.members << guest

  #populate team members
  user_ids = (2..100).to_a.shuffle
  (rand(20) + 4).times do
    id = user_ids.pop
    team.members << User.find(id)
  end
  team.save
end

#seed projects
100.times do
  project = Project.new(
      team_id: rand(20) + 1,
      name: Faker::Hacker.adjective.titleize + " " + Faker::Hacker.abbreviation,
      description: Faker::Hacker.say_something_smart
    )
  project.save
end

#seed tasks
1000.times do |total_tasks|
  task = Task.new(
    name: (Faker::Hacker.verb + " " + Faker::Hacker.noun).titleize,
    body: Faker::Hacker.say_something_smart,
    project_id: rand(100) + 1
  )

  #5% chance of assigning tasks to the guest
  task.user_id = 1 if (rand(20) + 1) == 1

  #10% chance of having a parent task
  if (rand(10) + 1) == 1
    parent = Task.find( (rand(total_tasks) + 1) )
    task.project_id = parent.project_id
    task.parent_task_id = parent.id
  end
  task.save
end
