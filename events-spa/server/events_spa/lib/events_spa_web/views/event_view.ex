defmodule EventsSpaWeb.EventView do
  use EventsSpaWeb, :view
  alias EventsSpaWeb.EventView
  alias EventsSpaWeb.UserView
  alias EventsSpa.Users

  def render("index.json", %{events: events}) do
    %{data: render_many(events, EventView, "event.json")}
  end

  def render("show.json", %{event: event}) do
    %{data: render_one(event, EventView, "event.json")}
  end


  def render("event.json", %{event: event}) do

    user = Users.get_user!(event.user_id)
    %{
      id: event.id,
      title: event.title,
      body: event.body,
      date: event.date,
      user: render_one(user, UserView, "user.json"),
    }
  end
end
