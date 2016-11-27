FactoryGirl.define do
  factory :message do
    body { FFaker::Lorem.sentence }
    user
    group
  end
end
