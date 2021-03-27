defmodule EventsSpa.Repo.Migrations.CreateEvents do
  use Ecto.Migration

  def change do
    create table(:events) do
      add :title, :text, null: false
      add :body, :text, null: false
      add :date, :text, null: false
      add :user_id, references(:users, on_delete: :nothing), null: false

      timestamps()
    end

    create index(:events, [:user_id])
  end
end
