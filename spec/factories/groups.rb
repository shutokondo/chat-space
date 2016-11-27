FactoryGirl.define do
  factory :group do
    name { FFaker::Lorem.word }

    after(:build) do |group|
      group.users << build(:user)
    end
  end
end
