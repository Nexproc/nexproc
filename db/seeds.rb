rand = Random.new
#create guest account
guest = User.new( username: "GuestUser", password: "password" )
guest.save

#seed fake users
100.times do
  user = User.new(
    username: Faker::Name.first_name,
    password: "password"
    )
  user.save
end

#seed teams
20.times do
  user_ids = (2..100).to_a
  team = Team.new(name: Faker::App.name)
  team.save
  team.members << guest

  #populate team member
  (rand(20) + 4).times do

    #look for a valid user id
    id = 0
    until user_ids.include?(id)
      id = rand(99) + 2
    end
    #remove id form valid list
    user_ids.delete(id)

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
