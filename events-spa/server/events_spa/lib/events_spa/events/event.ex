defmodule EventsSpa.Events.Event do
  use Ecto.Schema
  import Ecto.Changeset

  schema "events" do
    field :title, :string
    field :body, :string
    field :date, :string
    #field :user_id, :id

    belongs_to :user, EventsSpa.Users.User
    has_many :comments, EventsSpa.Comments.Comment
    timestamps()
  end

  @doc false
  def changeset(event, attrs) do
    event
    |> cast(attrs, [:title, :body, :date, :user_id])
    |> validate_required([:title, :body, :date, :user_id])
  end
end
