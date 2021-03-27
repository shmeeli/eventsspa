defmodule EventsSpaWeb.CommentView do
  use EventsSpaWeb, :view
  alias EventsSpaWeb.CommentView
  alias EventsSpaWeb.EventView
  alias EventsSpaWeb.UserView
  alias EventsSpa.Users
  alias EventsSpa.Events

  def render("index.json", %{comments: comments}) do
    %{data: render_many(comments, CommentView, "comment.json")}
  end

  def render("show.json", %{comment: comment}) do
    %{data: render_one(comment, CommentView, "comment.json")}
  end

  def render("comment.json", %{comment: comment}) do

    user = Users.get_user!(comment.user_id)
    event = Events.get_event!(comment.event_id)

    %{id: comment.id,
      body: comment.body,
      user: render_one(user, UserView, "user.json"),
      event: render_one(event, EventView, "event.json"),}
  end
end
