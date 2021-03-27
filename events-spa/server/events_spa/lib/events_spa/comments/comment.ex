defmodule EventsSpa.Comments.Comment do
  use Ecto.Schema
  import Ecto.Changeset

  schema "comments" do
    field :body, :string
    #field :user_id, :id
    #field :post_id, :id

    belongs_to :user, EventsSpa.Users.User
    belongs_to :event, EventsSpa.Events.Event
    timestamps()
  end

  @doc false
  def changeset(comment, attrs) do
    comment
    |> cast(attrs, [:body, :user_id, :event_id])
    |> validate_required([:body, :user_id, :event_id])
  end
end
