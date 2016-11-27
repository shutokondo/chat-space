class CreateMessages < ActiveRecord::Migration[5.0]
  def change
    create_table :messages do |t|
      t.text :body
      t.text :image
      t.references :group, index: true
      t.references :user, index: true
      t.timestamps
    end
  end
end
