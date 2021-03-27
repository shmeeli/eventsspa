# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     EventsSpa.Repo.insert!(%EventsSpa.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

alias EventsSpa.Repo
alias EventsSpa.Users.User
alias EventsSpa.Events.Event

defmodule Inject do

  def user(name,pass) do
    hash = Argon2.hash_pwd_salt("pass")
    Repo.insert!(%User{name: name, password_hash: hash})
  end
end
eli = Inject.user("eli","test1")#Repo.insert!(%User{name: "eli", password_hash: ""})
frank = Inject.user("frank","test2")#Repo.insert!(%User{name: "frank", password_hash: ""})

Repo.insert!(%Event{user_id: eli.id, title: "event1", body: "eli says Hi!", date: "1/1/10"})
Repo.insert!(%Event{user_id: frank.id, title: "event2", body: "frank says garblarg!", date: "2/2/22"})
